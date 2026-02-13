
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

// ===== Занятые часы (localStorage) =====
const dateInput = document.getElementById("date");
const timeSelect = document.getElementById("time");
const clearBtn = document.getElementById("clearBookings");

function getBookings() {
  return JSON.parse(localStorage.getItem("bookings") || "{}");
}

function saveBookings(data) {
  localStorage.setItem("bookings", JSON.stringify(data));
}

// Обновляем список времени: отключаем занятые часы для выбранной даты
function refreshTimeOptions() {
  const bookings = getBookings();
  const date = dateInput.value;

  // включаем все обратно
  [...timeSelect.options].forEach(opt => {
    if (opt.value !== "") {
      opt.disabled = false;
      opt.textContent = opt.value;
    }
  });

  if (!date) return;

  const busyTimes = bookings[date] || [];
  [...timeSelect.options].forEach(opt => {
    if (busyTimes.includes(opt.value)) {
      opt.disabled = true;
      opt.textContent = `${opt.value} (занято)`;
    }
  });

  // если выбранное время стало занятым — сбрасываем выбор
  if (busyTimes.includes(timeSelect.value)) {
    timeSelect.value = "";
  }
}

// Когда меняешь дату — обновляем занятость
dateInput.addEventListener("change", refreshTimeOptions);

// При отправке формы: помечаем выбранное время как занято (после window.open)
form.addEventListener("submit", function () {
  const date = dateInput.value;
  const time = timeSelect.value;

  if (!date || !time) return;

  const bookings = getBookings();
  bookings[date] = bookings[date] || [];

  if (!bookings[date].includes(time)) {
    bookings[date].push(time);
    saveBookings(bookings);
  }

  refreshTimeOptions();
});

// Кнопка очистки (можно потом удалить)
if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    localStorage.removeItem("bookings");
    refreshTimeOptions();
    alert("Занятость очищена");
  });
}

// сразу обновим при загрузке страницы
refreshTimeOptions();