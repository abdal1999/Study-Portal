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
const mathFacts = [
  "Zero is the only number that can't be represented in Roman numerals.",
  "A 'googol' is 1 followed by 100 zeros!",
  "The word 'hundred' comes from the old Norse term, 'hundrath', which actually means 120.",
  "Did you know? A circle has infinite lines of symmetry!",
  "The number π (pi) has been calculated to over 31 trillion digits.",
  "The Fibonacci sequence appears in nature, like in pinecones and sunflowers!",
  "‘Four’ is the only number with the same number of letters as its value.",
  "In a room of 23 people, there's a 50% chance two share a birthday!",
  "A perfect number is equal to the sum of its proper divisors. 28 is one of them!",
  "You can cut a cake into 8 pieces with just 3 cuts!"
];
const scienceFacts = [
    "The human body has 206 bones.",
    "Water can boil and freeze at the same time!",
    "Lightning is 5 times hotter than the surface of the sun.",
    "Plants can communicate using chemical signals.",
    "Saturn could float on water—it’s that light!"
  ];

function showMathFact() {
  const fact = mathFacts[Math.floor(Math.random() * mathFacts.length)];

  const popup = document.createElement('div');
  popup.className = 'math-fact-popup';
  popup.innerHTML = `📘 Math Fact: ${fact}`;

  document.body.appendChild(popup);
    // Create the close button
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = () => popup.remove();

    // Append fact and close button to popup
    popup.appendChild(closeBtn);
    popup.appendChild(document.createTextNode(fact));

    document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 8000);
}

window.onload = showMathFact;