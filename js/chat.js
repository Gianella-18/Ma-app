/* -------------------- */
/* CHAT COMUNIDAD */
/* -------------------- */

const chatMessages = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatTema = document.getElementById("chat-tema");

/* Seguridad mínima */
if (!chatMessages || !chatForm || !chatInput || !chatTema) {
  console.error("Error: elementos del chat no encontrados");
}

/* ======================
   USUARIO ACTUAL
====================== */
const session = JSON.parse(localStorage.getItem("session")) || {};
const nombreUsuario = session.nombre || "Anónimo";

/* ======================
   TEMA DEL CHAT
====================== */
const urlParams = new URLSearchParams(window.location.search);
const tema = urlParams.get("tema") || "comunidad";

const temas = {
  embarazo: "Embarazo y preparativos",
  parto: "Parto y cesárea",
  lactancia: "Lactancia y alimentación",
  sueno: "Sueño del bebé",
  "recien-nacido": "Cuidados del recién nacido",
  desarrollo: "Desarrollo y estimulación",
  vinculo: "Vínculo y salud emocional",
  trabajo: "Vuelta al trabajo y organización",
  "maternidad-real": "Maternidad real"
};

chatTema.textContent = temas[tema] || "Comunidad Ma!";

/* ======================
   STORAGE POR TEMA
====================== */
const storageKey = `chat-${tema}`;
let mensajes = JSON.parse(localStorage.getItem(storageKey)) || [];

/* ======================
   RENDER
====================== */
function renderMensajes() {
  chatMessages.innerHTML = "";

  mensajes.forEach(msg => {
    const div = document.createElement("div");
    div.className = `message ${msg.autor}`;

    const nombre = msg.nombre || "Anónimo";

    div.innerHTML = `
      <span class="message-name">${nombre}</span><br>
      <span class="message-text">${msg.texto}</span>
    `;

    chatMessages.appendChild(div);
  });

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

renderMensajes();

/* ======================
   ENVIAR MENSAJE
====================== */
chatForm.addEventListener("submit", e => {
  e.preventDefault();

  const texto = chatInput.value.trim();
  if (!texto) return;

  mensajes.push({
    autor: "user",
    nombre: nombreUsuario,
    texto
  });

  localStorage.setItem(storageKey, JSON.stringify(mensajes));
  chatInput.value = "";
  renderMensajes();

  /* Respuesta simulada */
  setTimeout(() => {
    mensajes.push({
      autor: "other",
      nombre: "Comunidad Ma!",
      texto: "Hola! Gracias por compartir 💜"
    });

    localStorage.setItem(storageKey, JSON.stringify(mensajes));
    renderMensajes();
  }, 800);
});
