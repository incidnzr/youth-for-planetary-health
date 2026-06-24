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


// Testimonials Slider
const slider = document.getElementById('testimonialsSlider');
if (slider) {
  const slides = slider.querySelectorAll('.testimonial-slide');
  const dotsContainer = slider.querySelector('.testimonial-dots');
  const prevBtn = slider.querySelector('.testimonial-prev');
  const nextBtn = slider.querySelector('.testimonial-next');
  let currentSlide = 0;
  let autoPlay;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('testimonial-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.testimonial-dot');

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  function prevSlide() {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }

  nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
  prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });

  function startAutoPlay() {
    autoPlay = setInterval(nextSlide, 5000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlay);
    startAutoPlay();
  }

  startAutoPlay();
}


// Blog Category Filter
const filterBtns = document.querySelectorAll('.filter-btn');
if (filterBtns.length > 0) {
  const blogCards = document.querySelectorAll('.blog-card[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      blogCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}


// Committees Tab Switcher
const committeeBtns = document.querySelectorAll('.committee-btn');
if (committeeBtns.length > 0) {
  committeeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      committeeBtns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.committee-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('committee-' + btn.dataset.committee).classList.add('active');
    });
  });
}
