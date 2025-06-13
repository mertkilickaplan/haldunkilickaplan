// Infinite-loop slider logic for references section with autoplay and dots
// (c) minimalist, vanilla JS

document.addEventListener('DOMContentLoaded', function() {
  // WebP desteğini kontrol et
  checkWebpSupport();
  
  // Custom file input filename display
  const fileInput = document.getElementById('attachment');
  const fileChosen = document.getElementById('file-chosen');
  if (fileInput && fileChosen) {
    fileInput.addEventListener('change', function() {
      fileChosen.textContent = this.files && this.files.length > 0 ? this.files[0].name : 'Dosya seçilmedi';
    });
  }

  // Contact form validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
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
  }
  
  // Carousel functionality
  initCarousel();
});

// WebP desteğini kontrol et
function checkWebpSupport() {
  const webpSupport = localStorage.getItem('webpSupport');
  
  if (webpSupport === null) {
    const webpTest = new Image();
    webpTest.onload = function() {
      localStorage.setItem('webpSupport', 'true');
      document.documentElement.classList.add('webp');
    };
    webpTest.onerror = function() {
      localStorage.setItem('webpSupport', 'false');
      document.documentElement.classList.add('no-webp');
    };
    webpTest.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
  } else if (webpSupport === 'true') {
    document.documentElement.classList.add('webp');
  } else {
    document.documentElement.classList.add('no-webp');
  }
}

// Carousel setup - Performans iyileştirmesi için optimize edildi
function initCarousel() {
  const carouselTrack = document.querySelector('.carousel-track');
  if (!carouselTrack) return;
  
  // WebP desteği kontrolü
  const isWebpSupported = document.documentElement.classList.contains('webp');
  
  // Carousel images - bu dummy resimleri kendi resimlerinizle değiştirin
  // Daha fazla veya daha az resim ekleyebilirsiniz
  const carouselImages = [
    {
      src: 'assets/carousel-images/project1.jpg',
      webp: 'assets/carousel-images/project1.webp',
      alt: 'Proje İzolasyon Çalışması 1'
    },
    {
      src: 'assets/carousel-images/project2.jpg',
      webp: 'assets/carousel-images/project2.webp',
      alt: 'Proje İzolasyon Çalışması 2'
    },
    {
      src: 'assets/carousel-images/project3.jpg',
      webp: 'assets/carousel-images/project3.webp',
      alt: 'Proje İzolasyon Çalışması 3'
    },
    {
      src: 'assets/carousel-images/project4.jpg',
      webp: 'assets/carousel-images/project4.webp',
      alt: 'Proje İzolasyon Çalışması 4'
    },
    {
      src: 'assets/carousel-images/project5.jpg',
      webp: 'assets/carousel-images/project5.webp',
      alt: 'Proje İzolasyon Çalışması 5'
    },
    {
      src: 'assets/carousel-images/project6.jpg',
      webp: 'assets/carousel-images/project6.webp',
      alt: 'Proje İzolasyon Çalışması 6'
    },
    {
      src: 'assets/carousel-images/project7.jpg',
      webp: 'assets/carousel-images/project7.webp',
      alt: 'Proje İzolasyon Çalışması 7'
    },
    {
      src: 'assets/carousel-images/project8.jpg',
      webp: 'assets/carousel-images/project8.webp',
      alt: 'Proje İzolasyon Çalışması 8'
    },
    {
      src: 'assets/carousel-images/project9.jpg',
      webp: 'assets/carousel-images/project9.webp',
      alt: 'Proje İzolasyon Çalışması 9'
    },
    {
      src: 'assets/carousel-images/project10.jpg',
      webp: 'assets/carousel-images/project10.webp',
      alt: 'Proje İzolasyon Çalışması 10'
    },
    {
      src: 'assets/carousel-images/project11.jpg',
      webp: 'assets/carousel-images/project11.webp',
      alt: 'Proje İzolasyon Çalışması 11'
    },
    {
      src: 'assets/carousel-images/project12.jpg',
      webp: 'assets/carousel-images/project12.webp',
      alt: 'Proje İzolasyon Çalışması 12'
    },
    {
      src: 'assets/carousel-images/project13.jpg',
      webp: 'assets/carousel-images/project13.webp',
      alt: 'Proje İzolasyon Çalışması 13'
    }
  ];
  
  // Placeholder olarak kullanılacak varsayılan resim (gerçek resimler ekleninceye kadar)
  const placeholderImage = 'https://via.placeholder.com/1000x600/f9f9f9/555555?text=İz-Kim+Proje+Fotoğrafı';
  
  // DOM manipülasyonlarını azaltmak için fragment kullanımı
  const fragment = document.createDocumentFragment();
  const dotsFragment = document.createDocumentFragment();
  
  // Carousel slide'larını oluştur
  carouselImages.forEach((image, index) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    
    const img = document.createElement('img');
    // Lazy loading kullan
    img.loading = 'lazy';
    // Görsel yüklenene kadar boyut bilgisi ver
    img.width = 1000;
    img.height = 600;
    img.alt = image.alt;
    
    // Görsel yüklenmesi için event listener ekle
    img.onload = function() {
      // Görsel yüklendiğinde animasyon ekle
      this.classList.add('loaded');
    };
    
    img.onerror = function() {
      // Görsel yüklenemezse placeholder kullan
      this.src = placeholderImage;
      console.log('Görsel yüklenemedi: ' + image.src);
    };
    
    // WebP desteği varsa WebP formatını kullan
    img.src = isWebpSupported && image.webp ? image.webp : image.src;
    
    slide.appendChild(img);
    fragment.appendChild(slide);
    
    // Dot oluştur
    const dot = document.createElement('div');
    dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
    dot.dataset.index = index;
    dotsFragment.appendChild(dot);
  });
  
  // Tüm slide'ları bir kerede DOM'a ekle
  carouselTrack.appendChild(fragment);
  
  // Dots oluştur
  const dotsContainer = document.querySelector('.carousel-dots');
  if (dotsContainer) {
    dotsContainer.appendChild(dotsFragment);
    
    // Event delegation kullanarak tek bir event listener ekle
    dotsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('carousel-dot')) {
        currentSlide = parseInt(e.target.dataset.index, 10);
        updateCarousel();
      }
    });
  }
  
  // Navigasyon butonları
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  
  let currentSlide = 0;
  let autoplayInterval;
  let isAnimating = false;
  
  // Carousel'i güncelle - Throttling eklenmiş
  function updateCarousel() {
    if (isAnimating) return;
    
    isAnimating = true;
    
    // Track'i kaydır
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Aktif noktayı güncelle
    document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
    
    // Animasyon bittikten sonra isAnimating'i false yap
    setTimeout(() => {
      isAnimating = false;
    }, 500); // CSS transition süresi ile eşleştir
    
    // Otoplay'i yeniden başlat
    resetAutoplay();
  }
  
  // Önceki slide
  function prevSlide() {
    if (isAnimating) return;
    currentSlide = (currentSlide === 0) ? carouselImages.length - 1 : currentSlide - 1;
    updateCarousel();
  }
  
  // Sonraki slide
  function nextSlide() {
    if (isAnimating) return;
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
  
  // Buton event listener'ları - Passive true ekle
  if (prevButton) prevButton.addEventListener('click', prevSlide, { passive: true });
  if (nextButton) nextButton.addEventListener('click', nextSlide, { passive: true });
  
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
    if (isAnimating) return;
    
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
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
      clearInterval(autoplayInterval);
    }, { passive: true });
    
    // Carousel'den çıkınca otomatik oynatmayı devam ettir
    carouselContainer.addEventListener('mouseleave', () => {
      startAutoplay();
    }, { passive: true });
  }
  
  // İlk slide'ı göster
  updateCarousel();
} 