// auth.js

const form = document.getElementById("auth-form");
const title = document.getElementById("auth-title");

const btnRegister = document.getElementById("btn-register");
const btnLogin = document.getElementById("btn-login");

const nombreInput = document.getElementById("nombre");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const rolSelect = document.getElementById("rol");
const tipoUsuario = document.getElementById("tipo-usuario");

let mode = "register"; // register | login

// --------------------
// Toggle Login / Register
// --------------------
btnRegister.addEventListener("click", () => {
  mode = "register";
  title.textContent = "Crear cuenta";
  btnRegister.classList.add("active");
  btnLogin.classList.remove("active");
  nombreInput.style.display = "block";
  tipoUsuario.style.display = "block";
});

btnLogin.addEventListener("click", () => {
  mode = "login";
  title.textContent = "Iniciar sesión";
  btnLogin.classList.add("active");
  btnRegister.classList.remove("active");
  nombreInput.style.display = "none";
  tipoUsuario.style.display = "none";
});

// --------------------
// Submit
// --------------------
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (mode === "register") {
    const nombre = nombreInput.value.trim();
    const rol = rolSelect.value;

    const exists = users.find(u => u.email === email);
    if (exists) {
      alert("Este email ya está registrado");
      return;
    }

    const newUser = {
      id: Date.now(),
      nombre,
      email,
      password,
      rol
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("session", JSON.stringify(newUser));

    redirectByRole(rol);
  }

  if (mode === "login") {
    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      alert("Credenciales incorrectas");
      return;
    }

    localStorage.setItem("session", JSON.stringify(user));
    redirectByRole(user.rol);
  }
});

// --------------------
// Redirección por rol
// --------------------
function redirectByRole(rol) {
  switch (rol) {
    case "embarazada":
      window.location.href = "../pages/embarazo.html";
      break;
    case "mama":
      window.location.href = "../pages/maternidad.html";
      break;
    case "usuario":
      window.location.href = "../index.html";
      break;
    case "admin":
      window.location.href = "../admin/dashboard.html";
      break;
    default:
      window.location.href = "../index.html";
  }
}
