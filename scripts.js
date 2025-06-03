// Infinite-loop slider logic for references section
// (c) minimalist, vanilla JS

document.addEventListener('DOMContentLoaded', function() {
  const wrapper = document.querySelector('.slides-wrapper');
  if (!wrapper) return;
  const slides = Array.from(wrapper.querySelectorAll('.slide'));
  const prevButton = document.querySelector('.prev-arrow');
  const nextButton = document.querySelector('.next-arrow');

  // Calculate slide width including gap
  function getSlideWidth() {
    const slide = slides[0];
    const slideRect = slide.getBoundingClientRect();
    // Try to get gap from wrapper, fallback to marginRight
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

  // Initial positioning after DOM load
  updateWrapperPosition();

  // Handle window resize: recalculate slideWidth and reposition
  window.addEventListener('resize', () => {
    slideWidth = getSlideWidth();
    updateWrapperPosition();
  });

  // Move to next slide
  function moveNext() {
    index++;
    wrapper.style.transition = 'transform 0.45s ease-in-out';
    updateWrapperPosition();
    // After transition, if at end of suffix, jump immediately to real first slide
    wrapper.addEventListener('transitionend', function checkNext() {
      if (index >= totalSlides * 2) {
        wrapper.style.transition = 'none';
        index = totalSlides;
        updateWrapperPosition();
      }
      wrapper.removeEventListener('transitionend', checkNext);
    });
  }

  // Move to previous slide
  function movePrev() {
    index--;
    wrapper.style.transition = 'transform 0.45s ease-in-out';
    updateWrapperPosition();
    // After transition, if at start of prefix, jump immediately to real last slide
    wrapper.addEventListener('transitionend', function checkPrev() {
      if (index < totalSlides) {
        wrapper.style.transition = 'none';
        index = totalSlides * 2 - 1;
        updateWrapperPosition();
      }
      wrapper.removeEventListener('transitionend', checkPrev);
    });
  }

  nextButton.addEventListener('click', moveNext);
  prevButton.addEventListener('click', movePrev);
}); 