// requireAdmin.js

function requireAdmin() {
    const user = JSON.parse(localStorage.getItem("session"));
  
    if (!user || user.rol !== "admin") {
      alert("Acceso restringido");
      window.location.href = "../pages/auth.html";
    }
  }
  