// Get the button
const backToTopBtn = document.getElementById("backToTopBtn");

// Show the button when user scrolls down 100px
window.onscroll = function () {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
};

// When the button is clicked, scroll to the top smoothly
backToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// count scripting
const counters = document.querySelectorAll(".text_stats h3");

const countUp = (el) => {
  const target = +el.dataset.target;
  let count = 0;
  const step = target / 100;

  // Check original content for symbols
  const originalText = el.textContent.toLowerCase();
  const hasNaira = originalText.includes("₦");
  const hasBillion = originalText.includes("billion");
  const hasPlus = originalText.includes("+");

  const update = () => {
    count += step;
    const rounded = Math.floor(count);

    if (count < target) {
      el.textContent =
        (hasNaira ? "₦" : "") +
        rounded.toLocaleString() +
        (hasBillion ? " billion" : "") +
        (hasPlus ? "+" : "");
      requestAnimationFrame(update);
    } else {
      el.textContent =
        (hasNaira ? "₦" : "") +
        target.toLocaleString() +
        (hasBillion ? " billion" : "") +
        (hasPlus ? "+" : "");
    }
  };

  update();
};

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        obs.unobserve(entry.target); // only run once
      }
    });
  },
  { threshold: 0.3 }
);

counters.forEach((counter) => observer.observe(counter));
//////////////////////

const announcements = [
  "Welcome to the University Homepage!",
  "Admissions open for 2025 – Apply now!",
  "Check out our new Research Centers.",
  "Upcoming Event: Science Expo – Sept 10, 2025",
];

let index = 0;

setInterval(() => {
  index = (index + 1) % announcements.length;
  document.getElementById("announcement-text").textContent =
    announcements[index];
}, 4000);
//////////////

const date = document.getElementById("Currenttime");

const updateDateTime = () => {
  const now = new Date().toLocaleString();
  date.textContent = now;
};

// Then update every 1000 milliseconds (1 second)
setInterval(updateDateTime, 1000);

//////////////
const video = document.querySelector(".animated-video");

const observerr = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        observer.unobserve(entry.target); // Remove this line if you want to animate every time
      }
    });
  },
  {
    threshold: 0.4, // Trigger when 40% of the video is visible
  }
);

observerr.observe(video);

// ////
//Hamburger menu functionality
const hamburger = document.querySelector(".hamburger");
const headerulist = document.querySelector(".headerulist");

if (hamburger && headerulist) {
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    headerulist.classList.toggle("active");
  });

  // Close menu when clicking on nav links
  document.querySelectorAll(".nav-link a").forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      headerulist.classList.remove("active");
    });
  });


}
