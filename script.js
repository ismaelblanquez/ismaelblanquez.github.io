const smoothLinks = document.querySelectorAll("[data-scroll]");

smoothLinks.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.getAttribute("data-scroll");
    if (!target) return;
    const section = document.querySelector(target);
    section?.scrollIntoView({ behavior: "smooth" });
  });
});

const giftStage = document.querySelector("#giftStage");
const giftReveal = document.querySelector("#giftReveal");
const giftVouchers = document.querySelector("#giftVouchers");
const giftRevealButton = document.querySelector("#giftRevealButton");

const openGiftPortal = () => {
  if (giftStage?.classList.contains("is-open")) return;
  giftStage?.classList.add("is-open");
  setTimeout(() => giftReveal?.classList.add("is-open"), 500);
  setTimeout(() => giftVouchers?.classList.add("is-open"), 1200);
  const rect = giftStage?.getBoundingClientRect();
  if (!rect) return;
  for (let i = 0; i < 20; i += 1) {
    const spark = document.createElement("span");
    spark.className = "spark";
    spark.style.left = `${rect.left + rect.width * (0.2 + Math.random() * 0.6)}px`;
    spark.style.top = `${rect.top + rect.height * (0.2 + Math.random() * 0.6)}px`;
    spark.style.position = "fixed";
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 700);
  }
  setTimeout(() => {
    const vouchersRect = giftVouchers?.getBoundingClientRect();
    if (!vouchersRect) return;
    for (let i = 0; i < 18; i += 1) {
      const spark = document.createElement("span");
      spark.className = "spark";
      spark.style.left = `${vouchersRect.left + vouchersRect.width * (0.2 + Math.random() * 0.6)}px`;
      spark.style.top = `${vouchersRect.top + vouchersRect.height * (0.2 + Math.random() * 0.6)}px`;
      spark.style.position = "fixed";
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 700);
    }
  }, 1250);
};

giftRevealButton?.addEventListener("click", () => {
  openGiftPortal();
  if (giftTitle) giftTitle.textContent = "Lo que te mereces desde hace tiempo";
  if (giftSubtitle) {
    giftSubtitle.textContent =
      "Me pediste flores durante mucho tiempo, y por fin llega la primera: una rosa eterna azul eléctrico y una pulsera con infinito y corazón azul.";
  }
});

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
const letterPaper = document.querySelector("#letterPaper");
let letterOpen = false;

const letterMessage =
  "Mi amor, feliz San Valentín. Hoy quería escribirte con calma, como a mí me gusta, para que leas esto despacito y sientas todo lo que tengo en el corazón. Eres mi princesa, mi paz, mi casa y mi oración favorita. Me sigue pareciendo un regalo lo que el Señor ha hecho con nosotros: cómo nos juntó, cómo nos ha enseñado a caminar con propósito y cómo nos ha ido haciendo más fuertes mes a mes.\n\nSiete meses pueden parecer poco, pero para mí han sido suficientes para saber que eres tú. Tú eres mi meta, mi compañera, la mujer con la que quiero caminar despacio pero firme. Gracias por orar conmigo, por cuidarme cuando no estoy al 100%, por creer en lo nuestro incluso cuando el ruido de fuera ha querido distraernos. Gracias por tu corazón precioso, por tu paciencia y por hacerme sentir seguro, escuchado y amado.\n\nTe he escuchado pedir flores durante tanto tiempo… y sí, lo sé, he tardado. Pero no era porque no quisiera; era porque ninguna flor normal me parecía suficiente. Una rosa común es preciosa, pero se marchita en días. Y lo nuestro no se marchita. Por eso hoy tu primera flor es una rosa eterna azul eléctrico, tu color favorito, para que dure años y te recuerde que mi amor por ti no es de temporada, es de vida. Y junto con ella, una pulsera con infinito y corazón azul, porque yo te elijo hoy, mañana y siempre.\n\nQuiero seguir caminando contigo, aprender contigo, cantar contigo, reír contigo y sostenerte en cada etapa. Quiero que sigamos poniendo al Señor en el centro, porque ahí todo es más bonito, más fuerte y más real. Quiero seguir siendo transparente contigo, seguir mejorando para ti y contigo, y que nunca dudes de esto: eres más de lo que pedí, y te voy a amar patdoalavida.\n\nGracias por cada abrazo, por cada conversación, por cada mirada que me calma. Gracias por ser mi alegría diaria y mi refugio. Gracias por estos 7 meses y por todo lo que viene. Feliz San Valentín, mi princesa preciosa. Te amo con locura, hoy y siempre.\n\nSiempre tuyo, Ismael.";

let typeInterval;
const typeWriter = (text, element) => {
  if (!element) return;
  clearInterval(typeInterval);
  element.textContent = "";
  let index = 0;
  if (letterPaper) letterPaper.classList.add("is-writing");
  typeInterval = setInterval(() => {
    element.textContent += text.charAt(index);
    index += 1;
    if (index >= text.length) {
      clearInterval(typeInterval);
      if (letterCursor) letterCursor.style.display = "none";
      if (letterPaper) letterPaper.classList.remove("is-writing");
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
    if (letterPaper) letterPaper.classList.remove("is-writing");
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
const heartStage = document.querySelector("#heartStage");
const launchSparkles = (origin) => {
  if (!origin) return;
  const rect = origin.getBoundingClientRect();
  for (let i = 0; i < 24; i += 1) {
    const spark = document.createElement("span");
    spark.className = "spark";
    spark.style.left = `${rect.left + rect.width * (0.2 + Math.random() * 0.6)}px`;
    spark.style.top = `${rect.top + rect.height * (0.2 + Math.random() * 0.6)}px`;
    spark.style.position = "fixed";
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 700);
  }
};

celebrateButton?.addEventListener("click", () => {
  heartStage?.classList.add("is-active");
  launchSparkles(heartStage);
});

const giftTitle = document.querySelector("#giftTitle");
const giftSubtitle = document.querySelector("#giftSubtitle");
