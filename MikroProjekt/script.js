function openModal(place) {
  document.getElementById(`modal-${place}`).style.display = "flex";
}

function closeModal(place) {
  document.getElementById(`modal-${place}`).style.display = "none";
}

// Dodatkowy kod do zamykania modal przy kliknięciu poza nim
window.onclick = function (event) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};

document
  .querySelector(".contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    if (email && subject && message) {
      alert("Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.");
    } else {
      alert("Proszę wypełnić wszystkie wymagane pola.");
    }
  });
