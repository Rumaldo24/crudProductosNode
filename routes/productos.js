const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// Renderizar la vista para crear un producto
router.get('/nuevo', (req, res) => {
    res.render('crear_producto'); // Renderiza la vista crear_producto.ejs
});

// Crear un producto
router.post('/', async (req, res) => {
    try {

        const { nombre, descripcion, precio, cantidad } = req.body;

        // Validar que el precio tenga hasta 3 decimales
        if (!/^\d+(\.\d{1,3})?$/.test(precio)) {
            return res.status(400).send({ message: 'El precio debe tener hasta 3 decimales.' });
        }

        // Validar que la cantidad sea un entero
        if (!/^\d+$/.test(cantidad)) {
            return res.status(400).send({ message: 'La cantidad debe ser un número entero.' });
        }

        const producto = new Producto(req.body);
        await producto.save();
        res.redirect('/productos'); // Redirige a la lista de productos después de crear
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { message: 'Error al crear producto.' }); // Renderiza una página de error
    }
});

// Leer todos los productos
router.get('/', async (req, res) => {
    const productos = await Producto.find();
    res.render('lista_productos', { productos }); // Renderiza la vista con los productos
});

// Renderizar la vista para editar un producto
router.get('/editar/:id', async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).render('error', { message: 'Producto no encontrado.' }); // Renderiza una página de error
        }
        res.render('editar_producto', { producto }); // Renderiza la vista de editar
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { message: 'Error al acceder al producto.' }); // Renderiza una página de error
    }
});

// Actualizar un producto
router.post('/editar/:id', async (req, res) => {
    const { nombre, descripcion, precio, cantidad } = req.body;

    // Validar que el precio tenga hasta 3 decimales
    if (!/^\d+(\.\d{1,3})?$/.test(precio)) {
        return res.status(400).send({ message: 'El precio debe tener hasta 3 decimales.' });
    }

    // Validar que la cantidad sea un entero
    if (!/^\d+$/.test(cantidad)) {
        return res.status(400).send({ message: 'La cantidad debe ser un número entero.' });
    }

    await Producto.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/productos'); // Redirige a la lista de productos después de actualizar
});

// Eliminar un producto
router.post('/eliminar/:id', async (req, res) => {
    await Producto.findByIdAndDelete(req.params.id);
    res.redirect('/productos'); // Redirige a la lista de productos después de eliminar
});

module.exports = router;
