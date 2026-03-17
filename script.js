// ===========================
// NAVBAR: scroll shadow + active link
// ===========================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===========================
// HAMBURGER MENU (mobile)
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===========================
// SCROLL REVEAL (Intersection Observer)
// ===========================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger children within cards-grid
        const parent = entry.target.closest('.cards-grid, .timeline');
        if (parent) {
          const siblings = Array.from(parent.querySelectorAll('.reveal'));
          const i = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${i * 0.1}s`;
        }
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===========================
// ACTIVE NAV LINK on scroll
// ===========================
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        allNavLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(section => sectionObserver.observe(section));

// ===========================
// CONTACT FORM VALIDATION
// ===========================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

function getField(id) {
  return document.getElementById(id);
}

function getError(id) {
  return document.getElementById(id + 'Error');
}

function setError(fieldId, msg) {
  const field = getField(fieldId);
  const error = getError(fieldId);
  field.classList.add('error');
  error.textContent = msg;
}

function clearError(fieldId) {
  const field = getField(fieldId);
  const error = getError(fieldId);
  field.classList.remove('error');
  error.textContent = '';
}

// Real-time validation on input
['name', 'email', 'message'].forEach(id => {
  getField(id).addEventListener('input', () => clearError(id));
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = getField('name').value.trim();
  const email = getField('email').value.trim();
  const message = getField('message').value.trim();

  let valid = true;

  if (!name) {
    setError('name', 'Please enter your name.');
    valid = false;
  } else {
    clearError('name');
  }

  if (!email) {
    setError('email', 'Please enter your email address.');
    valid = false;
  } else if (!validateEmail(email)) {
    setError('email', 'Please enter a valid email address.');
    valid = false;
  } else {
    clearError('email');
  }

  if (!message) {
    setError('message', 'Please write a message.');
    valid = false;
  } else if (message.length < 10) {
    setError('message', 'Message must be at least 10 characters.');
    valid = false;
  } else {
    clearError('message');
  }

  if (valid) {
    // Simulate submission (no backend)
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';

    setTimeout(() => {
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      formSuccess.classList.add('visible');

      setTimeout(() => {
        formSuccess.classList.remove('visible');
      }, 5000);
    }, 1200);
  }
});
