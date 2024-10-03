const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const productosRoutes = require('./routes/productos');


mongoose.connect('mongodb://localhost/crudProductos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('No se pudo conectar a MongoDB', err));

// const app = express();
// app.use(bodyParser.json());
// app.use('/productos', productosRoutes);

const app = express();
app.set('view engine', 'ejs'); // Configura EJS como motor de plantillas
app.set('views', path.join(__dirname, 'views')); // Define la carpeta de vistas
app.use(bodyParser.urlencoded({ extended: true })); // Para recibir datos de formularios
app.use('/productos', productosRoutes); // Asegúrate de que esto esté configurado correctamente

app.listen(3000, () => {
    console.log('Servidor en ejecución en http://localhost:3000');
});
