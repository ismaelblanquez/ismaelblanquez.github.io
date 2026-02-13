const smoothLinks = document.querySelectorAll("[data-scroll]");

smoothLinks.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.getAttribute("data-scroll");
    if (!target) return;
    const section = document.querySelector(target);
    section?.scrollIntoView({ behavior: "smooth" });
  });
});

const giftBox = document.querySelector("[data-gift]");
const giftButton = document.querySelector(".gift-box__button");

if (giftBox && giftButton) {
  giftButton.addEventListener("click", () => {
    giftBox.classList.toggle("is-open");
    giftButton.textContent = giftBox.classList.contains("is-open")
      ? "Cerrar sorpresa"
      : "Abrir sorpresa";
  });
}

const heartsContainer = document.createElement("div");
heartsContainer.className = "floating-hearts";
document.body.appendChild(heartsContainer);

const createHeart = () => {
  const heart = document.createElement("span");
  heart.textContent = "❤";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.animationDuration = `${6 + Math.random() * 6}s`;
  heart.style.opacity = `${0.4 + Math.random() * 0.6}`;
  heart.style.fontSize = `${10 + Math.random() * 18}px`;
  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 12000);
};

setInterval(createHeart, 800);
