/* =========================
   MOBILE MENU TOGGLE
========================= */
function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("active");
}

/* =========================
   SLIDER
========================= */
let slides = document.querySelectorAll(".slides");
let index = 0;

if (slides.length > 0) {
  slides[0].classList.add("active");

  setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 3000);
}

/* =========================
   BOOK APPOINTMENT + WHATSAPP with QR
========================= */
document.getElementById("appointmentForm").addEventListener("submit", function(e){
  e.preventDefault();

  // 1️⃣ Get form values
  let name = document.getElementById("name").value;
  let date = document.getElementById("date").value;
  let slot = document.getElementById("slot").value;

  // 2️⃣ Generate unique token
  let token = "PHC-" + Math.floor(100000 + Math.random() * 900000);

  // 3️⃣ Save booking locally (optional for admin panel)
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.push({token, name, date, slot});
  localStorage.setItem("bookings", JSON.stringify(bookings));

  // 4️⃣ WhatsApp automation
  let phone = "917970343645"; // admin WhatsApp number
  let qrLink = "https://i.postimg.cc/7PS1QqJV/prakash-clinic.jpg"; // replace with your QR code link

  let message = `📅 Appointment Confirmed!
Token: ${token}
Name: ${name}
Date: ${date}
Slot: ${slot}
💳 Pay via QR: ${qrLink}`;

  // 5️⃣ Open WhatsApp in new tab with message
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");

  // 6️⃣ Show confirmation to user
  document.getElementById("result").innerHTML = "✅ Appointment booked! Check WhatsApp message.";

  // 7️⃣ Reset the form
  this.reset();
});
