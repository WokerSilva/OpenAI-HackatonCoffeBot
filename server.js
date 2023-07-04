const express = require('express');
const app = express();
const port = 3000; // Puerto

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('Prueba de ejecución del servidor');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`El servidor está corriendo en http://localhost:${port}`);
});
