// Mobile navigation toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const icon = mobileToggle?.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Netlify Forms - optional success message handling
const forms = document.querySelectorAll('form[netlify]');
forms.forEach(form => {
  form.addEventListener('submit', (e) => {
    // Netlify handles the actual submission; this is just for UX
    const button = form.querySelector('button[type="submit"]');
    if (button) {
      button.textContent = 'Submitting...';
      button.disabled = true;
    }
  });
});