/****************************************************
 * NEW HORIZON PUBLIC SCHOOL
 * MAIN JAVASCRIPT
 ****************************************************/


/****************************************************
 * MOBILE MENU
 ****************************************************/

document.addEventListener("DOMContentLoaded", function () {

  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".dps-menu");

  if (menuToggle && menu) {

    menuToggle.addEventListener("click", function () {

      menu.classList.toggle("active");

      const isOpen = menu.classList.contains("active");

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

    });


    /* Close menu after clicking a navigation link */

    const menuLinks = menu.querySelectorAll("a");

    menuLinks.forEach(function (link) {

      link.addEventListener("click", function () {

        menu.classList.remove("active");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", function (event) {

      if (
        !menu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {

        menu.classList.remove("active");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    });

  }

});



/****************************************************
 * DARK MODE
 * PERSISTENT
 ****************************************************/

const themeToggle = document.getElementById("themeToggle");


/* Load saved theme */

if (localStorage.getItem("theme") === "dark") {

  document.body.classList.add("dark");

}


/* Theme button */

if (themeToggle) {

  themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    const isDark =
      document.body.classList.contains("dark");

    localStorage.setItem(
      "theme",
      isDark ? "dark" : "light"
    );

  });

}



/****************************************************
 * GSAP PAGE LOAD ANIMATION
 ****************************************************/

if (typeof gsap !== "undefined") {

  /* Navbar */

  if (document.querySelector(".dps-navbar")) {

    gsap.from(".dps-navbar", {

      y: -80,

      opacity: 0,

      duration: 1,

      ease: "power3.out"

    });

  }


  /* Hero */

  if (
    document.querySelector(".hero-content") ||
    document.querySelector(".page-hero h1")
  ) {

    gsap.from(
      ".hero-content, .page-hero h1",
      {

        opacity: 0,

        y: 50,

        duration: 1.2,

        delay: 0.4,

        ease: "power3.out"

      }
    );

  }

}



/****************************************************
 * COUNTER ANIMATION
 ****************************************************/

if (
  typeof gsap !== "undefined" &&
  gsap.utils
) {

  const counters =
    gsap.utils.toArray(".counter");


  counters.forEach(function (counter) {

    const target =
      Number(counter.dataset.target);


    if (!isNaN(target)) {

      gsap.fromTo(

        counter,

        {
          innerText: 0
        },

        {

          innerText: target,

          duration: 2,

          snap: {
            innerText: 1
          },

          scrollTrigger: {

            trigger: counter,

            start: "top 80%",

            once: true

          }

        }

      );

    }

  });

}



/****************************************************
 * SECTION ANIMATIONS
 ****************************************************/

if (
  typeof gsap !== "undefined" &&
  gsap.utils
) {

  const sections =
    gsap.utils.toArray(".section");


  sections.forEach(function (section) {

    gsap.from(section, {

      opacity: 0,

      y: 60,

      duration: 1,

      scrollTrigger: {

        trigger: section,

        start: "top 85%",

        once: true

      }

    });

  });

}



/****************************************************
 * HERO IMAGE SLIDER
 ****************************************************/

const slides =
  document.querySelectorAll(
    ".hero-slider .slide"
  );

const nextBtn =
  document.querySelector(
    ".slider-btn.next"
  );

const prevBtn =
  document.querySelector(
    ".slider-btn.prev"
  );


/*
 * IMPORTANT:
 * Use a unique variable name so it does not
 * conflict with gallery JavaScript.
 */

let heroCurrentIndex = 0;

let sliderInterval = null;



/****************************************************
 * SHOW SLIDE
 ****************************************************/

function showHeroSlide(index) {

  if (!slides.length) {
    return;
  }


  slides.forEach(function (slide) {

    slide.classList.remove("active");

  });


  if (slides[index]) {

    slides[index].classList.add("active");

  }

}



/****************************************************
 * NEXT SLIDE
 ****************************************************/

function nextHeroSlide() {

  if (slides.length <= 1) {
    return;
  }


  heroCurrentIndex =
    (heroCurrentIndex + 1) %
    slides.length;


  showHeroSlide(heroCurrentIndex);

}



/****************************************************
 * PREVIOUS SLIDE
 ****************************************************/

function prevHeroSlide() {

  if (slides.length <= 1) {
    return;
  }


  heroCurrentIndex =
    (heroCurrentIndex - 1 + slides.length) %
    slides.length;


  showHeroSlide(heroCurrentIndex);

}



/****************************************************
 * START AUTO SLIDER
 ****************************************************/

function startHeroAutoSlide() {

  if (slides.length > 1) {

    clearInterval(sliderInterval);


    sliderInterval =
      setInterval(
        nextHeroSlide,
        4000
      );

  }

}



/****************************************************
 * RESET AUTO SLIDER
 ****************************************************/

function resetHeroAutoSlide() {

  clearInterval(sliderInterval);

  startHeroAutoSlide();

}



/****************************************************
 * SLIDER BUTTONS
 ****************************************************/

if (nextBtn) {

  nextBtn.addEventListener(
    "click",
    function () {

      nextHeroSlide();

      resetHeroAutoSlide();

    }
  );

}


if (prevBtn) {

  prevBtn.addEventListener(
    "click",
    function () {

      prevHeroSlide();

      resetHeroAutoSlide();

    }
  );

}



/****************************************************
 * START SLIDER
 ****************************************************/

if (slides.length > 0) {

  /*
   * Make sure the first slide is visible.
   */

  if (
    !document.querySelector(
      ".hero-slider .slide.active"
    )
  ) {

    showHeroSlide(0);

  }


  startHeroAutoSlide();

}



/****************************************************
 * BACK TO TOP
 ****************************************************/

const backToTop =
  document.getElementById(
    "backToTop"
  );


if (backToTop) {

  /* Initial state */

  backToTop.style.display = "none";


  /* Show / hide button */

  window.addEventListener(
    "scroll",
    function () {

      if (window.scrollY > 400) {

        backToTop.style.display =
          "flex";

      } else {

        backToTop.style.display =
          "none";

      }

    }
  );


  /* Scroll to top */

  backToTop.addEventListener(
    "click",
    function () {

      window.scrollTo({

        top: 0,

        behavior: "smooth"

      });

    }
  );

}



/****************************************************
 * CLOSE MOBILE MENU WHEN SCREEN BECOMES DESKTOP
 ****************************************************/

window.addEventListener(
  "resize",
  function () {

    const menu =
      document.querySelector(
        ".dps-menu"
      );

    const menuToggle =
      document.querySelector(
        ".menu-toggle"
      );


    if (
      window.innerWidth > 992 &&
      menu &&
      menuToggle
    ) {

      menu.classList.remove(
        "active"
      );

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    }

  }
);
