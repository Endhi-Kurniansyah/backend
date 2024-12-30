const express = require('express');
const db = require('../db/connection');
const router = express.Router();

// Get all images
router.get('/', (req, res) => {
  db.query('SELECT * FROM gambar', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add new image
router.post('/', (req, res) => {
  const { id_pengguna, judul, deskripsi, url_gambar, id_kategori } = req.body;
  db.query(
    'INSERT INTO gambar (id_pengguna, judul, deskripsi, url_gambar, id_kategori) VALUES (?, ?, ?, ?, ?)',
    [id_pengguna, judul, deskripsi, url_gambar, id_kategori],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ id: results.insertId, message: 'Image added successfully!' });
    }
  );
});

// Delete an image
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM gambar WHERE id_gambar = ?', [id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Image deleted successfully!' });
  });
});

module.exports = router;
