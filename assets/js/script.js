const quotes = [
  {
    title: "Where Art Meets Emotion",
    sub: "A curated collection of my creative journey"
  },
  {
    title: "Every Portrait Tells a Story",
    sub: "Moments captured with soul and detail"
  },
  {
    title: "Creativity Beyond Canvas",
    sub: "Blending imagination with digital art"
  },
  {
    title: "Art That Feels Personal",
    sub: "Because emotions deserve expression"
  }
];

let index = 0;
const titleEl = document.getElementById("hero-quote");
const subEl = document.getElementById("hero-sub");

setInterval(() => {
  titleEl.style.opacity = 0;
  subEl.style.opacity = 0;

  setTimeout(() => {
    index = (index + 1) % quotes.length;
    titleEl.textContent = quotes[index].title;
    subEl.textContent = quotes[index].sub;

    titleEl.style.opacity = 1;
    subEl.style.opacity = 1;
  }, 600);
}, 4000);

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

