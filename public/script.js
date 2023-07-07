const chatLog = document.getElementById('chat-log');
const inputText = document.getElementById('input-text');
const submitBtn = document.getElementById('submit-btn');

submitBtn.addEventListener('click', enviarPregunta);
inputText.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    enviarPregunta();
  }
});

function enviarPregunta() {
  const pregunta = inputText.value.trim();
  if (pregunta !== '') {
    agregarMensajeUsuario(pregunta);
    inputText.value = '';

    fetch(`/preguntar?pregunta=${encodeURIComponent(pregunta)}`)
      .then(response => response.text())
      .then(respuesta => {
        agregarMensajeBot(respuesta);
      })
      .catch(error => {
        console.error('Error al enviar la pregunta:', error);
        agregarMensajeBot('Ocurrió un error al enviar la pregunta.');
      });
  }
}

function agregarMensajeUsuario(mensaje) {
  const mensajeUsuario = document.createElement('div');
  mensajeUsuario.classList.add('message', 'user-message');
  mensajeUsuario.textContent = mensaje;
  chatLog.appendChild(mensajeUsuario);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function agregarMensajeBot(mensaje) {
  const mensajeBot = document.createElement('div');
  mensajeBot.classList.add('message', 'bot-message');
  mensajeBot.textContent = mensaje;
  chatLog.appendChild(mensajeBot);
  chatLog.scrollTop = chatLog.scrollHeight;
}