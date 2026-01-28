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
