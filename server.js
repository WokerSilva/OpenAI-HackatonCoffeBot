const express = require('express');
const path = require('path');
const chatbot = require('./coffebot');

const app = express();
const port = 3000;

//LINEA AÑADIDA
app.use(express.static('public'));

// Ruta para la página de inicio
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para procesar las preguntas
app.get('/preguntar', async (req, res) => {
  try {
    const pregunta = req.query.pregunta;
    const respuesta = await chatbot.procesarPregunta(pregunta);
    res.send(respuesta);
  } catch (error) {
    console.error('Error en el chatbot:', error);
    res.status(500).send('Ocurrió un error en el chatbot.');
  }
});

app.listen(port, () => {
  console.log(`El servidor está funcionando en http://localhost:${port}`);
});
