// Initialize EmailJS for Contact Form
function sendEmail(event) {
  event.preventDefault();
  emailjs
    .sendForm(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID",
      event.target,
      "YOUR_USER_ID",
    )
    .then(() => {
      alert("Message sent successfully!");
      event.target.reset();
    })
    .catch((err) => {
      alert("Failed to send message, please try again.");
      console.log(err);
    });
}
