const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Rutas básicas

app.get('/', (req, res) => {
  res.send('Hello World!');
});

let data = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Pear' }
];

app.get('/api/products', (req, res) => {
  res.json(data);
});

// Obtener un producto por ID (Params)
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = data.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Crear un nuevo producto
app.post('/api/products', (req, res) => {
  const newProduct = req.body;
  data.push(newProduct);
  res.status(201).json(newProduct);
});

// Actualizar un producto
app.put('/api/products/:id', (req, res) => {
    const { nombre } = req.body;
    const product = data.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    product.name = nombre;
    res.json(product);
});

// Eliminar un producto
app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  data = data.filter(p => p.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});