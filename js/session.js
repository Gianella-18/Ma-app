// session.js

// --------------------
// Obtener sesión
// --------------------
function getSession() {
  return JSON.parse(localStorage.getItem("session"));
}

function isLoggedIn() {
  return !!getSession();
}

// --------------------
// Logout
// --------------------
function logout() {
  localStorage.removeItem("session");
  window.location.href = "../auth/auth.html";
}

// --------------------
// Requiere sesión activa
// --------------------
function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = "../auth/auth.html";
  }
}

// --------------------
// Redirigir si YA está logueado
// (para usar en auth.html)
// --------------------
function redirectIfLogged() {
  const user = getSession();
  if (!user) return;

  switch (user.rol) {
    case "admin":
      window.location.href = "../admin/dashboard.html";
      break;
    case "embarazada":
      window.location.href = "../user/embarazo.html";
      break;
    case "mama":
      window.location.href = "../user/maternidad.html";
      break;
    default:
      window.location.href = "../user/home.html";
  }
}
