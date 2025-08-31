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

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);
document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

const ratingLabels = document.querySelectorAll(".rating-wrapper label");
const ratingInputs = document.querySelectorAll(
  '.rating-wrapper input[type="radio"]'
);

ratingInputs.forEach((input, index) => {
  input.addEventListener("change", () => {
    ratingLabels.forEach((label, labelIndex) => {
      label.classList.remove("highlight", "selected");
      if (labelIndex <= index) {
        label.classList.add("highlight");
      }
      if (labelIndex === index) {
        label.classList.add("selected");
      }
    });
  });
});

document
  .getElementById("feedbackForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      rating:
        document.querySelector('input[name="rating"]:checked')?.value ||
        "Not selected",
      improvements: document.getElementById("improvements").value,
      message: document.getElementById("message").value,
    };
    console.log("Feedback Submitted:", formData);

    const form = document.getElementById("feedbackForm");
    const successMessage = document.getElementById("successMessage");

    form.classList.add("d-none");
    successMessage.classList.remove("d-none");
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
