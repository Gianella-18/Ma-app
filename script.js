/* -------------------------------------------------- */
/* MENÚ HAMBURGUESA RESPONSIVE */
/* -------------------------------------------------- */

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
}

/* Cerrar menú al hacer clic en un enlace */
document.querySelectorAll(".nav-links a").forEach(link =>
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    })
);

/* ================================ */
/*   SLIDER DE TESTIMONIOS (CARDS) */
/* ================================ */

// const slider = document.querySelector(".slider");
// const slides = document.querySelectorAll(".slide");

// let currentIndex = 0;
// let slideWidth;  

// Calcula el ancho real según cuántas cards entran
// function updateSlideWidth() {
//     slideWidth = slides[0].offsetWidth + 30; // card + gap
// }

// function updateSlider() {
//     updateSlideWidth();
//     slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
// }

// Botones manuales
// document.querySelector(".prev").addEventListener("click", () => {
//     if (currentIndex > 0) {
//         currentIndex--;
//         updateSlider();
//     }
// });

// document.querySelector(".next").addEventListener("click", () => {
//     if (currentIndex < slides.length - 1) {
//         currentIndex++;
//         updateSlider();
//     }
// });

// Auto-slide cada 7 segundos (más natural)
// setInterval(() => {
//     if (!slider) return;
//     currentIndex = (currentIndex + 1) % slides.length;
//     updateSlider();
// }, 7000);

// Se recalcula en responsive
// window.addEventListener("resize", updateSlider);

// Inicialización
// updateSlider();


/* ------------------------------- */
/* FAQ (ACORDEÓN) */
/* ------------------------------- */
const accordions = document.querySelectorAll(".accordion-item");

accordions.forEach(item => {
  const btn = item.querySelector(".accordion-toggle");
  const panel = item.querySelector(".accordion-panel");

  btn.addEventListener("click", () => {
    const isOpen = btn.getAttribute("aria-expanded") === "true";

    // cerrar todos
    accordions.forEach(i => {
      i.classList.remove("active");
      i.querySelector(".accordion-toggle").setAttribute("aria-expanded", "false");
      i.querySelector(".accordion-panel").style.maxHeight = null;
    });

    // si estaba cerrado, abrirlo
    if (!isOpen) {
      item.classList.add("active");
      btn.setAttribute("aria-expanded", "true");
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});