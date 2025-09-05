const sidebar = document.getElementById("mobileSidebar");
const toggleBtn = document.getElementById("sidebarToggle");
const closeBtn = document.getElementById("sidebarClose");

if (toggleBtn && sidebar && closeBtn) {
  toggleBtn.addEventListener("click", () => sidebar.classList.add("show"));
  closeBtn.addEventListener("click", () => sidebar.classList.remove("show"));

  document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
      sidebar.classList.remove("show");
    }
  });
}

document.querySelectorAll(".welding-card").forEach((card) => {
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

// Rating system functionality
const ratingLabels = document.querySelectorAll(".rating-wrapper label");
const ratingInputs = document.querySelectorAll(
  '.rating-wrapper input[type="radio"]'
);
let selectedRating = null;

ratingInputs.forEach((input) => {
  input.addEventListener("change", () => {
    selectedRating = input.value;
    const ratingValue = parseInt(selectedRating, 10);
    ratingLabels.forEach((label, labelIndex) => {
      label.classList.remove("highlight", "selected");
      if (labelIndex <= ratingValue) {
        label.classList.add("highlight");
      }
      if (labelIndex === ratingValue) {
        label.classList.add("selected");
      }
    });
  });
});

// Feedback form handling
const feedbackForm = document.getElementById("feedbackForm");
const submitBtn = document.getElementById("submitBtn");
const thankyouScreen = document.getElementById("successMessage");
const submitAnother = document.getElementById("submit-another");

if (feedbackForm && submitBtn && thankyouScreen && submitAnother) {
  submitBtn.addEventListener("click", async function (e) {
    e.preventDefault();

    if (selectedRating === null) {
      alert("Please select a rating before submitting.");
      return;
    }

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const improvements = document.getElementById("improvements").value.trim();
    const message = document.getElementById("message").value.trim();

    this.disabled = true;
    this.innerHTML = `
          <svg class="spinner" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
          </svg>
          Sending...
      `;

    const payload = {
      name,
      email,
      rating: selectedRating,
      feedback: improvements,
      message,
      websiteId: "ISC",
    };

    try {
      const response = await fetch(
        "https://my-mailserver.vercel.app/api/feedbackMail",
        {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorResult = await response
          .json()
          .catch(() => ({
            message: "An unknown error occurred on the server.",
          }));
        throw new Error(
          errorResult.message || `HTTP error! Status: ${response.status}`
        );
      }

      feedbackForm.style.display = "none";
      thankyouScreen.style.display = "block";
      thankyouScreen.classList.add("visible");
    } catch (err) {
      console.error("Error submitting feedback:", err);
      alert(
        `Failed to submit your feedback. Please try again later.\nError: ${err.message}`
      );
      this.disabled = false;
      this.innerHTML = `
            <i class="fas fa-paper-plane me-2"></i>Submit Feedback
        `;
    }
  });

  submitAnother.addEventListener("click", function () {
    thankyouScreen.style.display = "none";
    feedbackForm.style.display = "block";
    feedbackForm.reset();
    ratingInputs.forEach((input) => (input.checked = false));
    ratingLabels.forEach((label) =>
      label.classList.remove("highlight", "selected")
    );
    selectedRating = null;
    submitBtn.disabled = false;
    submitBtn.innerHTML = `
          <i class="fas fa-paper-plane me-2"></i>Submit Feedback
      `;
  });
}

// Back to top button
(function () {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  const isScrollable = () =>
    document.documentElement.scrollHeight > window.innerHeight;
  const SCROLL_TRIGGER = window.innerHeight * 0.2;

  function toggleBackToTop() {
    if (isScrollable() && window.scrollY > SCROLL_TRIGGER) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  }

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("load", toggleBackToTop);
  window.addEventListener("resize", toggleBackToTop);
  window.addEventListener("scroll", toggleBackToTop, { passive: true });
})();
