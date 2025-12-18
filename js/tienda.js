/* tienda.js */
import { getSession } from "./session.js";

/* ----------------------------
   SESIÓN DE USUARIO
-----------------------------*/
const user = getSession();
if (!user) {
  window.location.href = "../auth.html";
}

/* ----------------------------
   VARIABLES GENERALES
-----------------------------*/
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
const cartCount = document.querySelector(".cart-count");
const cartIcon = document.querySelector(".cart-icon");
const cartModal = document.querySelector(".cart-modal");
const cartModalContent = document.querySelector(".cart-modal-content");
const carritoItemsContainer = document.querySelector(".carrito-items");
const btnVaciar = document.getElementById("btn-vaciar");
const btnCheckout = document.getElementById("btn-checkout");

/* ----------------------------
   RENDERIZAR PRODUCTOS
-----------------------------*/
const productos = [
  {
    id: 1,
    titulo: "Body Bebé",
    categoria: "ropa",
    precio: 1200,
    img: "../img/productos/body.jpg"
  },
  {
    id: 2,
    titulo: "Cochecito",
    categoria: "cochecitos",
    precio: 32000,
    img: "../img/productos/cochecito.jpg"
  },
  {
    id: 3,
    titulo: "Mecedora",
    categoria: "mecedoras",
    precio: 15000,
    img: "../img/productos/mecedora.jpg"
  },
  // ... más productos
];

const productosGrid = document.querySelector(".productos-grid");

function renderProductos(filter = "todos") {
  productosGrid.innerHTML = "";
  const filtered = filter === "todos"
    ? productos
    : productos.filter(p => p.categoria === filter);

  filtered.forEach(producto => {
    const card = document.createElement("div");
    card.classList.add("producto-card");
    card.innerHTML = `
      <div class="producto-img">
        <img src="${producto.img}" alt="${producto.titulo}">
      </div>
      <h3 class="titulo-producto">${producto.titulo}</h3>
      <p class="precio">$${producto.precio}</p>
      <button class="btn-agregar" data-id="${producto.id}">Agregar al carrito</button>
    `;
    productosGrid.appendChild(card);
  });

  // Agregar event listeners a botones
  document.querySelectorAll(".btn-agregar").forEach(btn => {
    const id = parseInt(btn.dataset.id);
    if (cart.find(item => item.id === id)) {
      btn.classList.add("btn-agregado");
      btn.disabled = true;
    }
    btn.addEventListener("click", () => agregarAlCarrito(id, btn));
  });
}

/* ----------------------------
   FILTROS
-----------------------------*/
document.querySelectorAll(".filtro").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filtro").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProductos(btn.dataset.category);
  });
});

/* ----------------------------
   FUNCIONES DEL CARRITO
-----------------------------*/
function actualizarCarrito() {
  carritoItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.precio;
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img class="cart-item-img" src="${item.img}" alt="${item.titulo}">
      <div class="cart-item-info">
        <p>${item.titulo}</p>
        <strong>$${item.precio}</strong>
      </div>
      <button class="btn-eliminar" data-id="${item.id}">X</button>
    `;
    carritoItemsContainer.appendChild(div);

    div.querySelector(".btn-eliminar").addEventListener("click", () => {
      eliminarDelCarrito(item.id);
    });
  });

  cartCount.textContent = cart.length;
  document.getElementById("total-pagar").textContent = total;
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

function agregarAlCarrito(id, btn) {
  const producto = productos.find(p => p.id === id);
  if (!cart.find(item => item.id === id)) {
    cart.push(producto);
    btn.classList.add("btn-agregado");
    btn.disabled = true;
    actualizarCarrito();
    animarCarrito();
    mostrarToast(`${producto.titulo} agregado al carrito`);
  }
}

function eliminarDelCarrito(id) {
  cart = cart.filter(item => item.id !== id);
  actualizarCarrito();
  const btn = document.querySelector(`.btn-agregar[data-id="${id}"]`);
  if (btn) {
    btn.classList.remove("btn-agregado");
    btn.disabled = false;
  }
}

function vaciarCarrito() {
  cart = [];
  actualizarCarrito();
  document.querySelectorAll(".btn-agregar").forEach(btn => {
    btn.classList.remove("btn-agregado");
    btn.disabled = false;
  });
}

/* ----------------------------
   ANIMACIONES Y TOAST
-----------------------------*/
function animarCarrito() {
  cartIcon.classList.add("animated");
  setTimeout(() => cartIcon.classList.remove("animated"), 300);
}

function mostrarToast(mensaje) {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.textContent = mensaje;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 2000);
}

/* ----------------------------
   EVENTOS
-----------------------------*/
cartIcon.addEventListener("click", () => {
  cartModal.style.display = "flex";
  actualizarCarrito();
});

document.querySelector(".close-modal").addEventListener("click", () => {
  cartModal.style.display = "none";
});

btnVaciar.addEventListener("click", vaciarCarrito);
btnCheckout.addEventListener("click", () => {
  alert("Procesando pago...");
});

/* ----------------------------
   INICIALIZACIÓN
-----------------------------*/
renderProductos();
actualizarCarrito();
