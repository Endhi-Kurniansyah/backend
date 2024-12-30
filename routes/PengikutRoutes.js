const express = require('express');
const db = require('../db/connection');
const router = express.Router();

// Get comments for a specific image
router.get('/:id_gambar', (req, res) => {
  const { id_gambar } = req.params;
  db.query('SELECT * FROM komentar WHERE id_gambar = ?', [id_gambar], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add a comment
router.post('/', (req, res) => {
  const { id_pengguna, id_gambar, isi_komentar } = req.body;
  db.query(
    'INSERT INTO komentar (id_pengguna, id_gambar, isi_komentar) VALUES (?, ?, ?)',
    [id_pengguna, id_gambar, isi_komentar],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ id: results.insertId, message: 'Comment added successfully!' });
    }
  );
});

// Delete a comment
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM komentar WHERE id_komentar = ?', [id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Comment deleted successfully!' });
  });
});

module.exports = router;
