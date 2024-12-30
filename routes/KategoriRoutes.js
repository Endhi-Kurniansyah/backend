const express = require('express');
const db = require('../db/connection');
const router = express.Router();

// Get all categories
router.get('/', (req, res) => {
  db.query('SELECT * FROM kategori', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add a new category
router.post('/', (req, res) => {
  const { nama_kategori } = req.body;
  db.query('INSERT INTO kategori (nama_kategori) VALUES (?)', [nama_kategori], (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ id: results.insertId, message: 'Category added successfully!' });
  });
});

// Update a category
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nama_kategori } = req.body;
  db.query('UPDATE kategori SET nama_kategori = ? WHERE id_kategori = ?', [nama_kategori, id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Category updated successfully!' });
  });
});

// Delete a category
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM kategori WHERE id_kategori = ?', [id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Category deleted successfully!' });
  });
});

module.exports = router;
