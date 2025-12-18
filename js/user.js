// user.js

// --------------------
// Verificar sesión
// --------------------
const user = JSON.parse(localStorage.getItem("session"));

if (!user) {
  window.location.href = "../auth/auth.html";
}

// --------------------
// Mostrar datos básicos
// --------------------
const nombreEl = document.getElementById("perfil-nombre");
const emailEl = document.getElementById("perfil-email");
const rolEl = document.getElementById("perfil-rol");

if (nombreEl) nombreEl.textContent = user.nombre;
if (emailEl) emailEl.textContent = user.email;

let rolTexto = "Usuario/a";
if (user.rol === "embarazada") rolTexto = "Embarazada";
if (user.rol === "mama") rolTexto = "Mamá";
if (user.rol === "admin") rolTexto = "Administrador/a";

if (rolEl) rolEl.textContent = rolTexto;

// --------------------
// Contenido dinámico según rol
// --------------------
const contenido = document.getElementById("contenido-dinamico");

if (contenido) {
  if (user.rol === "embarazada") {
    contenido.innerHTML = `
      <h2>Seguimiento de embarazo</h2>
      <p>Accedé a contenido semanal, controles y consejos personalizados.</p>
      <a href="embarazo.html">Ir a Embarazo</a>
    `;
  }

  if (user.rol === "mama") {
    contenido.innerHTML = `
      <h2>Maternidad</h2>
      <p>Consejos para el cuidado del bebé y la crianza.</p>
      <a href="maternidad.html">Ir a Maternidad</a>
    `;
  }

  if (user.rol === "usuario") {
    contenido.innerHTML = `
      <h2>Contenido general</h2>
      <p>Accedé a la comunidad y la tienda.</p>
      <a href="../pages/comunidad.html">Ir a Comunidad</a>
    `;
  }
}

// --------------------
// Logout
// --------------------
const logoutBtn = document.getElementById("logout");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("session");
    window.location.href = "../auth/auth.html";
  });
}
