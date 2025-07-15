const slides = document.querySelectorAll('.slide');
let index = 0;

function showSlide(i) {
    slides.forEach((slide, idx) => {
        slide.classList.remove('active');
        const textBox = slide.querySelector('.text-box');
        textBox.querySelectorAll('*').forEach(el => {
            el.style.animation = 'none';
            el.style.opacity = 0;
        });
        void textBox.offsetWidth;
    });
    slides[i].classList.add('active');
    const textBox = slides[i].querySelector('.text-box');
    textBox.querySelectorAll('*').forEach(el => {
        el.style.animation = '';
    });
}

setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
}, 4500);

