// FILTROS
const filterBtns = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".product-card");

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const category = btn.dataset.category;

        cards.forEach(card => {
            if (category === "todos" || card.dataset.category === category) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});

// CARRITO
let cart = [];
let cartCount = document.getElementById("cartCount");
let cartModal = document.getElementById("cartModal");
let cartItems = document.getElementById("cartItems");
let cartTotal = document.getElementById("cartTotal");

document.getElementById("openCart").onclick = () => {
    cartModal.style.display = "block";
};
document.getElementById("closeCart").onclick = () => {
    cartModal.style.display = "none";
};

function addToCart(name, price) {
    cart.push({ name, price });
    cartCount.textContent = cart.length;
    renderCart();
}

function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        cartItems.innerHTML += `<p>${item.name} - $${item.price}</p>`;
    });

    cartTotal.textContent = total;
}

// Cerrar modal al hacer click afuera
window.onclick = e => {
    if (e.target === cartModal) cartModal.style.display = "none";
};




/* tienda.js */

import { getSession } from "./session.js";

const user = getSession();

if (!user) {
  window.location.href = "../auth.html";
}

/* Carrito */

function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = document.querySelector(".cart-count");
  if (count) count.textContent = cart.length;
}

/* Botones agregar */
document.querySelectorAll(".btn-agregar").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".producto-card");

    const product = {
      title: card.querySelector(".titulo-producto").textContent,
      price: card.querySelector(".precio").textContent
    };

    addToCart(product);
  });
});

updateCartCount();
