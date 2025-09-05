const sidebar = document.getElementById("mobileSidebar");
const toggleBtn = document.getElementById("sidebarToggle");
const closeBtn = document.getElementById("sidebarClose");
const submitBtn = document.getElementById("sendBtn");
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

AOS.init({ duration: 1000, once: true, offset: 50 });

// document.getElementById("contactForm").addEventListener("submit", function (e) {
//   e.preventDefault();
//   alert("Thank you! Your message has been sent successfully.");
//   this.reset();
// });
const form = document.getElementById("contactForm");
submitBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  this.classList.add("loading");
  this.innerHTML = `
      <svg class="spinner" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
      </svg>
      Sending...
  `;
  const email = document.getElementById("email").value.trim();
  const fname = document.getElementById("fname").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();
  const payload = {
    name: fname,
    email: email,
    contact: phone,
    message: message,
    websiteId: "ISC",
  };
  try {
    const res = await fetch(
      "https://my-mailserver.vercel.app/api/contactMail",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const result = await res.json();
    showToast(
      "Thank you for contacting us! We will get back to you soon.",
      "success"
    );
    form.reset();
  } catch (err) {
    console.error(err);
    showToast("Something went wrong. Please try again.", "error");

    submitBtn.classList.remove("loading");
    submitBtn.innerHTML = `
        Send Message
    `;
  } finally {
    submitBtn.classList.remove("loading");
    submitBtn.innerHTML = `
        Send Message
    `;
  }
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

function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");

  const toast = document.createElement("div");
  toast.classList.add("toast");
  if (type === "error") toast.style.background = "#d9534f";
  if (type === "success") toast.style.background = "#7f9196";

  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}
