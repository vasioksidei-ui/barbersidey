
const form = document.getElementById("bookingForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const service = document.getElementById("service").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  const text =
    `Привет! Хочу записаться:%0A` +
    `Имя: ${name}%0A` +
    `Телефон: ${phone}%0A` +
    `Услуга: ${service}%0A` +
    `Дата: ${date}%0A` +
    `Время: ${time}`;

  const url = `https://wa.me/420777067024?text=${text}`;

  window.open(url, "_blank");
});

// ===== Увеличение фото =====

const images = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

images.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});