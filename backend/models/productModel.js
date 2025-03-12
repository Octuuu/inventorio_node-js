const db = require('../config/database');

const Product = {
  getAll: (callback) => {
    db.all('SELECT * FROM products', [], callback);
  },

  create: (product, callback) => {
    const { name, category, stock, price } = product;
    db.run(
      'INSERT INTO products (name, category, stock, price) VALUES (?, ?, ?, ?)',
      [name, category, stock, price],
      function (err) {
        callback(err, { id: this.lastID });
      }
    );
  },

  update: (id, product, callback) => {
    const { name, category, stock, price } = product;
    db.run(
      'UPDATE products SET name = ?, category = ?, stock = ?, price = ? WHERE id = ?',
      [name, category, stock, price, id],
      function (err) {
        callback(err, { updated: this.changes });
      }
    );
  },

  delete: (id, callback) => {
    db.run('DELETE FROM products WHERE id = ?', id, function (err) {
      callback(err, { deleted: this.changes });
    });
  }
};

module.exports = Product;
