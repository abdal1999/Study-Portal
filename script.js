const carousel = document.querySelector('.testimonial-carousel');
let scrollAmount = 0;
const scrollStep = 280; // width of one testimonial + gap
const delay = 1000; // 1 seconds
let intervalId;

function autoScroll() {
  scrollAmount += scrollStep;
  if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
    scrollAmount = 0; // reset scroll to start
  }
  carousel.scrollTo({
    left: scrollAmount,
    behavior: 'smooth'
  });
}

function startAutoScroll() {
  intervalId = setInterval(autoScroll, delay);
}

function stopAutoScroll() {
  clearInterval(intervalId);
}

// Start auto scroll when page loads
startAutoScroll();

// Pause on hover
carousel.addEventListener('mouseenter', stopAutoScroll);
carousel.addEventListener('mouseleave', startAutoScroll);

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if(window.scrollY > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
window.addEventListener('scroll', () => {
  if(window.scrollY > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});
