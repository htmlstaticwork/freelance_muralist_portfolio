document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const html = document.documentElement;

  /* ======== THEME TOGGLE ======== */
  const savedTheme = localStorage.getItem('muro-theme') || 'dark';
  body.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  document.querySelectorAll('[data-toggle="theme"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cur = body.getAttribute('data-theme');
      const next = cur === 'dark' ? 'light' : 'dark';
      body.setAttribute('data-theme', next);
      localStorage.setItem('muro-theme', next);
      updateThemeIcons(next);
    });
  });

  function updateThemeIcons(theme) {
    document.querySelectorAll('[data-toggle="theme"]').forEach(btn => {
      const sun = btn.querySelector('.icon-sun');
      const moon = btn.querySelector('.icon-moon');
      if (sun && moon) {
        sun.style.display = theme === 'dark' ? 'none' : 'block';
        moon.style.display = theme === 'dark' ? 'block' : 'none';
      }
    });
  }

  /* ======== RTL TOGGLE ======== */
  const savedDir = localStorage.getItem('muro-dir') || 'ltr';
  html.setAttribute('dir', savedDir);

  document.querySelectorAll('[data-toggle="rtl"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cur = html.getAttribute('dir');
      const next = cur === 'rtl' ? 'ltr' : 'rtl';
      html.setAttribute('dir', next);
      localStorage.setItem('muro-dir', next);
    });
  });

  /* ======== HAMBURGER MENU ======== */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        body.style.overflow = '';
      });
    });
    // Mobile dropdowns (Robust Event Delegation)
    mobileMenu.addEventListener('click', (e) => {
      const toggle = e.target.closest('.mobile-dropdown-toggle');
      if (toggle) {
        e.preventDefault();
        e.stopPropagation();
        const dropdown = toggle.closest('.mobile-dropdown');
        if (dropdown) {
          dropdown.classList.toggle('open');
        }
      }
    });
  }

  /* ======== NAVBAR ON SCROLL ======== */
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ======== REVEAL ON SCROLL ======== */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); observer.unobserve(e.target); } });
    }, { threshold: 0.15 });
    reveals.forEach(el => observer.observe(el));
  }

  /* ======== COUNTER ANIMATION ======== */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const cObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          cObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => cObserver.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current) + suffix;
    }, 16);
  }

  /* ======== PORTFOLIO FILTER ======== */
  const filterBtns = document.querySelectorAll('.filter-pill');
  const filterItems = document.querySelectorAll('.masonry-item');
  if (filterBtns.length && filterItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        filterItems.forEach(item => {
          if (cat === 'all' || item.dataset.category === cat) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* ======== FAQ ACCORDION ======== */
  document.querySelectorAll('.faq-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const active = document.querySelector('.faq-item.active');
      if (active && active !== item) active.classList.remove('active');
      item.classList.toggle('active');
    });
  });

  /* ======== SMOOTH SCROLL ======== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  /* ======== CONTACT FORM ======== */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Message Sent ✓';
      btn.style.background = '#2d8a4e';
      setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; contactForm.reset(); }, 3000);
    });
  }

  /* ======== BACK TO TOP ======== */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
