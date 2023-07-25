const path = require('path');
const fs = require('fs');

const ruta = path.resolve(__dirname, '../data/products.json');
const jsonProducts = fs.readFileSync(ruta, { encoding: 'utf-8' });
let products = JSON.parse(jsonProducts);

const controller = {
  crear: (req, res) => {
    const { name, price, description, image } = req.body;

    if (!name || !price || !description || !image) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // id + 1
    const maxId = Math.max(...products.map((product) => product.id));
    const newProductId = maxId + 1;

    // Crear
    const newProduct = {
      id: newProductId,
      name,
      price,
      description,
      image,
    };

    // Agrega el product al array de productos
    products.push(newProduct);

    // Guarda todo en el archivo products.json
    fs.writeFileSync(ruta, JSON.stringify(products, null, 2));

    res.json(newProduct);
  },

  listar: (req, res) => {
    res.json(products);
  },

  detalle: (req, res) => {
    res.json('Detalle de producto');
  },

  detalleProducto: (req, res) => {
    const { id } = req.params;

    // Buscamos el producto por su ID en el array de productos
    const productoEncontrado = products.find((product) => product.id === parseInt(id));

    // Si el producto existe, lo devolvemos en formato JSON
    if (productoEncontrado) {
      res.json(productoEncontrado);
    } else {
      // Si el producto no se encuentra, respondemos con un código de estado 404 (Not Found)
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  },
};

module.exports = controller;
