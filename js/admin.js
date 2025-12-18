// admin.js

const admin = JSON.parse(localStorage.getItem("session"));

document.getElementById("admin-name").textContent =
  `Hola, ${admin.nombre} (Administrador)`;
