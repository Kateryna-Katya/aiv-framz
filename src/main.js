// 1. Инициализация иконок
lucide.createIcons();

// 2. Плавный скролл Lenis
const lenis = new Lenis();
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 3. Продвинутая анимация Hero (GSAP + SplitType)
const heroText = new SplitType('#hero-text', { types: 'chars' });
gsap.from(heroText.chars, {
    opacity: 0,
    y: 100,
    rotate: 10,
    stagger: 0.03,
    duration: 1.5,
    ease: "expo.out",
    delay: 0.5
});

gsap.from('.hero__subtitle, .hero__btns', {
    opacity: 0,
    y: 30,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out",
    delay: 1.2
});

// 4. Мобильное меню
const burger = document.getElementById('burger-menu');
const mobileOverlay = document.getElementById('mobile-overlay');
const mobileLinks = document.querySelectorAll('.mobile-menu__link');

burger.addEventListener('click', () => {
    mobileOverlay.classList.toggle('mobile-menu--active');
    burger.classList.toggle('burger--active');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileOverlay.classList.remove('mobile-menu--active');
    });
});

// 5. Валидация формы и Капча
const form = document.getElementById('main-form');
const phoneInput = document.getElementById('phone-input');
const captchaLabel = document.getElementById('captcha-label');
const captchaInput = document.getElementById('captcha-input');
const formStatus = document.getElementById('form-status');

// Генерация капчи
let captchaResult;
function generateCaptcha() {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    captchaResult = a + b;
    captchaLabel.innerText = `${a} + ${b} = `;
}
generateCaptcha();

// Только цифры для телефона
phoneInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^\d+]/g, '');
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (parseInt(captchaInput.value) !== captchaResult) {
        formStatus.innerText = "Ошибка капчи!";
        formStatus.style.color = "red";
        generateCaptcha();
        return;
    }

    formStatus.innerText = "Отправка...";

    // Имитация AJAX
    setTimeout(() => {
        formStatus.innerText = "Успешно! Мы свяжемся с вами.";
        formStatus.style.color = "green";
        form.reset();
        generateCaptcha();
    }, 1500);
});

// 6. Cookie Logic
const cookiePopup = document.getElementById('cookie-popup');
const cookieAccept = document.getElementById('cookie-accept');

if (!localStorage.getItem('cookies-accepted')) {
    setTimeout(() => {
        cookiePopup.classList.add('cookie-popup--show');
    }, 2000);
}

cookieAccept.addEventListener('click', () => {
    localStorage.setItem('cookies-accepted', 'true');
    cookiePopup.classList.remove('cookie-popup--show');
});

// 7. Анимация появления секций
gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out"
    });
});