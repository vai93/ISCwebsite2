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


(function () {
  const root = document.getElementById('clientsCarouselKRS');
  if (!root) return;
  const track = root.querySelector('.cc-track');
  if (!track) return;

  if (!track.dataset.duplicated) {
    track.insertAdjacentHTML('beforeend', track.innerHTML);
    track.dataset.duplicated = 'true';
  }

  const setPaused = (paused) => {
    track.style.animationPlayState = paused ? 'paused' : 'running';
    track.setAttribute('data-paused', paused ? 'true' : 'false');
  };

  track.addEventListener('mouseenter', () => setPaused(true));
  track.addEventListener('mouseleave', () => setPaused(false));
  track.addEventListener('focusin', () => setPaused(true));
  track.addEventListener('focusout', () => setPaused(false));

  let pointerStartX = 0, pointerCurX = 0, dragging = false;
  const threshold = 30;
  track.addEventListener('pointerdown', (ev) => {
    dragging = true;
    pointerStartX = ev.clientX;
    pointerCurX = pointerStartX;
    track.setPointerCapture(ev.pointerId);
    setPaused(true);
  });
  track.addEventListener('pointermove', (ev) => { if (!dragging) return; pointerCurX = ev.clientX; });
  track.addEventListener('pointerup', () => {
    if (!dragging) return;
    dragging = false;
    const diff = pointerCurX - pointerStartX;
    if (Math.abs(diff) > threshold) {
      if (diff < 0) console.log('swipe left');
      else console.log('swipe right');
    } else {
      setPaused(false);
    }
  });
  track.addEventListener('pointercancel', () => { dragging = false; setPaused(false); });

  const applyInitialSpeed = () => {
    const w = root.clientWidth;
    if (w <= 420) track.style.animationDuration = '28s';
    else if (w <= 600) track.style.animationDuration = '24s';
    else if (w <= 900) track.style.animationDuration = '20s';
    else if (w <= 1200) track.style.animationDuration = '18s';
    else track.style.animationDuration = '15s';
  };
  applyInitialSpeed();
  window.addEventListener('resize', applyInitialSpeed);

  const imgs = root.querySelectorAll('img');
  let loaded = 0;
  if (imgs.length === 0) setPaused(false);
  imgs.forEach(img => {
    if (img.complete) { loaded++; return; }
    img.addEventListener('load', () => { loaded++; if (loaded >= imgs.length) setPaused(false); });
    img.addEventListener('error', () => { loaded++; if (loaded >= imgs.length) setPaused(false); });
  });
  setPaused(true);
  setTimeout(() => setPaused(false), 350);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        root.classList.remove('animate-in');
        void root.offsetWidth;
        root.classList.add('animate-in');
      }
    });
  }, { threshold: 0.3 });

  observer.observe(root);
})();


    (function () {
      const CONTENT = {
        vision: {
          title: 'Vision',
          sub: 'A clear picture of our destination — bold, measurable and shared.',
          body: 'To be the most trusted and reliable global logistics partner, delivering exceptional value and building long-term relationships through seamless execution and customer-centric solutions.'
        },
        mission: {
          title: 'Mission',
          sub: 'Every step, planned and executed with care.',
          body: 'As a family-owned freight forwarding company with 16 years of experience in the UAE, based in Dubai, we simplify global trade with reliable, personalized logistics solutions. Our deep local knowledge and commitment to long-term partnerships ensure seamless and efficient cargo movement. Trust, integrity, and open communication are at the core of everything we do.'
        },
        values: {
          title: 'Core Values',
          sub: 'Principles that guide our people and processes.',
          body: null,
          values: ['Outcome Focused', 'Respect & Integrity', 'Innovation', 'Customer Experience']
        }
      };
      const wrapper = document.getElementById('vmx');
      const buttons = Array.from(wrapper.querySelectorAll('.vmx-card'));
      const detail = document.getElementById('vmx-detail');
      const titleEl = document.getElementById('vmx-detail-title');
      const subEl = document.getElementById('vmx-detail-sub');
      const bodyEl = document.getElementById('vmx-detail-body');
      function render(key) {
        const data = CONTENT[key];
        detail.classList.remove('fade-in');
        detail.classList.add('fade-out');
        setTimeout(() => {
          titleEl.textContent = data.title;
          subEl.textContent = data.sub;
          if (data.values) {
            const container = document.createElement('div');
            container.className = 'vmx-values-list';
            data.values.forEach(v => {
              const item = document.createElement('div');
              item.className = 'vmx-values-item';
              item.innerHTML = `<div class="vmx-values-bullet" aria-hidden="true"></div><div><div class="vmx-values-label">${v}</div></div>`;
              container.appendChild(item);
            });
            bodyEl.innerHTML = '';
            bodyEl.appendChild(container);
          } else {
            bodyEl.innerHTML = '';
            bodyEl.textContent = data.body;
          }
          detail.classList.remove('fade-out');
          detail.classList.add('fade-in');
        }, 180);
      }
      function select(btn) {
        buttons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        const key = btn.getAttribute('data-key');
        render(key);
      }
      buttons.forEach((btn) => {
        btn.addEventListener('click', () => select(btn));
        btn.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            select(btn);
          }
        });
      });
      select(buttons[0]);
    })();