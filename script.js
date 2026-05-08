// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function setActiveLink() {
  const scrollY = window.scrollY + 200;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}

window.addEventListener('scroll', setActiveLink);

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinksEl.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinksEl.classList.remove('active');
  });
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach((counter) => {
    const target = parseInt(counter.dataset.target);
    if (!target || counter.dataset.animated) return;

    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current) + '+';
    }, 20);

    counter.dataset.animated = 'true';
  });
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const statsBar = document.querySelector('.stats-bar');
if (statsBar) statsObserver.observe(statsBar);

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: 'smooth',
      });
    }
  });
});

// ===== REVEAL ON SCROLL =====
const revealElements = document.querySelectorAll(
  '.skill-category, .timeline-item, .ai-card, .problem-card, .render-stat, .about-text, .about-image, .contact-detail, .contact-form'
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach((el) => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ===== CONTACT FORM =====
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('.btn');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> MESSAGE SENT!';
  btn.style.background = '#22c55e';
  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.style.background = '';
    form.reset();
  }, 3000);
}

// ===== NAVBAR BACKGROUND ON LOAD =====
if (window.scrollY > 50) {
  navbar.classList.add('scrolled');
}
