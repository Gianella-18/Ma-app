// session.js

function getSession() {
    return JSON.parse(localStorage.getItem("session"));
  }
  
  function isLoggedIn() {
    return !!getSession();
  }
  
  function logout() {
    localStorage.removeItem("session");
    window.location.href = "../auth/auth.html";
  }
  
  // Redirige si NO hay sesión
  function requireAuth() {
    if (!isLoggedIn()) {
      window.location.href = "../pages/auth.html";
    }
  }
  
  // Redirige según rol (útil para home)
  function redirectIfLogged() {
    const user = getSession();
    if (!user) return;
  
    switch (user.rol) {
      case "admin":
        window.location.href = "../admin/dashboard.html";
        break;
      case "embarazada":
        window.location.href = "../pages/embarazo.html";
        break;
      case "mama":
        window.location.href = "../pages/maternidad.html";
        break;
      default:
        window.location.href = "../index.html";
    }
  }
  