// helper to animate a single counter element from 0 → its data-target
function animateCounter(el) {
  const target = +el.getAttribute('data-target');
  const duration = 1500; // total ms
  const stepTime = Math.floor(duration / target);
  let current = 0;
  const timer = setInterval(() => {
    current++;
    el.textContent = current;
    if (current === target) clearInterval(timer);
  }, stepTime);
}

// wrap showSlide to also trigger count-up on the third slide
const slides = document.querySelectorAll('.slide');
let index = 0;

function showSlide(i) {
  slides.forEach((slide, idx) => {
    slide.classList.remove('active');
    const textBox = slide.querySelector('.text-box');
    textBox.querySelectorAll('*').forEach(el => {
      el.style.animation = 'none';
      el.style.opacity = 0;
      // reset any counter back to zero
      if (el.classList.contains('counter')) el.textContent = '0';
    });
    void textBox.offsetWidth;
  });

  slides[i].classList.add('active');
  const textBox = slides[i].querySelector('.text-box');
  textBox.querySelectorAll('*').forEach(el => {
    el.style.animation = '';
  });

  // if this is the 3rd slide (index 2), kick off each counter
  if (i === 2) {
    textBox.querySelectorAll('.counter').forEach(animateCounter);
  }
}

setInterval(() => {
  index = (index + 1) % slides.length;
  showSlide(index);
}, 4500);

function animateCounter(el) {
  el.style.opacity = 1;             
  const target   = +el.dataset.target;
  const duration = 1500;             
  const stepTime = Math.floor(duration / target);
  let current    = 0;

  const timer = setInterval(() => {
    current++;
    el.textContent = current;
    if (current === target) clearInterval(timer);
  }, stepTime);
}

const cards = document.querySelectorAll('.info-card-alt');

  // Add data-index attributes for staggered delay
  cards.forEach((card, index) => {
    card.setAttribute('data-index', index + 5);
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.classList.remove('in-view'); // Reset animation
          void el.offsetWidth; // Force reflow to restart animation
          el.classList.add('in-view');
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  cards.forEach(card => observer.observe(card));