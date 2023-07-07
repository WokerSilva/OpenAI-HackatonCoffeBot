const fs = require('fs');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai');

// Credenciales de OpenAI
const configuration = new Configuration({
  apiKey: 'KEY-OPENAI',
});
const openai = new OpenAIApi(configuration);

async function obtenerContextoDesdeArchivoTXT() {
  const rutaArchivo = path.join(__dirname, 'informacion', 'cafeteria.txt');
  const contenidoArchivo = await fs.promises.readFile(rutaArchivo, 'utf-8');

  let contexto = '';
  let titulo = '';
  let informacion = '';

  const lineas = contenidoArchivo.split('\n');

  lineas.forEach((linea) => {
    if (linea.trim() === '') {
      if (titulo && informacion) {
        contexto += `${titulo}\n${informacion}\n\n`;
        informacion = '';
      }
      titulo = '';  
    } else if (titulo === '') {
      titulo = linea.trim();
    } else {
      informacion += linea.trim() + ' ';
    }
  });

  if (titulo && informacion) {
    contexto += `${titulo}\n${informacion}\n\n`;
  }

  return contexto;
}

// JavaScript helper chatbot
// This is a message-style chatbot that can answer questions about using JavaScript. It uses a few examples to get the conversation started
async function procesarPregunta(pregunta) {
  try {
    const contexto = await obtenerContextoDesdeArchivoTXT();
    const textoConsulta = `${contexto}\nYou: ${pregunta}`;
    console.log('Consulta enviada a OpenAI:', textoConsulta); // Imprimir la consulta

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: textoConsulta,
      temperature: 0.8,
      max_tokens: 100,
      top_p: 0.8,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: ["You:"],
    });

    console.log('OpenAI:', response); // Imprimir la respuesta completa

    if (response && response.data && response.data.choices && response.data.choices.length > 0) {
      const respuesta = response.data.choices[0].text.trim();
      console.log('OpenAI:', respuesta); // Imprimir la respuesta
      return respuesta;
    } else {
      throw new Error('Formato Incorrecto.');
    }
  } catch (error) {
    console.error('Error al consultar el API de OpenAI:', error);
    throw new Error('Ocurrió un error al consultar el bot.');
  }
}

module.exports = {
  procesarPregunta,
};
