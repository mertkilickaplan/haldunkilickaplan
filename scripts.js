// Infinite-loop slider logic for references section with autoplay and dots
// (c) minimalist, vanilla JS

document.addEventListener('DOMContentLoaded', function() {
  const wrapper = document.querySelector('.slides-wrapper');
  if (!wrapper) return;
  const slides = Array.from(wrapper.querySelectorAll('.slide'));
  const prevButton = document.querySelector('.prev-arrow');
  const nextButton = document.querySelector('.next-arrow');
  const dotsContainer = document.querySelector('.dots-container');
  let autoplayInterval = null;

  // Responsive: how many cards per view?
  function getCardsPerView() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    if (window.innerWidth <= 1024) return 3;
    return 4;
  }

  // Calculate slide width including gap
  function getSlideWidth() {
    const slide = slides[0];
    const slideRect = slide.getBoundingClientRect();
    let gap = 0;
    const wrapperStyle = getComputedStyle(wrapper);
    if (wrapperStyle.gap) {
      gap = parseFloat(wrapperStyle.gap);
    } else {
      gap = parseFloat(getComputedStyle(slide).marginRight);
    }
    return slideRect.width + gap;
  }

  let slideWidth = getSlideWidth();
  let cardsPerView = getCardsPerView();
  let index = slides.length; // start at first real slide after cloned prefix

  // Clone all slides twice: prefix and suffix for infinite loop
  const totalSlides = slides.length;
  const prefixSlides = slides.map(slide => slide.cloneNode(true));
  const suffixSlides = slides.map(slide => slide.cloneNode(true));
  prefixSlides.forEach(clone => wrapper.prepend(clone));
  suffixSlides.forEach(clone => wrapper.append(clone));

  // Update slides array to include clones
  const allSlides = Array.from(wrapper.querySelectorAll('.slide'));
  const updateWrapperPosition = () => {
    wrapper.style.transform = `translateX(-${slideWidth * index}px)`;
  };

  // Dots logic
  function createDots() {
    dotsContainer.innerHTML = '';
    cardsPerView = getCardsPerView();
    const pageCount = Math.ceil(totalSlides / cardsPerView);
    for (let i = 0; i < pageCount; i++) {
      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goToPage(i));
      dotsContainer.appendChild(dot);
    }
    updateDots();
  }
  function updateDots() {
    const dots = dotsContainer.querySelectorAll('.dot');
    cardsPerView = getCardsPerView();
    const pageCount = Math.ceil(totalSlides / cardsPerView);
    let currentPage = Math.floor((index - totalSlides) / cardsPerView);
    if (currentPage < 0) currentPage = 0;
    if (currentPage >= pageCount) currentPage = pageCount - 1;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentPage);
    });
  }
  function goToPage(page) {
    cardsPerView = getCardsPerView();
    index = totalSlides + page * cardsPerView;
    wrapper.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
    updateWrapperPosition();
    updateDots();
  }

  // Initial positioning after DOM load
  updateWrapperPosition();
  createDots();

  // Handle window resize: recalculate slideWidth/cardsPerView and reposition
  window.addEventListener('resize', () => {
    slideWidth = getSlideWidth();
    cardsPerView = getCardsPerView();
    updateWrapperPosition();
    createDots();
  });

  // Move to next slide
  function moveNext() {
    index++;
    wrapper.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
    updateWrapperPosition();
    // After transition, if at end of suffix, jump immediately to real first slide
    wrapper.addEventListener('transitionend', function checkNext() {
      if (index >= totalSlides * 2) {
        wrapper.style.transition = 'none';
        index = totalSlides;
        updateWrapperPosition();
      }
      wrapper.removeEventListener('transitionend', checkNext);
      updateDots();
    });
  }

  // Move to previous slide
  function movePrev() {
    index--;
    wrapper.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
    updateWrapperPosition();
    // After transition, if at start of prefix, jump immediately to real last slide
    wrapper.addEventListener('transitionend', function checkPrev() {
      if (index < totalSlides) {
        wrapper.style.transition = 'none';
        index = totalSlides * 2 - 1;
        updateWrapperPosition();
      }
      wrapper.removeEventListener('transitionend', checkPrev);
      updateDots();
    });
  }

  nextButton.addEventListener('click', moveNext);
  prevButton.addEventListener('click', movePrev);

  // Autoplay logic
  function startAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = setInterval(moveNext, 5000);
  }
  function stopAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
  }
  startAutoplay();
  document.querySelector('.references-slider').addEventListener('mouseenter', stopAutoplay);
  document.querySelector('.references-slider').addEventListener('mouseleave', startAutoplay);

  // ======= Custom File Input Filename Display =======
  var fileInput = document.getElementById('attachment');
  var fileChosen = document.getElementById('file-chosen');
  if (fileInput && fileChosen) {
    fileInput.addEventListener('change', function() {
      fileChosen.textContent = this.files && this.files.length > 0 ? this.files[0].name : 'Dosya seçilmedi';
    });
  }

  // ======= İletişim Formu Basit Doğrulama (Fade-in error) =======
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
    e.preventDefault();
    let isValid = true;

    // Her field için kontrol
    fields.forEach(field => {
      const input = document.getElementById(field.id);
      const errorEl = input.parentElement.querySelector('.error-message');
      if (!input.checkValidity()) {
        errorEl.textContent = field.errorMsg;
        errorEl.classList.add('visible');
        isValid = false;
      } else {
        errorEl.classList.remove('visible');
      }
    });

    // Telefon için ek pattern doğrulaması
    const phoneInput = document.getElementById('phone');
    const phonePattern = /^\+?\d{10,15}$/;
    const phoneErrorEl = phoneInput.parentElement.querySelector('.error-message');
    if (phoneInput.value && !phonePattern.test(phoneInput.value.trim())) {
      phoneErrorEl.textContent = 'Geçerli bir telefon numarası girin.';
      phoneErrorEl.classList.add('visible');
      isValid = false;
    }

    // E-posta için ek kontrol
    const emailInput = document.getElementById('email');
    const emailErrorEl = emailInput.parentElement.querySelector('.error-message');
    if (emailInput.value && !emailInput.checkValidity()) {
      emailErrorEl.textContent = 'Geçerli bir e-posta girin.';
      emailErrorEl.classList.add('visible');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Form verilerini konsola yaz
    const submittedData = {
      firstName: document.getElementById('firstName').value.trim(),
      lastName:  document.getElementById('lastName').value.trim(),
      phone:     document.getElementById('phone').value.trim(),
      email:     document.getElementById('email').value.trim(),
      message:   document.getElementById('message').value.trim(),
      attachment: document.getElementById('attachment').files[0] || null
    };
    console.log('Form başarıyla gönderildi:', submittedData);

    // Formu sıfırla ve kullanıcıya bilgi ver
    contactForm.reset();
    var fileChosen = document.getElementById('file-chosen');
    if (fileChosen) fileChosen.textContent = 'Dosya seçilmedi';
    alert('Mesajınız başarıyla gönderildi. Teşekkürler!');
  });
}); 