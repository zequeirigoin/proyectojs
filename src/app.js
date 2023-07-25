const express = require('express');
const app = express(); 
const logger = require('./middlewares/logger');
const products = require('./routes/products');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/products', products);
app.use(logger);

app.listen(3000, () => console.log('Escuchando server'));
