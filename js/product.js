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

const products = [
  {
    name: "ACDB & DCDB PANEL",
    description:
      "AC Distribution Boards and DC Distribution Boards are critical in solar and renewable energy systems, ensuring safe power distribution, circuit protection, and efficient load management.",
    images: [
      "images/product/photo/ACDB/ACDB PANEL.png",
      "images/product/photo/ACDB/ACDB PANEL-INTERNAL VIEW.png",
      "images/product/photo/ACDB/DCDB PANEL.png",
    ],
  },
  {
    name: "APFC PANEL / RTPFC PANEL",
    description:
      "Automatic Power Factor Correction Panels that enhance energy efficiency, reduce penalties, and stabilize electrical load conditions.",
    images: [
      "images/product/photo/APFC/APFC PANEL-1.png",
      "images/product/photo/APFC/APFC PANEL.jpg",
    ],
  },
  {
    name: "BUS DUCT PANEL",
    description:
      "High current Bus Duct systems for compact, flexible, and reliable power transmission across industrial zones.",
    images: [
      "images/product/photo/bus_duct/BUS DUCT-1.JPG",
      "images/product/photo/bus_duct/BUS DUCT & PHASE CROSS OVER.jpg",
      "images/product/photo/bus_duct/BUS DUCT PHASE CROSS OVER.jpg",
      "images/product/photo/bus_duct/BUSDUCT TO PCC PANEL CONNECTION.jpg",
      "images/product/photo/bus_duct/Sandwich Bus-Duct.jpg",
    ],
  },
  {
    name: "CONTROL PANEL",
    description:
      "General-purpose control panels used to monitor, regulate, and operate various electrical systems, offering centralized command and improved safety for industrial processes.",
    images: [
      "images/product/photo/contolPanel/CONTROL PANEL.png",
      "images/product/photo/contolPanel/CONTROL PANEL OPEN DOOR VIEW.png",
      "images/product/photo/contolPanel/IP-55,65 Control Panel.jpg",
    ],
  },
  {
    name: "CONTROL DESK PANEL",
    description:
      "Ergonomically designed operator desks with control switches, meters, and mimic diagrams for centralized supervision.",
    images: ["images/product/photo/control_desk/Control Desk Panel.jpg"],
  },
  {
    name: "HT PANEL",
    description:
      "High Tension Panels built for safe operation and protection in medium to high voltage power distribution networks.",
    images: ["images/product/photo/HT/HT PANEL with CO2 Flodding System.jpg"],
  },
  {
    name: "iMCC PANEL",
    description:
      "Intelligent MCC Panels with embedded communication, automation features, and advanced fault diagnostics for smarter motor control.",
    images: [
      "images/product/photo/iMCC/iMCC Panel.jpg",
      "images/product/photo/iMCC/iMCC Panel-1.jpg",
    ],
  },
  {
    name: "JUNCTION BOX PANEL",
    description:
      "Designed for safe and reliable cable terminations, junction box panels simplify wiring, ensure organized connections, and provide easy maintenance access for field instruments and equipment.",
    images: ["images/product/photo/junction_box/JUNCTION BOX.png"],
  },
  {
    name: "RTCC PANEL & MARSHALLING BOX",
    description:
      "Remote Tap Changer Control Panels and Marshalling Boxes for streamlined transformer automation and signal management.",
    images: [
      "images/product/photo/Marshalling/RTCC PANEL-FRONT VIEW.png",
      "images/product/photo/Marshalling/RTCC Panel- Rear Side Internal View.png",
      "images/product/photo/Marshalling/Marshalling Box-Internal View.png",
      "images/product/photo/Marshalling/Marshalling Box-Front View.png",
      "images/product/photo/Marshalling/Fiber Optic Box.png",
    ],
  },
  {
    name: "MCC PANEL",
    description:
      "Power MCC Panels combine motor control and power distribution in a single unit, providing efficient operation, overload protection, and centralized control for heavy-duty industrial applications.",
    images: [
      "images/product/photo/MCC/MCC PANEL.jpg",
      "images/product/photo/MCC/MCC PANEL-1.png",
      "images/product/photo/MCC/MCC PANEL-2.png",
      "images/product/photo/MCC/MCC PANEL-3.jpg",
    ],
  },
  {
    name: "PCC PANEL",
    description:
      "Power Control Center Panels designed for reliable and efficient distribution of electrical power in large-scale industrial systems.",
    images: [
      "images/product/photo/PCC/PCC Panel.jpg",
      "images/product/photo/PCC/PCC PANEL-1.png",
      "images/product/photo/PCC/PCC PANEL-2.png",
      "images/product/photo/PCC/PCC PANEL 6300A WITH DOUBLE BUSBAR.jpg",
    ],
  },
  {
    name: "AUTOMATION PANEL",
    description:
      "Custom-built PLC Panels integrated with HMI, SCADA, and field I/Os for seamless process automation and control.",
    images: [
      "images/product/photo/PLC/PLC Panel.jpg",
      "images/product/photo/PLC/PLC Panel-Front.jpg",
      "images/product/photo/PLC/PLC PANEL-INTERNAL VIEW.png",
      "images/product/photo/PLC/AUTOMATION-SCADA SCREEN-1.png",
      "images/product/photo/PLC/PLC PANEL-INTERNAL VIEW.png",
      "images/product/photo/PLC/PLC Panel.jpg",
      "images/product/photo/PLC/MCC CUM PLC WITH VFD PANEL.jpg",
      "images/product/photo/PLC/HEATING SYSTEM HMI BASED CONTROL PANEL.png",
      "images/product/photo/PLC/AUTOMATION-SCADA SCREEN-3.png",
      "images/product/photo/PLC/AUTOMATION-SCADA SCREEN-2.png",
      "images/product/photo/PLC/AUTOMATION-HMI SCREEN-2.png",
      "images/product/photo/PLC/AUTOMATION-HMI SCREEN-1-P&ID.png",
    ],
  },
  {
    name: "PMCC PANEL",
    description:
      "Power MCC Panels combine motor control and power distribution in a single unit, providing efficient operation, overload protection, and centralized control for heavy-duty industrial applications.",
    images: ["images/product/photo/PMCC/PMCC PANEL.png"],
  },
  {
    name: "VFD PANEL",
    description:
      "Drive Panels equipped with Variable Frequency Drives for accurate speed control, energy savings, and motor protection",
    images: [
      "images/product/photo/VFD/VFD (250 KW) PANEL.png",
      "images/product/photo/VFD/VFD (250 KW) PANEL-INTERNAL VIEW.png",
      "images/product/photo/VFD/VFD (FLP) PANEL.jpg",
      "images/product/photo/VFD/VFD PANEL with CO2 Flodding System.jpg",
      "images/product/photo/VFD/VFD Panel.jpg",
      "images/product/photo/VFD/VFD PANEL.png",
      "images/product/photo/VFD/VFD PANEL-1.jpg",
      "images/product/photo/VFD/VFD PANEL-FRONT VIEW.png",
      "images/product/photo/VFD/VFD PANEL-REAR VIEW.png",
    ],
  },
];

const gallery = document.getElementById("product-gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCounter = document.getElementById("lightbox-counter");
let currentImages = [];
let currentImageIndex = 0;

function displayProducts() {
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    let imagesHTML = "";
    product.images.forEach((img, index) => {
      imagesHTML += `<img src="${img}" alt="${
        product.name
      }" class="product-card-img${
        index === 0 ? " active" : ""
      }" loading="lazy">`;
    });

    card.innerHTML = `
                <div class="product-card-img-container">
                    ${imagesHTML}
                    <div class="card-nav">
                        <button class="card-nav-btn prev" aria-label="Previous image"><i class="fa-solid fa-chevron-left"></i></button>
                        <button class="card-nav-btn next" aria-label="Next image"><i class="fa-solid fa-chevron-right"></i></button>
                    </div>
                    <div class="card-counter">1 / ${product.images.length}</div>
                </div>
                <div class="card-overlay">
                    <h3>${product.name}</h3>
                </div>
                <div class="product-footer">
                    <div class="product-title">${product.name}</div>
                    <div class="product-desc">${product.description}</div>
                </div>
                `;

    gallery.appendChild(card);

    const imgContainer = card.querySelector(".product-card-img-container");
    const imgs = imgContainer.querySelectorAll(".product-card-img");
    const counter = imgContainer.querySelector(".card-counter");
    let currentIndex = 0;

    function updateImage() {
      imgs.forEach((imgEl, idx) => {
        imgEl.classList.toggle("active", idx === currentIndex);
      });
      counter.textContent = `${currentIndex + 1} / ${product.images.length}`;
    }

    card.querySelector(".card-nav-btn.prev").addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
      updateImage();
    });

    card.querySelector(".card-nav-btn.next").addEventListener("click", (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % imgs.length;
      updateImage();
    });

    card.addEventListener("click", () => {
      openLightbox(product.images, currentIndex);
    });
  });
}

function openLightbox(images, index) {
  currentImages = images;
  currentImageIndex = index || 0;
  updateLightboxImage();
  lightbox.classList.add("show");
  lightbox.setAttribute("aria-hidden", "false");
}
function updateLightboxImage() {
  lightboxImg.src = currentImages[currentImageIndex];
  lightboxCounter.textContent = `${currentImageIndex + 1} / ${
    currentImages.length
  }`;
}
function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % currentImages.length;
  updateLightboxImage();
}
function showPrevImage() {
  currentImageIndex =
    (currentImageIndex - 1 + currentImages.length) % currentImages.length;
  updateLightboxImage();
}
function closeLightbox() {
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
}

document.querySelector(".lightbox-next").addEventListener("click", (e) => {
  e.stopPropagation();
  showNextImage();
});
document.querySelector(".lightbox-prev").addEventListener("click", (e) => {
  e.stopPropagation();
  showPrevImage();
});
document.querySelector(".lightbox-close").addEventListener("click", (e) => {
  e.stopPropagation();
  closeLightbox();
});
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);

displayProducts();
document
  .querySelectorAll(".product-card")
  .forEach((card) => observer.observe(card));

const machineryBtn = document.getElementById("machineryBtn");
const testingBtn = document.getElementById("testingBtn");
const machineryModal = document.getElementById("machineryModal");
const testingModal = document.getElementById("testingModal");

const openModal = (modal) => modal.classList.add("show");
const closeModal = (modal) => modal.classList.remove("show");

machineryBtn.addEventListener("click", () => openModal(machineryModal));
testingBtn.addEventListener("click", () => openModal(testingModal));

document.querySelectorAll(".modal .close-btn").forEach((btn) => {
  btn.addEventListener("click", () => closeModal(btn.closest(".modal")));
});
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(modal);
  });
});

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
