const sidebar = document.getElementById("mobileSidebar");
const toggleBtn = document.getElementById("sidebarToggle");
const closeBtn = document.getElementById("sidebarClose");

toggleBtn.addEventListener("click", () => sidebar.classList.add("show"));
closeBtn.addEventListener("click", () => sidebar.classList.remove("show"));

document.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
    sidebar.classList.remove("show");
  }
});

const cards = document.querySelectorAll(".welding-card");
cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.classList.remove("hover-out");
    card.classList.add("hover-in");
  });
  card.addEventListener("mouseleave", () => {
    card.classList.remove("hover-in");
    card.classList.add("hover-out");
  });
});

(function () {
  const root = document.getElementById("isc-embed");
  if (!root) return;

  const slider = root.querySelector(".slider .viewport");
  const items = Array.from(root.querySelectorAll(".slider .item"));
  const prevBtn = root.querySelector("#isc-prev");
  const nextBtn = root.querySelector("#isc-next");
  const dotsContainer = root.querySelector("#isc-workmanship-dots");
  if (!items.length) return;

  items.forEach((_, idx) => {
    const btn = document.createElement("button");
    btn.setAttribute("aria-label", "Go to item " + (idx + 1));
    btn.dataset.index = idx;
    dotsContainer.appendChild(btn);
  });
  const dots = Array.from(dotsContainer.children);
  let active = Math.floor(items.length / 2);

  function loadShow() {
    const spacing = Math.min(150, Math.round(slider.clientWidth / 6));
    const maxVisible = 3;
    items.forEach((el, i) => {
      const diff = i - active;
      const abs = Math.abs(diff);
      el.classList.toggle("active", i === active);
      if (abs > maxVisible) {
        el.style.transform = `translateX(${
          diff * spacing
        }px) scale(0.5) perspective(1400px) rotateY(${
          diff > 0 ? -15 : 15
        }deg) translateZ(-100px)`;
        el.style.zIndex = 0;
        el.style.opacity = 0;
        el.style.filter = "blur(6px)";
        el.classList.add("dim");
      } else {
        const translateX = diff * spacing;
        const scale = 1 - 0.1 * abs;
        const rotateY = diff * -12;
        const z = 250 - abs * 80;
        el.style.transform = `translateX(${translateX}px) scale(${scale}) perspective(1400px) rotateY(${rotateY}deg) translateZ(${z}px)`;
        el.style.zIndex = 100 - abs;
        el.style.opacity = 1;
        el.style.filter = abs === 0 ? "none" : "blur(2.5px)";
        el.classList.remove("dim");
      }
    });
    updateNav();
  }

  function updateNav() {
    dots.forEach((d, idx) => d.classList.toggle("active", idx === active));
    if (prevBtn) prevBtn.disabled = active === 0;
    if (nextBtn) nextBtn.disabled = active === items.length - 1;
  }

  function navigate(newIndex) {
    active = Math.max(0, Math.min(items.length - 1, newIndex));
    loadShow();
  }

  if (nextBtn) nextBtn.addEventListener("click", () => navigate(active + 1));
  if (prevBtn) prevBtn.addEventListener("click", () => navigate(active - 1));
  dots.forEach((d) =>
    d.addEventListener("click", (e) => {
      navigate(Number(e.currentTarget.dataset.index));
    })
  );

  let autoRotate = setInterval(() => {
    let nextIndex = (active + 1) % items.length;
    navigate(nextIndex);
  }, 3500);

  const sliderWrapper = root.querySelector(".workmanship");
  function stopAutoRotate() {
    clearInterval(autoRotate);
  }
  function startAutoRotate() {
    stopAutoRotate();
    autoRotate = setInterval(() => {
      navigate((active + 1) % items.length);
    }, 3500);
  }
  if (sliderWrapper) {
    sliderWrapper.addEventListener("mouseenter", stopAutoRotate);
    sliderWrapper.addEventListener("mouseleave", startAutoRotate);
  }

  let startX = 0;
  let isDragging = false;
  function handleDragStart(clientX) {
    isDragging = true;
    startX = clientX;
    stopAutoRotate();
    if (sliderWrapper) {
      sliderWrapper.style.cursor = "grabbing";
      sliderWrapper.style.userSelect = "none";
    }
  }
  function handleDragMove(clientX) {
    if (!isDragging) return;
    const diff = startX - clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) navigate(active + 1);
      else navigate(active - 1);
      isDragging = false;
    }
  }
  function handleDragEnd() {
    isDragging = false;
    if (sliderWrapper) {
      sliderWrapper.style.cursor = "grab";
      sliderWrapper.style.userSelect = "auto";
    }
  }

  if (sliderWrapper)
    sliderWrapper.addEventListener(
      "touchstart",
      (e) => handleDragStart(e.touches[0].clientX),
      { passive: true }
    );
  if (sliderWrapper)
    sliderWrapper.addEventListener(
      "touchmove",
      (e) => handleDragMove(e.touches[0].clientX),
      { passive: true }
    );
  if (sliderWrapper) sliderWrapper.addEventListener("touchend", handleDragEnd);

  if (sliderWrapper)
    sliderWrapper.addEventListener("mousedown", (e) => {
      if (e.buttons !== 1) return;
      e.preventDefault();
      handleDragStart(e.clientX);
    });
  window.addEventListener("mousemove", (e) => handleDragMove(e.clientX));
  window.addEventListener("mouseup", handleDragEnd);

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") navigate(active + 1);
    if (e.key === "ArrowLeft") navigate(active - 1);
  });
  window.addEventListener("resize", loadShow);

  // Modal functionality (slider)
  const modal = root.querySelector("#isc-imageModal");
  const modalImg = root.querySelector("#isc-modalImage");
  const closeModalBtn = root.querySelector("#isc-closeModal");

  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      const target = e.currentTarget;
      if (target.classList.contains("dim")) return;
      const imgSrc = target.querySelector("img").src;
      modalImg.src = imgSrc;
      if (modal) {
        modal.style.display = "flex";
        modal.classList.remove("closing");
      }
      stopAutoRotate();
    });
  });

  function closeModal() {
    if (!modal) return;
    modal.classList.add("closing");
    setTimeout(() => {
      modal.style.display = "none";
      modal.classList.remove("closing");
    }, 350);
    startAutoRotate();
  }

  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (modal)
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.style.display === "flex")
      closeModal();
  });

  // Initial
  navigate(active);
})();

(function () {
  const root = document.getElementById("isc-embed");
  if (!root) return;

  const gallery = Array.from(root.querySelectorAll(".card"));
  const photos = gallery.map((g) => g.querySelector("img"));
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  gallery.forEach((g) => {
    if (!g.classList.contains("in-view")) io.observe(g);
  });

  // LIGHTBOX elements (scoped ids)
  const lightbox = root.querySelector("#isc-lightbox");
  const lbImage = root.querySelector("#isc-lbImage");
  const lbCaption = root.querySelector("#isc-lbCaption");
  const lbClose = root.querySelector("#isc-lbClose");
  const lbNext = root.querySelector("#isc-lbNext");
  const lbPrev = root.querySelector("#isc-lbPrev");
  let currentIndex = -1;

  function openLightbox(idx) {
    currentIndex = idx;
    const card = gallery[idx];
    const img = card.querySelector("img");
    if (!lbImage) return;
    lbImage.src = img.src;
    lbImage.alt = img.alt || "Image " + (idx + 1);
    if (lbCaption)
      lbCaption.textContent = card.dataset.caption || img.alt || "";
    if (lightbox) {
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    }
    if (lbClose) lbClose.focus();
    document.body.style.overflow = "hidden";
    [idx - 1, idx + 1].forEach((i) => {
      if (i >= 0 && i < photos.length) {
        const p = new Image();
        p.src = photos[i].src;
      }
    });
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    setTimeout(() => {
      if (lbImage) lbImage.src = "";
    }, 220);
    document.body.style.overflow = "";
  }

  function nextImage() {
    openLightbox((currentIndex + 1) % photos.length);
  }
  function prevImage() {
    openLightbox((currentIndex - 1 + photos.length) % photos.length);
  }

  gallery.forEach((card, idx) => {
    card.addEventListener("click", () => openLightbox(idx));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(idx);
      }
    });
  });

  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lbNext) lbNext.addEventListener("click", nextImage);
  if (lbPrev) lbPrev.addEventListener("click", prevImage);

  document.addEventListener("keydown", (e) => {
    if (!lightbox || !lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  });

  if (lightbox)
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

  document.addEventListener(
    "focus",
    (ev) => {
      if (!lightbox || !lightbox.classList.contains("open")) return;
      if (!lightbox.contains(ev.target)) {
        ev.preventDefault();
        if (lbClose) lbClose.focus();
      }
    },
    true
  );
})();

(function () {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  const isScrollable = () =>
    document.documentElement.scrollHeight > window.innerHeight + 10;

  const SCROLL_TRIGGER = Math.round(window.innerHeight * 0.15);

  function toggleBackToTop() {
    if (
      isScrollable() &&
      (window.scrollY || document.documentElement.scrollTop) > SCROLL_TRIGGER
    ) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  }

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });

  window.addEventListener("load", toggleBackToTop, { once: true });
  window.addEventListener("resize", toggleBackToTop);
  window.addEventListener("scroll", toggleBackToTop, { passive: true });
})();
