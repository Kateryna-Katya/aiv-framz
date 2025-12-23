/**
 * Project: Aiv-Framz.blog
 * Final Fixed Script
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Инициализация иконок Lucide ---
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- 2. Плавный скролл Lenis ---
    let lenis;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // --- 3. Анимация заголовка (SplitType + GSAP) ---
    const heroTitle = document.querySelector('#hero-text');
    if (heroTitle && typeof SplitType !== 'undefined' && typeof gsap !== 'undefined') {
        
        const textInstance = new SplitType(heroTitle, { 
            types: 'words, chars',
            tagName: 'span' 
        });

        // ИСПРАВЛЕНО: используем whiteSpace (camelCase) вместо white-space
        gsap.set('.word', { 
            display: 'inline-block', 
            whiteSpace: 'nowrap' 
        });

        gsap.from(textInstance.chars, {
            scrollTrigger: {
                trigger: heroTitle,
                start: "top 90%",
            },
            opacity: 0,
            y: 70,
            rotateX: -90,
            stagger: 0.02,
            duration: 1,
            ease: "expo.out",
        });

        gsap.from('.hero__subtitle, .hero__btns', {
            opacity: 0,
            y: 30,
            duration: 1,
            stagger: 0.2,
            delay: 0.8,
            ease: "power3.out"
        });
    }

    // --- 4. Анимация появления всех секций ---
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.utils.toArray('.section').forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: "power2.out"
            });
        });
    }

    // --- 5. Мобильное меню (Burger) ---
    const burger = document.getElementById('burger-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-menu__link');

    if (burger && mobileOverlay) {
        burger.addEventListener('click', () => {
            mobileOverlay.classList.toggle('mobile-menu--active');
            document.body.style.overflow = mobileOverlay.classList.contains('mobile-menu--active') ? 'hidden' : '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileOverlay.classList.remove('mobile-menu--active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- 6. Валидация формы и Капча ---
    const form = document.getElementById('main-form');
    if (form) {
        const captchaLabel = document.getElementById('captcha-label');
        const captchaInput = document.getElementById('captcha-input');
        const phoneInput = document.getElementById('phone-input');
        const formStatus = document.getElementById('form-status');
        let captchaResult;

        const generateCaptcha = () => {
            const num1 = Math.floor(Math.random() * 10) + 1;
            const num2 = Math.floor(Math.random() * 10) + 1;
            captchaResult = num1 + num2;
            if (captchaLabel) captchaLabel.innerText = `${num1} + ${num2} = `;
        };

        generateCaptcha();

        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^\d+]/g, '');
            });
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (parseInt(captchaInput.value) !== captchaResult) {
                if (formStatus) {
                    formStatus.innerText = "Ошибка капчи!";
                    formStatus.style.color = "red";
                }
                generateCaptcha();
                return;
            }
            if (formStatus) {
                formStatus.innerText = "Успешно отправлено!";
                formStatus.style.color = "green";
            }
            form.reset();
            generateCaptcha();
        });
    }

    // --- 7. Cookie Popup ---
    const cookiePopup = document.getElementById('cookie-popup');
    const cookieAccept = document.getElementById('cookie-accept');

    if (cookiePopup && !localStorage.getItem('aiv_cookies_accepted')) {
        setTimeout(() => cookiePopup.classList.add('cookie-popup--show'), 2000);
    }

    if (cookieAccept) {
        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('aiv_cookies_accepted', 'true');
            cookiePopup.classList.remove('cookie-popup--show');
        });
    }

    // --- 8. Якорные ссылки ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                if (lenis) lenis.scrollTo(target);
                else target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});