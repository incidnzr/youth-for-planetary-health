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

// Netlify Forms — AJAX submit + SweetAlert2 popup
document.querySelectorAll('form[netlify]').forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const button = form.querySelector('button[type="submit"]');
    const originalText = button ? button.textContent : '';

    if (button) {
      button.textContent = 'Submitting...';
      button.disabled = true;
    }

    try {
      const data = new FormData(form);
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString()
      });

      form.reset();

      Swal.fire({
        icon: 'success',
        title: 'Thank you!',
        text: 'Your submission has been received. We\'ll be in touch soon.',
        confirmButtonText: 'Close',
        confirmButtonColor: '#1e4a4b',
        borderRadius: '16px',
        customClass: {
          popup: 'swal-popup',
          title: 'swal-title',
        }
      });

    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Something went wrong. Please try again or email us directly.',
        confirmButtonColor: '#1e4a4b',
      });
    } finally {
      if (button) {
        button.textContent = originalText;
        button.disabled = false;
      }
    }
  });
});