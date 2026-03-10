// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  siteNav.classList.toggle('open');
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      // close nav on small screens
      if (siteNav.classList.contains('open')){
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded','false');
      }
    }
  });
});

// Set current year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// Simple contact form validation + demo submit
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');
const whatsappBtn = document.getElementById('whatsapp-btn');

// Owner WhatsApp number (replace with international format: e.g. 263781968103 without + or leading zeros)
// If you don't know the correct country code, leave as provided but WhatsApp may not open correctly.
const ownerWhatsAppNumber = '0781968103';

form?.addEventListener('submit', (e) => {
  // Basic client-side validation: if invalid, prevent submit and show message
  if (!form.checkValidity()) {
    e.preventDefault();
    status.textContent = 'Please fill out all required fields correctly.';
    return;
  }

  // Allow the form to submit to FormSubmit.co (opens in a new tab because of target="_blank")
  submitBtn.setAttribute('disabled','');
  status.textContent = 'Sending… Opening confirmation in a new tab.';
  // Note: FormSubmit will send the email to the configured address; first-time submitters must confirm via email.
});

// Build WhatsApp message and open chat
whatsappBtn?.addEventListener('click', () => {
  const name = (document.getElementById('name') || {}).value || 'No name';
  const email = (document.getElementById('email') || {}).value || 'No email';
  const phone = (document.getElementById('phone') || {}).value || 'No phone';
  const message = (document.getElementById('message') || {}).value || '';

  if (!message.trim()) {
    status.textContent = 'Please enter a message before sending via WhatsApp.';
    return;
  }

  // Compose the WhatsApp text
  const text = `New message from portfolio:%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0APhone: ${encodeURIComponent(phone)}%0A%0AMessage:%0A${encodeURIComponent(message)}`;

  // Use api.whatsapp.com/send with phone parameter. Phone number should be in international format without + or leading zeros.
  // Example: for Zimbabwe +263 781 968 103 -> 263781968103
  const phoneForUrl = ownerWhatsAppNumber; // replace if you update to international format
  const waUrl = `https://api.whatsapp.com/send?phone=${phoneForUrl}&text=${text}`;

  // Open in new tab/window
  window.open(waUrl, '_blank');
});

// Reveal on scroll using IntersectionObserver
const revealElems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealElems.length) {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  revealElems.forEach(el => io.observe(el));
} else {
  // fallback: reveal all
  revealElems.forEach(el => el.classList.add('visible'));
}

// --- Project preview modal (opened from project card) ---
function openProjectPreview(src){
  let modal = document.getElementById('projectPreviewModal');
  if (!modal){
    modal = document.createElement('div');
    modal.id = 'projectPreviewModal';
    modal.className = 'preview-modal';
    modal.setAttribute('aria-hidden','true');
    modal.innerHTML = `
      <div class="preview-modal-content" role="dialog" aria-modal="true">
        <button class="modal-close" aria-label="Close preview" onclick="closeProjectPreview()">✕</button>
        <iframe id="projectPreviewIframe" src="" frameborder="0" sandbox="allow-scripts allow-same-origin allow-forms"></iframe>
      </div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeProjectPreview(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeProjectPreview(); });
  }
  const iframe = document.getElementById('projectPreviewIframe');
  iframe.src = src;
  modal.setAttribute('aria-hidden','false');
}

function closeProjectPreview(){
  const modal = document.getElementById('projectPreviewModal');
  if (!modal) return;
  const iframe = document.getElementById('projectPreviewIframe');
  iframe.src = 'about:blank';
  modal.setAttribute('aria-hidden','true');
}
