// ==========================
// Track Shipment
// ==========================
function trackShipment() {
  const id = document.getElementById("trackingId").value;
  const res = document.getElementById("trackingResult");
  if (!id) {
    res.innerHTML = "Please enter tracking ID";
    return;
  }
  res.innerHTML = `Shipment <b>${id}</b> is <span style='color:green'>In Transit</span>. ETA: 3 Days`;
}

// ==========================
// Toggle Job Details
// ==========================
function toggleJobDetails(card) {
  const details = card.nextElementSibling || card.querySelector(".job-details");
  if (details.style.display === "none" || details.style.display === "") {
    details.style.display = "block";
  } else {
    details.style.display = "none";
  }
}

// ==========================
// Debounce function
// ==========================
function debounce(func, wait = 100) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// ==========================
// DOMContentLoaded - SINGLE LISTENER
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  // ----- Map pins click -----
  const pins = document.querySelectorAll(".map-pin");
  pins.forEach((pin) => {
    pin.addEventListener("click", () => {
      pins.forEach((p) => p.classList.remove("active"));
      pin.classList.add("active");
    });
  });

  // ----- About section highlight -----
  const aboutBox = document.querySelector(".about-us");
  if (aboutBox && window.location.hash === "#about") {
    setTimeout(() => {
      aboutBox.classList.add("highlight");
      setTimeout(() => aboutBox.classList.remove("highlight"), 2000);
    }, 400);
  }

  // ----- Counters -----
  const counters = document.querySelectorAll(".counter");

  const startCounters = (counterElements) => {
    counterElements.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const speed = 200; // lower = faster
      const increment = target / speed;

      function updateCount() {
        const current = +counter.innerText.replace(/,/g, "");
        if (current < target) {
          counter.innerText = Math.ceil(current + increment);
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target.toLocaleString();
        }
      }
      updateCount();
    });
  };

  // ----- IntersectionObserver for counters -----
  const achievementsSection = document.getElementById("achievements");
  if (achievementsSection && counters.length > 0) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounters(counters);
            obs.disconnect(); // Stop observing after triggering
          }
        });
      },
      { threshold: 0.5 },
    );
    observer.observe(achievementsSection);
  }

  // ----- IntersectionObserver for About highlight -----
  if (aboutBox) {
    const observerAbout = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            aboutBox.classList.add("highlight");
            setTimeout(() => aboutBox.classList.remove("highlight"), 2000);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.5 },
    );
    observerAbout.observe(aboutBox);
  }
});

function toggleCoverage(btn) {
  const card = btn.closest(".branch-card");
  const preview = card.querySelector(".coverage-preview");
  const full = card.querySelector(".coverage-full");

  if (full.style.display === "none") {
    full.style.display = "inline";
    btn.textContent = "See Less";
  } else {
    full.style.display = "none";
    btn.textContent = "See More";
  }
}
