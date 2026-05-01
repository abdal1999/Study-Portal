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
const toggle = document.getElementById("nav-toggle");
const menu = document.getElementById("nav-menu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});

(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="8t2S1JBOWt38BpunsQvo1";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();

function openSciencePractical() {
  window.location.href = "science-practical.html";
}

const toggle = document.getElementById("nav-toggle");
const menu = document.getElementById("nav-menu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

document.addEventListener("copy", function (e) {
  e.preventDefault();
});

document.addEventListener("cut", function (e) {
  e.preventDefault();
});

document.addEventListener("keydown", function (e) {
  // Ctrl + U (view source)
  if (e.ctrlKey && e.key.toLowerCase() === "u") {
    e.preventDefault();
  }

  // Ctrl + S (save page)
  if (e.ctrlKey && e.key.toLowerCase() === "s") {
    e.preventDefault();
  }

  // Ctrl + C / Ctrl + A
  if (e.ctrlKey && (e.key.toLowerCase() === "c" || e.key.toLowerCase() === "a")) {
    e.preventDefault();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }
});

  const nav = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const header = document.querySelector('header');

    navToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });

     if (
    (e.ctrlKey && (e.key === "c" || e.key === "u" || e.key === "s" || e.key === "a")) ||
    (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
    e.key === "F12"
  ) {
    e.preventDefault();
  }
 document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  

