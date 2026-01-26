/******************************
 MOBILE DROPDOWN FIX
******************************/
/* ================= MOBILE MENU ================= */

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".dps-menu");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
}

document.querySelectorAll(".dropdown > a").forEach(menu => {
  menu.addEventListener("click", function (e) {
    if (window.innerWidth <= 1024) {
      e.preventDefault();

      const parent = this.parentElement;
      parent.classList.toggle("open");

      document.querySelectorAll(".dropdown").forEach(item => {
        if (item !== parent) item.classList.remove("open");
      });
    }
  });
});

/******************************
 DARK MODE (PERSISTENT)
******************************/
const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  });
}

/******************************
 PAGE LOAD ANIMATION
******************************/
gsap.from(".dps-navbar", {
  y: -80,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});

gsap.from(".hero-content, .page-hero h1", {
  opacity: 0,
  y: 50,
  duration: 1.2,
  delay: 0.4,
  ease: "power3.out"
});

/******************************
 COUNTER ANIMATION
******************************/
gsap.utils.toArray(".counter").forEach(counter => {
  const target = +counter.dataset.target;

  gsap.fromTo(
    counter,
    { innerText: 0 },
    {
      innerText: target,
      duration: 2,
      snap: { innerText: 1 },
      scrollTrigger: {
        trigger: counter,
        start: "top 80%"
      }
    }
  );
});

/******************************
 SECTION ANIMATIONS
******************************/
gsap.utils.toArray(".section").forEach(section => {
  gsap.from(section, {
    opacity: 0,
    y: 60,
    duration: 1,
    scrollTrigger: {
      trigger: section,
      start: "top 85%"
    }
  });
});

/******************************
 HERO IMAGE SLIDER (SAFE)
******************************/
const slides = document.querySelectorAll(".hero-slider .slide");
const nextBtn = document.querySelector(".slider-btn.next");
const prevBtn = document.querySelector(".slider-btn.prev");

let currentIndex = 0;
let sliderInterval;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

function startAutoSlide() {
  if (slides.length > 1) {
    sliderInterval = setInterval(nextSlide, 4000); // 4 seconds (professional)
  }
}

function resetAutoSlide() {
  clearInterval(sliderInterval);
  startAutoSlide();
}

if (nextBtn && prevBtn) {
  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
  });
}

startAutoSlide();

/******************************
 BACK TO TOP
******************************/
const backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 400 ? "flex" : "none";
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
