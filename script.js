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

const revealItems = document.querySelectorAll("[data-reveal]");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const progressBar = document.querySelector(".progress__bar");
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = height > 0 ? (scrollTop / height) * 100 : 0;
  if (progressBar) progressBar.style.width = `${progress}%`;
});

const flipCard = document.querySelector("[data-flip]");
flipCard?.addEventListener("click", () => {
  flipCard.classList.toggle("is-flipped");
});

const musicButton = document.querySelector("#musicToggle");
let audioContext;
let currentNodes = [];

const stopMusic = () => {
  currentNodes.forEach((node) => node.stop?.());
  currentNodes = [];
};

const startMusic = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  const gain = audioContext.createGain();
  gain.gain.value = 0.04;
  gain.connect(audioContext.destination);

  const base = audioContext.createOscillator();
  base.type = "sine";
  base.frequency.value = 220;

  const harmony = audioContext.createOscillator();
  harmony.type = "triangle";
  harmony.frequency.value = 330;

  const filter = audioContext.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 700;

  base.connect(filter);
  harmony.connect(filter);
  filter.connect(gain);

  base.start();
  harmony.start();
  currentNodes = [base, harmony];
};

musicButton?.addEventListener("click", () => {
  const isOn = musicButton.getAttribute("data-on") === "true";
  if (isOn) {
    stopMusic();
    musicButton.setAttribute("data-on", "false");
    musicButton.textContent = "Música: off";
  } else {
    startMusic();
    musicButton.setAttribute("data-on", "true");
    musicButton.textContent = "Música: on";
  }
});
