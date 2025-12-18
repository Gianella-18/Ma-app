/* user.js */

import { getSession, clearSession } from "./session.js";

(function requireUser() {
  const user = getSession();

  if (!user || user.role !== "USER") {
    window.location.href = "../auth.html";
  }
})();

/* Mostrar datos del perfil */
const user = getSession();

if (user) {
  const nameEl = document.getElementById("user-name");
  const typeEl = document.getElementById("user-type");

  if (nameEl) nameEl.textContent = user.name;
  if (typeEl) typeEl.textContent = user.profileType;
}

/* Logout */
document.getElementById("logout")?.addEventListener("click", () => {
  clearSession();
  window.location.href = "../auth.html";
});


// user.js

const user = JSON.parse(localStorage.getItem("session"));

document.getElementById("perfil-nombre").textContent = user.nombre;
document.getElementById("perfil-email").textContent = user.email;

let rolTexto = "Usuario/a";
if (user.rol === "embarazada") rolTexto = "Embarazada";
if (user.rol === "mama") rolTexto = "Mamá";

document.getElementById("perfil-rol").textContent = rolTexto;
