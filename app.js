const express = require('express');
const path = require('path');
const { products } = require('./data');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/products', (req, res) => {
  const newProducts = products.map(({ id, name, image }) => ({ id, name, image }));
  res.json(newProducts);
});

app.get('/api/products/:productID', (req, res) => {
  const { productID } = req.params;
  const singleProduct = products.find(product => product.id === Number(productID));

  if (!singleProduct) {
    return res.status(404).send('<h1>Product Does Not Exist</h1>');
  }

  res.json(singleProduct); 
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000....');
});
