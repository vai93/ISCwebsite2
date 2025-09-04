const sidebar = document.getElementById("mobileSidebar");
const toggleBtn = document.getElementById("sidebarToggle");
const closeBtn = document.getElementById("sidebarClose");

if (toggleBtn && sidebar) {
  toggleBtn.addEventListener("click", () => sidebar.classList.add("show"));
  closeBtn?.addEventListener("click", () => sidebar.classList.remove("show"));

  document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
      sidebar.classList.remove("show");
    }
  });
}

// Card hover animations
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

// Fade-in observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.1 }
);
document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

// Rating system
const ratingLabels = document.querySelectorAll(".rating-wrapper label");
const ratingInputs = document.querySelectorAll('.rating-wrapper input[type="radio"]');
let selectedRating = null;

ratingInputs.forEach((input, index) => {
  input.addEventListener("change", () => {
    selectedRating = input.value;

    ratingLabels.forEach((label, labelIndex) => {
      label.classList.remove("highlight", "selected");
      if (labelIndex <= index) label.classList.add("highlight");
      if (labelIndex === index) label.classList.add("selected");
    });
  });
});

// Feedback form handling
const feedbackForm = document.getElementById("feedbackForm");
const submitBtn = document.getElementById("submitBtn");
const thankyouScreen = document.getElementById("successMessage");
const submitAnother = document.getElementById("submit-another");

// Submit feedback
submitBtn.addEventListener("click", async function (e) {
  e.preventDefault();

  if (selectedRating === null) {
    alert("Please select a rating");
    return;
  }

  const feedbackText = document.getElementById("improvements").value.trim();
  const email = document.getElementById("email").value.trim();
  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();

  this.classList.add("loading");
  this.innerHTML = `
      <svg class="spinner" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
      </svg>
      Sending...
  `;

  const payload = { name, email, rating: selectedRating, feedback: feedbackText, message, websiteId: "ISC" };

  try {
    const res = await fetch("https://my-mailserver.vercel.app/api/feedbackMail", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Submission failed");

    feedbackForm.classList.add("d-none");
    thankyouScreen.style.display = "block";
    thankyouScreen.classList.add("fade-in");
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Please try again.");

    submitBtn.classList.remove("loading");
    submitBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
             viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
             class="icon">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
        SEND FEEDBACK
    `;
  }
});

// Reset form when submitting another response
submitAnother.addEventListener("click", function () {
  thankyouScreen.style.display = "none";
  feedbackForm.classList.remove("d-none");

  // Reset form fields
  ratingInputs.forEach((input) => (input.checked = false));
  ratingLabels.forEach((label) => label.classList.remove("highlight", "selected"));
  document.getElementById("improvements").value = "";
  document.getElementById("message").value = "";
  document.getElementById("email").value = "";
  document.getElementById("name").value = "";
  selectedRating = null;

  // Reset button
  submitBtn.classList.remove("loading");
  submitBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" 
           viewBox="0 0 24 24" fill="none" stroke="currentColor" 
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
      SEND FEEDBACK
  `;
});

// Back to top button
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
