





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

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
}

/******************************
 PRELOADER
******************************/
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    gsap.to(preloader, {
      opacity: 0,
      duration: 1,
      delay: 0.5,
      onComplete: () => preloader.remove()
    });
  }
});

/******************************
 PAGE LOAD ANIMATION
******************************/
gsap.from(".navbar", {
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
 SECTION SCROLL ANIMATIONS
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
 TEAM / EVENT / CARD ANIMATIONS
******************************/
gsap.utils.toArray(".team-card, .event-card, .achievement").forEach(card => {
  gsap.from(card, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    scrollTrigger: {
      trigger: card,
      start: "top 90%"
    }
  });
});

/******************************
 GALLERY IMAGE ANIMATION
******************************/
gsap.utils.toArray(".gallery-item").forEach(img => {
  gsap.from(img, {
    scale: 0.9,
    opacity: 0,
    duration: 0.8,
    scrollTrigger: {
      trigger: img,
      start: "top 90%"
    }
  });
});

/******************************
 BACK TO TOP BUTTON
******************************/
const backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/******************************
 SMOOTH HOVER EFFECT (BUTTONS)
******************************/
gsap.utils.toArray(".btn, .btn-gold, .btn-whatsapp").forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    gsap.to(btn, { scale: 1.05, duration: 0.3 });
  });

  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, { scale: 1, duration: 0.3 });
  });
});
