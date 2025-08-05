function animateCounter(el) {
  const target = +el.getAttribute('data-target');
  const duration = 1500; 
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
  const target = +el.dataset.target;
  const duration = 1500;
  const stepTime = Math.floor(duration / target);
  let current = 0;

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

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const track1 = document.getElementById('track1');
const track2 = document.getElementById('track2');

nextBtn.addEventListener('click', () => {
  track1.classList.add('slid');
  track2.classList.add('slid');
});

prevBtn.addEventListener('click', () => {
  track1.classList.remove('slid');
  track2.classList.remove('slid');
});

const sectionsToAnimate = document.querySelectorAll('.welding-fade-in');
const sectionObserverOptions = {
  root: null,
  threshold: 0.1,
};

const sectionObserverCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    } else {
      entry.target.classList.remove('is-visible');
    }
  });
};

const sectionObserver = new IntersectionObserver(sectionObserverCallback, sectionObserverOptions);
sectionsToAnimate.forEach(section => {
  if (section) {
    sectionObserver.observe(section);
  }
});