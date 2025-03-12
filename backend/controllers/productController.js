const Product = require('../models/productModel');

exports.getAllProducts = (req, res) => {
  Product.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.createProduct = (req, res) => {
  const product = req.body;
  if (!product.name || !product.category || product.stock < 0 || product.price < 0) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }
  
  Product.create(product, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(result);
  });
};

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const product = req.body;
  Product.update(id, product, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(result);
  });
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  Product.delete(id, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(result);
  });
};