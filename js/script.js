  // Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');
navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  siteNav.classList.toggle('open');
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Reveal on scroll + animate skill bars
const io = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    // Animate any skill bars inside this revealed section
    entry.target.querySelectorAll('.skill-fill[data-pct]').forEach(bar => {
      bar.style.width = bar.dataset.pct + '%';
    });
    obs.unobserve(entry.target);
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Contact form
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');
const whatsappBtn = document.getElementById('whatsapp-btn');
const ownerWhatsApp = '263781968103'; // Zimbabwe international format

form?.addEventListener('submit', e => {
  if (!form.checkValidity()) {
    e.preventDefault();
    status.textContent = 'Please fill out all required fields.';
    return;
  }
  submitBtn.disabled = true;
  status.textContent = 'Sending… opening confirmation in a new tab.';
});

whatsappBtn?.addEventListener('click', () => {
  const name = document.getElementById('name').value || 'No name';
  const email = document.getElementById('email').value || 'No email';
  const msg = document.getElementById('message').value || '';
  if (!msg.trim()) {
    status.textContent = 'Please enter a message first.';
    return;
  }
  const text = `New message from portfolio:%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0A%0AMessage:%0A${encodeURIComponent(msg)}`;
  window.open(`https://api.whatsapp.com/send?phone=${ownerWhatsApp}&text=${text}`, '_blank');
});
