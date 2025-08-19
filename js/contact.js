const sidebar = document.getElementById('mobileSidebar');
const toggleBtn = document.getElementById('sidebarToggle');
const closeBtn = document.getElementById('sidebarClose');

toggleBtn.addEventListener('click', () => sidebar.classList.add('show'));
closeBtn.addEventListener('click', () => sidebar.classList.remove('show'));

document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
    sidebar.classList.remove('show');
  }
});

const cards = document.querySelectorAll('.welding-card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.classList.remove('hover-out');
    card.classList.add('hover-in');
  });
  card.addEventListener('mouseleave', () => {
    card.classList.remove('hover-in');
    card.classList.add('hover-out');
  });
});


AOS.init({ duration: 1000, once: true, offset: 50 });

    document.getElementById("contactForm").addEventListener("submit", function(e){
      e.preventDefault();
      alert("✅ Thank you! Your message has been sent successfully.");
      this.reset();
    });