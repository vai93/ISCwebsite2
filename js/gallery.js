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
      {
        passive: true,
      }
    );
  if (sliderWrapper)
    sliderWrapper.addEventListener(
      "touchmove",
      (e) => handleDragMove(e.touches[0].clientX),
      {
        passive: true,
      }
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

  navigate(active);
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
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleBackToTop, {
    once: true,
  });
  window.addEventListener("resize", toggleBackToTop);
  window.addEventListener("scroll", toggleBackToTop, {
    passive: true,
  });
})();
