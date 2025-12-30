const slider = document.getElementById("slider");

setInterval(() => {
  const cards = document.querySelectorAll(".card");

  slider.style.transform = "translateX(-380px)";

  setTimeout(() => {
    slider.appendChild(cards[0]);
    slider.style.transition = "none";
    slider.style.transform = "translateX(0)";

    document.querySelectorAll(".card").forEach(card => {
      card.classList.remove("big");
      card.classList.add("small");
    });

    const updatedCards = document.querySelectorAll(".card");
    updatedCards[0].classList.remove("small");
    updatedCards[0].classList.add("big");

    setTimeout(() => {
      slider.style.transition = "transform 0.5s ease-in-out";
    }, 40);

  }, 800);

}, 2500);
