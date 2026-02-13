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

const whisperButtons = document.querySelectorAll("[data-whisper]");
const whisperOutput = document.querySelector("#whisperOutput");

whisperButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const message = button.getAttribute("data-whisper");
    if (whisperOutput && message) {
      whisperOutput.textContent = message;
      whisperOutput.classList.remove("is-visible");
      requestAnimationFrame(() => whisperOutput.classList.add("is-visible"));
    }
  });
});

const hugButton = document.querySelector("#hugButton");
const hugCount = document.querySelector("#hugCount");

const createSpark = (target) => {
  const spark = document.createElement("span");
  spark.className = "spark";
  const rect = target.getBoundingClientRect();
  spark.style.left = `${rect.width / 2}px`;
  spark.style.top = `${rect.height / 2}px`;
  target.style.position = "relative";
  target.appendChild(spark);
  setTimeout(() => spark.remove(), 600);
};

if (hugButton && hugCount) {
  let count = 0;
  hugButton.addEventListener("click", () => {
    count += 1;
    hugCount.textContent = count.toString();
    createSpark(hugButton);
  });
}

const promiseItems = document.querySelectorAll("[data-promise]");
promiseItems.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("is-checked");
  });
});

const yearProgress = document.querySelector(".year__progress");
const yearFill = document.querySelector(".year__fill");
if (yearProgress && yearFill) {
  const months = Number(yearProgress.getAttribute("data-months")) || 0;
  const total = Number(yearProgress.getAttribute("data-total")) || 12;
  const percentage = total > 0 ? Math.min((months / total) * 100, 100) : 0;
  yearFill.style.width = `${percentage}%`;
}

const noteOutput = document.querySelector("#noteOutput");
const noteButton = document.querySelector("#noteButton");
const notes = [
  "Te amo con locura y gracias por ser mi paz.",
  "Mi meta eres tú, y quiero caminar contigo siempre.",
  "Gracias por cuidarme y por hacerme sentir en casa.",
  "No hay nada que me guste más que verte sonreír.",
  "Contigo aprendí lo que es amar bonito.",
  "Eres mi princesa preciosa, hoy y siempre.",
  "Gracias por estar conmigo en lo bueno y en lo difícil.",
];

if (noteButton && noteOutput) {
  noteButton.addEventListener("click", () => {
    const random = Math.floor(Math.random() * notes.length);
    noteOutput.textContent = notes[random];
    noteOutput.classList.remove("is-visible");
    requestAnimationFrame(() => noteOutput.classList.add("is-visible"));
  });
}

const reasonsCount = document.querySelector("#reasonsCount");
if (reasonsCount) {
  const target = 27;
  let current = 0;
  const timer = setInterval(() => {
    current += 1;
    reasonsCount.textContent = current.toString();
    if (current >= target) clearInterval(timer);
  }, 90);
}

const reasonsDeck = document.querySelector("#reasonsDeck");
const nextReason = document.querySelector("#nextReason");
const shuffleReasons = document.querySelector("#shuffleReasons");
let reasons = [
  "Porque me das paz",
  "Porque me acercas al Señor",
  "Porque me inspiras a ser mejor",
  "Porque eres mi hogar",
  "Porque me cuidas de verdad",
  "Porque contigo todo tiene sentido",
  "Porque me haces sonreír sin darme cuenta",
  "Porque contigo quiero una vida",
  "Porque orar contigo me llena",
  "Porque confías en mí",
  "Porque tu mirada me calma",
  "Porque eres valiente",
  "Porque me haces sentir seguro",
  "Porque eres mi compañera",
  "Porque me apoyas siempre",
  "Porque me enseñas a amar bonito",
  "Porque contigo soy mejor hombre",
  "Porque eres mi alegría diaria",
  "Porque me haces reír en serio",
  "Porque contigo todo es más fácil",
  "Porque me entiendes",
  "Porque respetas mi corazón",
  "Porque me haces sentir amado",
  "Porque eres única",
  "Porque confío en ti",
  "Porque te elijo hoy",
  "Porque te elijo siempre",
];

const renderNextReason = () => {
  if (!reasonsDeck || reasons.length === 0) return;
  const text = reasons.shift();
  const card = document.createElement("div");
  card.className = "reason-card";
  card.textContent = text || "";
  reasonsDeck.prepend(card);
};

nextReason?.addEventListener("click", () => {
  renderNextReason();
});

shuffleReasons?.addEventListener("click", () => {
  reasons = reasons.sort(() => Math.random() - 0.5);
});

const faqItems = document.querySelectorAll("[data-faq]");
faqItems.forEach((item) => {
  const button = item.querySelector(".faq__question");
  button?.addEventListener("click", () => {
    item.classList.toggle("is-open");
  });
});

const letterButton = document.querySelector("#letterButton");
const letterText = document.querySelector("#letterText");
const letterCursor = document.querySelector("#letterCursor");
const envelope = document.querySelector("#envelope");
let letterOpen = false;

const letterMessage =
  "Mi amor, feliz San Valentín. Hoy quiero escribirte con calma, como me gusta hacerlo, para recordarte lo que ya sabes pero que nunca me canso de decirte. Eres mi princesa, mi paz y mi hogar. Me sigue pareciendo increíble cómo el Señor nos juntó y cómo, mes a mes, nos ha ido enseñando a amar mejor, con propósito y con verdad.\n\nSiete meses parecen poco para algunos, pero para mí han sido suficientes para saber que eres tú. Tú eres mi meta, mi compañera, la mujer con la que quiero caminar despacio pero firme. Gracias por orar conmigo, por cuidarme cuando no estoy al 100%, por creer en lo nuestro incluso cuando ha habido ruido fuera. Gracias por tener un corazón precioso y por hacerme sentir seguro, escuchado y amado.\n\nSé que llevo tiempo sin darte flores y sé que tú las querías desde hace mucho. No era porque no quisiera; era porque quería algo que estuviera a la altura de lo que tenemos. Una flor normal se marchita en días, y lo nuestro no es algo que se marchite. Por eso hoy te doy una rosa eterna azul eléctrico, tu color favorito, para recordarte que lo nuestro está hecho para durar. Y junto con ella, una pulsera con infinito y corazón azul, porque yo te elijo hoy, mañana y siempre.\n\nQuiero seguir caminando contigo, aprender contigo, cantar contigo, reír contigo y sostenerte en cada etapa. Quiero que sigamos poniendo al Señor en el centro, porque ahí todo es más bonito y más fuerte. Y quiero que sepas que nunca vas a ser menos de lo que mereces; eres más de lo que pedí, eres un regalo, y yo estoy agradecido cada día.\n\nTe amo con locura, mi amor. Gracias por estos 7 meses. Gracias por ser tú. Feliz San Valentín, mi princesa preciosa. Siempre tuyo, Ismael.";

let typeInterval;
const typeWriter = (text, element) => {
  if (!element) return;
  clearInterval(typeInterval);
  element.textContent = "";
  let index = 0;
  typeInterval = setInterval(() => {
    element.textContent += text.charAt(index);
    index += 1;
    if (index >= text.length) {
      clearInterval(typeInterval);
      if (letterCursor) letterCursor.style.display = "none";
    }
  }, 80);
};

letterButton?.addEventListener("click", () => {
  letterOpen = !letterOpen;
  if (envelope) envelope.classList.toggle("is-open", letterOpen);
  if (letterOpen) {
    if (letterCursor) letterCursor.style.display = "inline-block";
    typeWriter(letterMessage, letterText);
  } else {
    clearInterval(typeInterval);
    if (letterText) {
      letterText.textContent = "Abre la carta y encuentra lo que te quiero decir.";
    }
    if (letterCursor) letterCursor.style.display = "none";
  }
  letterButton.textContent = letterOpen ? "Cerrar carta" : "Abrir carta";
});

const patoButton = document.querySelector("#patoButton");
const patoText = document.querySelector("#patoText");
const patoMessages = [
  "Patodalavida: tú y yo, juntos en todo.",
  "Quack de amor: eres mi hogar.",
  "Nuestro pato dice: no te suelto nunca.",
  "Patodalavida y para siempre, mi princesa.",
  "Quack quack: contigo todo es mejor.",
  "Pato oficial: mi corazón te eligió a ti.",
  "Patodalavida: mi paz, mi risa, mi amor.",
  "Nuestro pato aprueba: te amo con locura.",
  "Quack: caminamos juntos con el Señor.",
  "Pato mood: gracias por ser mi hogar.",
  "Patodalavida: siete meses y toda una vida.",
  "Quack quack: eres mi princesa preciosa.",
  "Pato testigo: no te suelto jamás.",
  "Patodalavida: contigo siempre es sí.",
  "Quack de promesa: eres mi para siempre.",
];

patoButton?.addEventListener("click", () => {
  if (!patoText) return;
  const random = Math.floor(Math.random() * patoMessages.length);
  patoText.textContent = patoMessages[random];
});

const celebrateButton = document.querySelector("#celebrateButton");
const launchSparkles = () => {
  for (let i = 0; i < 12; i += 1) {
    const spark = document.createElement("span");
    spark.className = "spark";
    spark.style.left = `${50 + (Math.random() * 40 - 20)}%`;
    spark.style.top = `${30 + Math.random() * 20}%`;
    spark.style.position = "fixed";
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 600);
  }
};

celebrateButton?.addEventListener("click", () => {
  launchSparkles();
});
