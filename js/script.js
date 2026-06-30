/* 
   Personal Portfolio - Custom JavaScript
   Author: Mitta Venkata Ganesh Babu
   Description: Dynamic features including theme switching, typing effect, scroll animations, counters, and contact validation.
*/

document.addEventListener("DOMContentLoaded", () => {
  // === 1. Preloader ===
  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.style.opacity = "0";
      preloader.style.visibility = "hidden";
    });
    // Fallback if load event already fired or delayed
    setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.visibility = "hidden";
    }, 1500);
  }

  // === 2. Dark/Light Theme Switcher ===
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector("i") : null;
  const currentTheme = localStorage.getItem("theme") || "dark"; // Default to dark theme for premium look

  // Apply saved theme on load
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (themeIcon) {
    if (currentTheme === "dark") {
      themeIcon.className = "fas fa-sun";
    } else {
      themeIcon.className = "fas fa-moon";
    }
  }

  // Toggle theme click listener
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      let theme = document.documentElement.getAttribute("data-theme");
      if (theme === "dark") {
        theme = "light";
        if (themeIcon) themeIcon.className = "fas fa-moon";
      } else {
        theme = "dark";
        if (themeIcon) themeIcon.className = "fas fa-sun";
      }
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    });
  }

  // === 3. Typing Effect ===
  const typedTextSpan = document.querySelector(".typed-text");
  const textArray = ["Student Developer", "Problem Solver", "Tech Enthusiast", "Creative Creator"];
  const typingSpeed = 100;
  const erasingSpeed = 50;
  const newTextDelay = 2000; // Delay between words
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if (typedTextSpan) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      }
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      if (typedTextSpan) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      }
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingSpeed + 500);
    }
  }

  if (textArray.length && typedTextSpan) {
    setTimeout(type, 1000);
  }

  // === 4. Navbar Scroll Class & Mobile Menu Close on Click ===
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  });

  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const menuToggle = document.getElementById("navbarNav");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      // If mobile navbar is shown, collapse it
      if (menuToggle && menuToggle.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });
        bsCollapse.hide();
      }
    });
  });

  // === 5. ScrollSpy (Active Class Update) ===
  const sections = document.querySelectorAll("section");
  window.addEventListener("scroll", () => {
    let currentSectionId = "";
    const scrollPos = window.scrollY + 120; // adjust offset for visual accuracy

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  });

  // === 6. Back To Top Button ===
  const backToTopBtn = document.getElementById("btn-back-to-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      if (backToTopBtn) backToTopBtn.style.display = "flex";
    } else {
      if (backToTopBtn) backToTopBtn.style.display = "none";
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // === 7. Scroll Reveal & Intersection Observer Animations ===
  // Reveal elements on scroll
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target); // Trigger only once
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Skills Progress Bar Animations
  const progressBars = document.querySelectorAll(".progress-bar");
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const widthVal = bar.getAttribute("data-width") || "0%";
        bar.style.width = widthVal;
        progressObserver.unobserve(bar);
      }
    });
  }, {
    threshold: 0.1
  });

  progressBars.forEach(bar => progressObserver.observe(bar));

  // Animated Counters
  const counterValues = document.querySelectorAll(".counter-value");
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const targetValue = parseInt(counter.getAttribute("data-target") || "0", 10);
        const duration = 2000; // Animation duration in ms
        const stepTime = Math.max(Math.floor(duration / targetValue), 15);
        let currentValue = 0;

        const timer = setInterval(() => {
          currentValue += Math.ceil(targetValue / (duration / stepTime));
          if (currentValue >= targetValue) {
            counter.textContent = targetValue;
            clearInterval(timer);
          } else {
            counter.textContent = currentValue;
          }
        }, stepTime);

        counterObserver.unobserve(counter);
      }
    });
  }, {
    threshold: 0.5
  });

  counterValues.forEach(c => counterObserver.observe(c));

  // === 8. Contact Form Validation ===
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Basic fields check
      const name = document.getElementById("formName").value.trim();
      const email = document.getElementById("formEmail").value.trim();
      const subject = document.getElementById("formSubject").value.trim();
      const message = document.getElementById("formMessage").value.trim();

      if (!name || !email || !subject || !message) {
        showStatus("Please fill in all fields.", "danger");
        return;
      }

      if (!validateEmail(email)) {
        showStatus("Please enter a valid email address.", "danger");
        return;
      }

      // Simulate successful submission
      showStatus("Sending message...", "info");
      
      setTimeout(() => {
        showStatus("Thank you! Your message has been sent successfully. Mitta Venkata Ganesh Babu will get back to you soon.", "success");
        contactForm.reset();
      }, 1500);
    });
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showStatus(msg, type) {
    if (formStatus) {
      formStatus.className = `alert alert-${type} mt-3 d-block`;
      formStatus.textContent = msg;
      
      // Auto-hide alert after 5 seconds unless it is "sending" info
      if (type !== "info") {
        setTimeout(() => {
          formStatus.className = "alert d-none";
        }, 5000);
      }
    }
  }
});
