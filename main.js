const slider = document.getElementById("slider");
let cards = Array.from(slider.children);

// clone first & last for seamless loop
const firstClone = cards[0].cloneNode(true);
const lastClone = cards[cards.length - 1].cloneNode(true);

slider.appendChild(firstClone);
slider.insertBefore(lastClone, cards[0]);
cards = Array.from(slider.children);

let index = 1;
let gap = window.innerWidth <= 768 ? 20 : 40;

function updatePosition() {
  const active = cards[index];
  const cardWidth = active.offsetWidth;
  gap = window.innerWidth <= 768 ? 20 : 40;

  slider.style.transition = "none";
  slider.style.transform =
    `translateX(calc(50% - ${(index * (cardWidth + gap)) + cardWidth / 2}px))`;
}

updatePosition();

function nextSlide() {
  index++;
  slider.style.transition = "transform 0.6s ease-in-out";

  const active = cards[index];
  const cardWidth = active.offsetWidth;

  slider.style.transform =
    `translateX(calc(50% - ${(index * (cardWidth + gap)) + cardWidth / 2}px))`;
}

slider.addEventListener("transitionend", () => {
  if (index === cards.length - 1) {
    index = 1;
    updatePosition();
  }
  if (index === 0) {
    index = cards.length - 2;
    updatePosition();
  }

  cards.forEach(c => {
    c.classList.remove("big");
    c.classList.add("small");
  });
  cards[index].classList.remove("small");
  cards[index].classList.add("big");
});

setInterval(nextSlide, 2500);
window.addEventListener("resize", updatePosition);
const images = document.querySelectorAll(".carousel-image");
const indicators = document.querySelectorAll(".carousel-indicator");
const title = document.querySelector(".highlights-title");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const carousel = document.querySelector(".carousel-container");

let currentIndex = 0;
let autoScrollInterval;
const AUTO_SCROLL_TIME = 1500;

function updateCarousel() {
  images.forEach((img, i) => {
    img.classList.remove("left", "center", "right");

    if (i === currentIndex) img.classList.add("center");
    else if (i === (currentIndex - 1 + images.length) % images.length) img.classList.add("left");
    else if (i === (currentIndex + 1) % images.length) img.classList.add("right");
  });

  indicators.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });

  title.classList.remove("title-animate");
  void title.offsetWidth;
  title.textContent = images[currentIndex].dataset.title;
  title.classList.add("title-animate");
}

function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  }, AUTO_SCROLL_TIME);
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

nextBtn.onclick = () => {
  stopAutoScroll();
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
  startAutoScroll();
};

prevBtn.onclick = () => {
  stopAutoScroll();
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateCarousel();
  startAutoScroll();
};

indicators.forEach(dot => {
  dot.onclick = () => {
    stopAutoScroll();
    currentIndex = +dot.dataset.index;
    updateCarousel();
    startAutoScroll();
  };
});

carousel.addEventListener("mouseenter", stopAutoScroll);
carousel.addEventListener("mouseleave", startAutoScroll);

updateCarousel();
startAutoScroll();
document.addEventListener("DOMContentLoaded", () => {
  const contactBtn = document.querySelector(".contact-trigger");
  const contactSection = document.querySelector(".contact-section");
  const navbar = document.querySelector(".navbar");

  if (!contactBtn || !contactSection) {
    console.error("Contact elements not found");
    return;
  }

  contactBtn.addEventListener("click", () => {
    const navbarHeight = navbar.offsetHeight;

    const y =
      contactSection.getBoundingClientRect().top +
      window.pageYOffset -
      navbarHeight -
      20;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const registerBtn = document.getElementById("register-btn");
  const highlightsSection = document.getElementById("highlights");
  const navbar = document.querySelector(".navbar");

  if (!registerBtn || !highlightsSection) return;

  registerBtn.addEventListener("click", () => {
    const offset = navbar.offsetHeight + 10;

    const y =
      highlightsSection.getBoundingClientRect().top +
      window.scrollY -
      offset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  });
});


/* ===================== ZOOM ===================== */
const zoomSection = document.querySelector(".zoom-section");
const content = document.querySelector(".content");

let currentScale = 1;
let targetScale = 1;
let ticking = false;

function onScroll() {
  const rect = zoomSection.getBoundingClientRect();
  const vh = window.innerHeight;

  if (rect.bottom <= 0 || rect.top >= vh) return;

  let progress = (vh / 2 - rect.top) / (vh / 2);
  progress = Math.max(0, Math.min(progress, 1));

  const MAX_SCALE = 1.08;  // 🔒 absolute safe limit
  targetScale = 1 + progress * 0.08;

  targetScale = Math.min(targetScale, MAX_SCALE);

  if (!ticking) {
    ticking = true;
    requestAnimationFrame(update);
  }
}

function update() {
  currentScale += (targetScale - currentScale) * 0.15;
  content.style.transform = `scale(${currentScale})`;

  if (Math.abs(targetScale - currentScale) > 0.001) {
    requestAnimationFrame(update);
  } else {
    ticking = false;
  }
}

window.addEventListener("scroll", onScroll, { passive: true });

