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

document.addEventListener('DOMContentLoaded', function () {
      const animatedItems = document.querySelectorAll(
        '.animate-left, .animate-right, .animate-bottom'
      );
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry =>
            entry.target.classList.toggle('animate-visible', entry.isIntersecting)
          );
        },
        { threshold: 0.3 }
      );
      animatedItems.forEach(item => observer.observe(item));

      // Learn More toggle
      const more = document.getElementById('aboutMore');
      const btn = document.getElementById('learnMoreBtn');
      let open = false;
      btn.addEventListener('click', e => {
        e.preventDefault();
        open = !open;
        more.classList.toggle('open', open);
        btn.textContent = open ? 'Show Less' : 'Learn More';
        if (open) more.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });