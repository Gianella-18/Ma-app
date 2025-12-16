/* -------------------- */
/* CHAT COMUNIDAD */
/* -------------------- */

const chatMessages = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatTema = document.getElementById("chat-tema");

const params = new URLSearchParams(window.location.search);
const tema = params.get("tema") || "comunidad";

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

chatTema.textContent = temas[tema] || "Comunidad Ma!";

// Storage por tema
const storageKey = `chat-${tema}`;
let mensajes = JSON.parse(localStorage.getItem(storageKey)) || [];

// Render mensajes
function renderMensajes() {
  chatMessages.innerHTML = "";
  mensajes.forEach(msg => {
    const div = document.createElement("div");
    div.className = `message ${msg.autor}`;
    div.textContent = msg.texto;
    chatMessages.appendChild(div);
  });
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

renderMensajes();

// Enviar mensaje
chatForm.addEventListener("submit", e => {
  e.preventDefault();

  const texto = chatInput.value.trim();
  if (!texto) return;

  mensajes.push({ autor: "user", texto });
  localStorage.setItem(storageKey, JSON.stringify(mensajes));

  chatInput.value = "";
  renderMensajes();

  // Respuesta simulada
  setTimeout(() => {
    mensajes.push({
      autor: "other",
      texto: "Hola, cómo estás? Yo estoy de 23 semanas, ¿vos?"
    });
    localStorage.setItem(storageKey, JSON.stringify(mensajes));
    renderMensajes();
  }, 800);
});
