// Infinite-loop slider logic for references section with autoplay and dots
// (c) minimalist, vanilla JS

document.addEventListener('DOMContentLoaded', function() {
  // Custom file input filename display
  var fileInput = document.getElementById('attachment');
  var fileChosen = document.getElementById('file-chosen');
  if (fileInput && fileChosen) {
    fileInput.addEventListener('change', function() {
      fileChosen.textContent = this.files && this.files.length > 0 ? this.files[0].name : 'Dosya seçilmedi';
    });
  }

  // Contact form validation
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;
  
  const fields = [
    { id: 'firstName',    errorMsg: 'İsim zorunludur.' },
    { id: 'lastName',     errorMsg: 'Soyisim zorunludur.' },
    { id: 'phone',        errorMsg: 'Geçerli bir telefon numarası girin.' },
    { id: 'email',        errorMsg: 'Geçerli bir e-posta girin.' },
    { id: 'message',      errorMsg: 'Mesaj zorunludur.' }
  ];

  contactForm.addEventListener('submit', function(e) {
    let isValid = true;
    fields.forEach(field => {
      const input = document.getElementById(field.id);
      const errorEl = input.parentElement.querySelector('.error-message');
      if (!input.checkValidity()) {
        errorEl.textContent = field.errorMsg;
        errorEl.classList.add('error-visible');
        isValid = false;
      } else {
        errorEl.classList.remove('error-visible');
      }
    });

    const phoneInput   = document.getElementById('phone');
    const phonePattern = /^05\d{9}$/;
    const phoneErrorEl = phoneInput.parentElement.querySelector('.error-message');
    if (phoneInput.value && !phonePattern.test(phoneInput.value.trim())) {
      phoneErrorEl.textContent = 'Geçerli bir telefon numarası girin.';
      phoneErrorEl.classList.add('error-visible');
      isValid = false;
    }

    const emailInput   = document.getElementById('email');
    const emailErrorEl = emailInput.parentElement.querySelector('.error-message');
    if (emailInput.value && !emailInput.checkValidity()) {
      emailErrorEl.textContent = 'Geçerli bir e-posta girin.';
      emailErrorEl.classList.add('error-visible');
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault(); // Only prevent submission when validation fails
    }
    // If isValid remains true, allow default form submit to Formspree
  });
}); 