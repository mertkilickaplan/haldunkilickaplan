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
  
  // Carousel functionality
  initCarousel();
});

// Carousel setup
function initCarousel() {
  const carouselTrack = document.querySelector('.carousel-track');
  if (!carouselTrack) return;
  
  // Carousel images - bu dummy resimleri kendi resimlerinizle değiştirin
  // Daha fazla veya daha az resim ekleyebilirsiniz
  const carouselImages = [
    {
      src: 'assets/carousel-images/project1.jpg',
      alt: 'Proje İzolasyon Çalışması 1'
    },
    {
      src: 'assets/carousel-images/project2.jpg',
      alt: 'Proje İzolasyon Çalışması 2'
    },
    {
      src: 'assets/carousel-images/project3.jpg',
      alt: 'Proje İzolasyon Çalışması 3'
    },
    {
      src: 'assets/carousel-images/project4.jpg',
      alt: 'Proje İzolasyon Çalışması 4'
    },
    {
      src: 'assets/carousel-images/project5.jpg',
      alt: 'Proje İzolasyon Çalışması 5'
    },
    {
      src: 'assets/carousel-images/project6.jpg',
      alt: 'Proje İzolasyon Çalışması 6'
    },
    {
      src: 'assets/carousel-images/project7.jpg',
      alt: 'Proje İzolasyon Çalışması 7'
    },
    {
      src: 'assets/carousel-images/project8.jpg',
      alt: 'Proje İzolasyon Çalışması 8'
    },
    {
      src: 'assets/carousel-images/project9.jpg',
      alt: 'Proje İzolasyon Çalışması 9'
    },
    {
      src: 'assets/carousel-images/project10.jpg',
      alt: 'Proje İzolasyon Çalışması 10'
    },
    {
      src: 'assets/carousel-images/project11.jpg',
      alt: 'Proje İzolasyon Çalışması 11'
    },
    {
      src: 'assets/carousel-images/project12.jpg',
      alt: 'Proje İzolasyon Çalışması 12'
    },
    {
      src: 'assets/carousel-images/project13.jpg',
      alt: 'Proje İzolasyon Çalışması 13'
    }
  ];
  
  // Placeholder olarak kullanılacak varsayılan resim (gerçek resimler ekleninceye kadar)
  const placeholderImage = 'https://via.placeholder.com/1000x600/f9f9f9/555555?text=İz-Kim+Proje+Fotoğrafı';
  
  // Carousel slide'larını oluştur
  carouselImages.forEach((image, index) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    
    const img = document.createElement('img');
    // Test amaçlı placeholder kullanıyoruz; gerçek resimler eklendiğinde kaldırın
    img.src = placeholderImage;
    img.dataset.src = image.src; // Gerçek resim src'sini data attribute olarak saklıyoruz
    img.alt = image.alt;
    img.loading = 'lazy';
    
    slide.appendChild(img);
    carouselTrack.appendChild(slide);
  });
  
  // Dots oluştur
  const dotsContainer = document.querySelector('.carousel-dots');
  carouselImages.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
    dot.dataset.index = index;
    dotsContainer.appendChild(dot);
    
    // Noktalara tıklama olayı ekle
    dot.addEventListener('click', () => {
      currentSlide = index;
      updateCarousel();
    });
  });
  
  // Navigasyon butonları
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  
  let currentSlide = 0;
  let autoplayInterval;
  
  // Carousel'i güncelle
  function updateCarousel() {
    // Track'i kaydır
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Aktif noktayı güncelle
    document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
    
    // Otoplay'i yeniden başlat
    resetAutoplay();
  }
  
  // Önceki slide
  function prevSlide() {
    currentSlide = (currentSlide === 0) ? carouselImages.length - 1 : currentSlide - 1;
    updateCarousel();
  }
  
  // Sonraki slide
  function nextSlide() {
    currentSlide = (currentSlide === carouselImages.length - 1) ? 0 : currentSlide + 1;
    updateCarousel();
  }
  
  // Otomatik oynat
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000); // 5 saniye
  }
  
  // Otoplay'i durdur ve yeniden başlat
  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }
  
  // Buton event listener'ları
  if (prevButton) prevButton.addEventListener('click', prevSlide);
  if (nextButton) nextButton.addEventListener('click', nextSlide);
  
  // Otomatik oynatmayı başlat
  startAutoplay();
  
  // Dokunma kontrolü için
  let touchStartX = 0;
  let touchEndX = 0;
  
  // Dokunma başlangıcı
  carouselTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(autoplayInterval); // Dokunduğunda otomatik oynatmayı durdur
  }, { passive: true });
  
  // Dokunma bitişi
  carouselTrack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoplay(); // Dokunma bittikten sonra otomatik oynatmayı başlat
  }, { passive: true });
  
  // Kaydırma işlemini ele al
  function handleSwipe() {
    const difference = touchStartX - touchEndX;
    const threshold = 50; // Minimum kaydırma mesafesi
    
    if (difference > threshold) {
      nextSlide(); // Sola kaydırma
    } else if (difference < -threshold) {
      prevSlide(); // Sağa kaydırma
    }
  }
  
  // Carousel üzerine gelince otomatik oynatmayı durdur
  const carouselContainer = document.querySelector('.carousel-container');
  carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
  });
  
  // Carousel'den çıkınca otomatik oynatmayı devam ettir
  carouselContainer.addEventListener('mouseleave', () => {
    startAutoplay();
  });
  
  // İlk slide'ı göster
  updateCarousel();
} 