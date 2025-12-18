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
// Admin por defecto (semilla)
// --------------------
function seedAdmin() {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  const adminExists = users.some(u => u.rol === "admin");

  if (!adminExists) {
    users.push({
      id: 1,
      nombre: "Administrador",
      email: "admin@ma.com",
      password: "admin123",
      rol: "admin"
    });

    localStorage.setItem("users", JSON.stringify(users));
  }
}

seedAdmin();

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

  // -------- REGISTER --------
  if (mode === "register") {
    const nombre = nombreInput.value.trim();
    const rol = rolSelect.value;

    if (!nombre || !email || !password) {
      alert("Completá todos los campos");
      return;
    }

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

    saveSession(newUser);
    redirectByRole(newUser.rol);
  }

  // -------- LOGIN --------
  if (mode === "login") {
    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      alert("Credenciales incorrectas");
      return;
    }

    saveSession(user);
    redirectByRole(user.rol);
  }
});

// --------------------
// Session
// --------------------
function saveSession(user) {
  const sessionUser = {
    id: user.id,
    nombre: user.nombre,
    email: user.email,
    rol: user.rol
  };

  localStorage.setItem("session", JSON.stringify(sessionUser));
}

// --------------------
// Redirección por rol
// --------------------
function redirectByRole(rol) {
  switch (rol) {
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
