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

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  document.getElementById("scroll-progress").style.width = progress + "%";
});

const backBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backBtn.classList.toggle("show", window.scrollY > 400);
});

backBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelectorAll(".art-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -12;
    const rotateY = ((x / rect.width) - 0.5) * 12;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0)";
  });
});

let currentIndex = 0;

function openLightbox(src, index) {
  currentIndex = index;
  lightboxImg.src = src;
  lightbox.classList.add("active");
}

let startX = 0;

lightbox.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  if (endX < startX - 50) currentIndex++;
  if (endX > startX + 50) currentIndex--;

  currentIndex = Math.max(1, Math.min(TOTAL_IMAGES, currentIndex));
  lightboxImg.src = `${IMAGE_PATH}img${currentIndex}.jpg`;
});

if (sessionStorage.getItem("introPlayed")) {
  document.getElementById("intro").remove();
} else {
  sessionStorage.setItem("introPlayed", "true");
}
