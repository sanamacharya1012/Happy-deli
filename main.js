function trackShipment() {
  const id = document.getElementById("trackingId").value;
  const res = document.getElementById("trackingResult");
  if (!id) {
    res.innerHTML = "Please enter tracking ID";
    return;
  }
  res.innerHTML = `Shipment <b>${id}</b> is <span style='color:green'>In Transit</span>. ETA: 3 Days`;
}
function toggleJobDetails(card) {
  const details = card.nextElementSibling || card.querySelector(".job-details");
  if (details.style.display === "none" || details.style.display === "") {
    details.style.display = "block";
  } else {
    details.style.display = "none";
  }
}

// Counter Animation
const counters = document.querySelectorAll(".counter");
counters.forEach((counter) => {
  const updateCount = () => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const increment = target / 200; // speed

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 15);
    } else {
      counter.innerText = target;
    }
  };
  updateCount();
});
// Select all pins
document.addEventListener("DOMContentLoaded", function () {
  const pins = document.querySelectorAll(".map-pin");

  pins.forEach((pin) => {
    pin.addEventListener("click", function () {
      // Remove active class from all pins
      pins.forEach((p) => p.classList.remove("active"));
      // Add active to clicked pin
      pin.classList.add("active");
    });
  });
});
