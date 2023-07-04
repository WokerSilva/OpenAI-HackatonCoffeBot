const fs = require('fs');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai');

// Credenciales de OpenAI
const configuration = new Configuration({
  apiKey: 'KEY-OPEN-AI',
});
const openai = new OpenAIApi(configuration);

async function obtenerContextoDesdeArchivoTXT() {
    // DEBE REGRESAR EL TEXTO PROCESADO DESDE EL TXT
}

async function procesarPregunta(pregunta) {
    // Aquí es donde nos conectaremos al API de OpenAI
}