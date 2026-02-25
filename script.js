const loader = document.getElementById('loader');
const loaderCount = document.getElementById('loaderCount');

const startLoader = () => {
  if (!loader || !loaderCount) return;

  const duration = 1200;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(eased * 100);
    loaderCount.textContent = `${value}%`;

    if (progress < 1) {
      requestAnimationFrame(tick);
      return;
    }

    gsap.to(loader, {
      opacity: 0,
      duration: 0.45,
      ease: 'power2.out',
      onComplete: () => loader.remove()
    });
  };

  requestAnimationFrame(tick);
};

const setupNavigation = () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  menuToggle?.addEventListener('click', () => {
    nav?.classList.toggle('is-open');
  });

  const page = document.body.dataset.page;
  const activeLink = document.querySelector(`[data-nav="${page}"]`);
  if (activeLink) activeLink.setAttribute('aria-current', 'page');

  document.querySelectorAll('.main-nav a').forEach((link) => {
    link.addEventListener('click', () => nav?.classList.remove('is-open'));
  });
};

const setupCustomCursor = () => {
  if (window.matchMedia('(max-width: 960px)').matches) return;

  const outer = document.querySelector('.custom-cursor--outer');
  const inner = document.querySelector('.custom-cursor--inner');
  if (!outer || !inner) return;

  window.addEventListener('mousemove', (event) => {
    gsap.to(outer, { x: event.clientX, y: event.clientY, duration: 0.22, ease: 'power2.out' });
    gsap.to(inner, { x: event.clientX, y: event.clientY, duration: 0.1, ease: 'power2.out' });
  });

  document.querySelectorAll('a, button, input, textarea, select').forEach((element) => {
    element.addEventListener('mouseenter', () => {
      gsap.to(outer, { width: 46, height: 46, duration: 0.2 });
    });
    element.addEventListener('mouseleave', () => {
      gsap.to(outer, { width: 32, height: 32, duration: 0.2 });
    });
  });
};

const setupRevealAnimations = () => {
  const targets = document.querySelectorAll('.reveal-text');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      gsap.to(entry.target, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.85,
        ease: 'power2.out'
      });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  targets.forEach((target, index) => {
    gsap.set(target, { delay: index * 0.04 });
    observer.observe(target);
  });

  const heroImage = document.querySelector('.hero-media img');
  if (heroImage) {
    gsap.to(heroImage, {
      scale: 1.05,
      duration: 8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }
};

startLoader();
setupNavigation();
setupCustomCursor();
setupRevealAnimations();
