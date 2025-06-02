// Smooth scrolling for navigation links
function setupSmoothScrolling() {
  document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Dark mode toggle
function setupDarkMode() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.getElementById('theme-body');
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
  });
  // Load saved theme
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
  }
}

// Scroll-to-top button
function setupScrollTop() {
  const scrollTopBtn = document.getElementById('scroll-top');
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('hidden', window.scrollY <= 300);
  });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Modal functionality
function openModal() {
  document.getElementById('course-modal').classList.remove('hidden');
}
function closeModal() {
  document.getElementById('course-modal').classList.add('hidden');
}

// Search functionality
function setupSearch() {
  const searchBar = document.getElementById('search-bar');
  const searchResults = document.getElementById('search-results');
  const courses = [
    { name: 'Web Development', category: 'technology' },
    { name: 'Digital Painting', category: 'arts' },
    { name: 'Business Analytics', category: 'business' },
    { name: 'Python Programming', category: 'technology' },
    { name: 'Photography Basics', category: 'arts' }
  ];

  searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase().trim();
    searchResults.innerHTML = '';
    if (query) {
      const filteredCourses = courses.filter(course => course.name.toLowerCase().includes(query));
      searchResults.classList.remove('hidden');
      if (filteredCourses.length) {
        filteredCourses.forEach(course => {
          const div = document.createElement('div');
          div.className = 'p-2 cursor-pointer';
          div.textContent = course.name;
          div.addEventListener('click', () => {
            searchBar.value = course.name;
            searchResults.classList.add('hidden');
          });
          searchResults.appendChild(div);
        });
      } else {
        searchResults.innerHTML = '<div class="p-2">No results found</div>';
      }
    } else {
      searchResults.classList.add('hidden');
    }
  });

  document.addEventListener('click', (e) => {
    if (!searchBar.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.classList.add('hidden');
    }
  });
}

// Course filter functionality
function setupCourseFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const featureCards = document.querySelectorAll('.feature-card');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');
      featureCards.forEach(card => {
        card.classList.add('hidden');
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.classList.remove('hidden');
          card.classList.add('animate-fade-in');
        }
      });
    });
  });
}

// Testimonial carousel
function setupCarousel() {
  const testimonials = document.querySelectorAll('.testimonial');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  let currentIndex = 0;

  function showTestimonial(index) {
    testimonials.forEach((t, i) => {
      t.classList.add('hidden');
      t.classList.remove('animate-slide');
      if (i === index) {
        t.classList.remove('hidden');
        t.classList.add('animate-slide');
      }
    });
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  });

  setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  }, 5000);
}

// Contact form handling with progress tracker
function setupContactForm() {
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const formProgress = document.getElementById('form-progress');
  const formMessage = document.getElementById('form-message');
  const formSuccess = document.getElementById('form-success');

  function updateProgress() {
    const totalFields = 3;
    let filledFields = 0;
    if (nameInput.value.trim()) filledFields++;
    if (emailInput.value.trim()) filledFields++;
    if (messageInput.value.trim()) filledFields++;
    const progress = (filledFields / totalFields) * 100;
    formProgress.style.width = `${progress}%`;
  }

  nameInput.addEventListener('input', updateProgress);
  emailInput.addEventListener('input', updateProgress);
  messageInput.addEventListener('input', updateProgress);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = nameInput.value;
    const email = emailInput.value;
    const message = messageInput.value;

    if (name.trim() === '' || email.trim() === '' || message.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formMessage.classList.remove('hidden');
      formSuccess.classList.add('hidden');
      return;
    }

    const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    submissions.push({ name, email, message, timestamp: new Date().toISOString() });
    localStorage.setItem('formSubmissions', JSON.stringify(submissions));

    formMessage.classList.add('hidden');
    formSuccess.classList.remove('hidden');
    form.reset();
    formProgress.style.width = '0%';

    setTimeout(() => {
      formSuccess.classList.add('hidden');
    }, 3000);
  });
}

// Newsletter form handling
function setupNewsletterForm() {
  document.getElementById('newsletter-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    const message = document.getElementById('newsletter-message');
    const success = document.getElementById('newsletter-success');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      message.classList.remove('hidden');
      success.classList.add('hidden');
      return;
    }

    const subscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions') || '[]');
    subscriptions.push({ email, timestamp: new Date().toISOString() });
    localStorage.setItem('newsletterSubscriptions', JSON.stringify(subscriptions));

    message.classList.add('hidden');
    success.classList.remove('hidden');
    this.reset();

    setTimeout(() => {
      success.classList.add('hidden');
    }, 3000);
  });
}

// Course counter
function setupCourseCounter() {
  const courseCount = document.getElementById('course-count');
  let count = 0;
  const maxCount = 1500; // Simulated course count
  const increment = Math.ceil(maxCount / 100);
  const interval = setInterval(() => {
    count += increment;
    if (count >= maxCount) {
      count = maxCount;
      clearInterval(interval);
    }
    courseCount.textContent = count.toLocaleString();
  }, 50);
}

// Initialize all functionalities
document.addEventListener('DOMContentLoaded', () => {
  setupSmoothScrolling();
  setupDarkMode();
  setupScrollTop();
  setupSearch();
  setupCourseFilter();
  setupCarousel();
  setupContactForm();
  setupNewsletterForm();
  setupCourseCounter();
});