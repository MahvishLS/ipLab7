const express = require('express');
const path = require('path');
const { products } = require('./data');

const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/products', (req, res) => {
    const newProducts = products.map(({ id, name, desc }) => ({ id, name, desc }));
    res.json(newProducts);
});

app.get('/api/products/:productID', (req, res) => {
    const { productID } = req.params;
    const product = products.find(p => p.id === Number(productID));

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});
