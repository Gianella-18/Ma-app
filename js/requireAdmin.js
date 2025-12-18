// requireAdmin.js

function requireAdmin() {
  const user = getSession();

  if (!user || user.rol !== "admin") {
    alert("Acceso restringido");
    window.location.href = "../auth/auth.html";
  }
}
