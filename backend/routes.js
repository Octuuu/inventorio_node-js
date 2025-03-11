const express = require('express');
const router = express.Router();
const db = require('./database');

// obetener productos
router.get('/products', (req, res) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error : err.message})
        } else {
            res.json(rows)
        }
    });
});

// agregar productos
router.post('/products', (req, res) => {
    const { name, category, stock, price } = req.body;
    db.run('INSERT INTO products (name, category, stock, price) VALUES (?, ?, ?, ?)', 
        [name, category, stock, price],
        function (err) {
            if (err) {
              res.status(400).json({ error: err.message });
            } else {
              res.json({ id: this.lastID });
            }
          }
    )
})


// actualizar productos
router.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, category, stock, price } = req.body;

    db.run(
        'UPDATE products SET name =?, category =?, stock =?, price =? WHERE id =?',
        [name, category, stock, price, id],
        function (err) {
            if (err) {
                res.status(400).json({ error: err.message });
            } else {
                res.json({ updated: this.changes });
            }
        }
    );
});

// eliminar productos
router.delete('/products/:id', (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM products WHERE id =?', id, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.json({ deleted: this.changes });
        }
    });
});

module.exports = router;