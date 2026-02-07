/* ===============================
   IMAGE CONFIG
================================ */
const TOTAL_IMAGES = 40;
const IMAGE_PATH = "assets/images/";

/* ===============================
   GALLERY LOADER
================================ */
const gallery = document.getElementById("gallery");

if (gallery) {
  const isIndexPage =
    location.pathname.endsWith("index.html") ||
    location.pathname === "/" ||
    location.pathname === "";

  const start = 1;
  const end = isIndexPage ? 3 : TOTAL_IMAGES;

  for (let i = start; i <= end; i++) {
    const artCard = document.createElement("div");
    artCard.className = "art-card";

    artCard.innerHTML = `
      <img src="${IMAGE_PATH}img${i}.jpg" loading="lazy" alt="Artwork ${i}">
      <div class="overlay">Artwork ${i}</div>
    `;

    artCard.addEventListener("click", () => openLightbox(i));
    gallery.appendChild(artCard);
  }
}

/* ===============================
   LIGHTBOX
================================ */
let currentIndex = 1;

const lightbox = document.createElement("div");
lightbox.id = "lightbox";

lightbox.innerHTML = `
  <span class="close-btn">&times;</span>
  <span class="nav prev">&#10094;</span>
  <img src="" alt="Artwork Preview">
  <span class="nav next">&#10095;</span>
`;

document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector("img");
const closeBtn = lightbox.querySelector(".close-btn");
const prevBtn = lightbox.querySelector(".prev");
const nextBtn = lightbox.querySelector(".next");

/* Open */
function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add("active");
}

/* Update Image */
function updateLightbox() {
  lightboxImg.src = `${IMAGE_PATH}img${currentIndex}.jpg`;
}

/* Close */
closeBtn.addEventListener("click", () =>
  lightbox.classList.remove("active")
);

/* Prevent close on image click */
lightboxImg.addEventListener("click", e => e.stopPropagation());

/* Click outside to close */
lightbox.addEventListener("click", () =>
  lightbox.classList.remove("active")
);

/* Navigation */
nextBtn.addEventListener("click", e => {
  e.stopPropagation();
  currentIndex = currentIndex >= TOTAL_IMAGES ? 1 : currentIndex + 1;
  updateLightbox();
});

prevBtn.addEventListener("click", e => {
  e.stopPropagation();
  currentIndex = currentIndex <= 1 ? TOTAL_IMAGES : currentIndex - 1;
  updateLightbox();
});

/* Keyboard Support */
document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("active")) return;

  if (e.key === "Escape") lightbox.classList.remove("active");
  if (e.key === "ArrowRight") nextBtn.click();
  if (e.key === "ArrowLeft") prevBtn.click();
});

/* ===============================
   ORDER BUTTONS - WHATSAPP
================================ */
const orderButtons = document.querySelectorAll(".order-btn");
const phoneNumber = "917025310192"; // WhatsApp number without + or spaces

orderButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const msg = encodeURIComponent(btn.dataset.msg);
    const url = `https://wa.me/${phoneNumber}?text=${msg}`;
    window.open(url, "_blank");
  });
});

const heroQuotes = [
  {
    title: "Where Art Meets Emotion",
    sub: "A curated collection of my creative journey"
  },
  {
    title: "Every Portrait Tells a Story",
    sub: "Moments captured with soul and detail"
  },
  {
    title: "Art That Feels Personal",
    sub: "Because emotions deserve expression"
  },
  {
    title: "Creativity Beyond Canvas",
    sub: "Turning imagination into timeless art"
  }
];

let heroIndex = 0;
const heroTitle = document.getElementById("hero-quote");
const heroSub = document.getElementById("hero-sub");

function typeWriter(text, element, speed = 60) {
  element.innerHTML = "";
  let i = 0;

  const interval = setInterval(() => {
    element.innerHTML += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(interval);
  }, speed);
}

function revealWords(text, element) {
  element.innerHTML = "";
  text.split(" ").forEach((word, i) => {
    const span = document.createElement("span");
    span.textContent = word + " ";
    span.classList.add("word");
    span.style.animationDelay = `${i * 0.08}s`;
    element.appendChild(span);
  });
}

function changeHeroText() {
  heroTitle.style.opacity = 0;
  heroSub.style.opacity = 0;

  setTimeout(() => {
    const current = heroQuotes[heroIndex];

    typeWriter(current.title, heroTitle);
    revealWords(current.sub, heroSub);

    heroTitle.style.opacity = 1;
    heroSub.style.opacity = 1;

    heroIndex = (heroIndex + 1) % heroQuotes.length;
  }, 600);
}

/* Initial load */
changeHeroText();

/* Rotate every 5 seconds */
setInterval(changeHeroText, 5000);

const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});

const mobileReveal = document.querySelectorAll(".mobile-reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.15 }
);

mobileReveal.forEach(el => observer.observe(el));
