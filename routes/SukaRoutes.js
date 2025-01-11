const express = require('express');
const db = require('../db/connection');
const router = express.Router();

// Like an image
router.post('/like', (req, res) => {
  const { id_pengguna, id_gambar } = req.body;

  db.query(
    'INSERT INTO suka (id_pengguna, id_gambar) VALUES (?, ?)',
    [id_pengguna, id_gambar],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.status(201).json({ message: 'Image liked successfully!' });
    }
  );
});

// Get all likes for a specific image
router.get('/:id_gambar', (req, res) => {
  const { id_gambar } = req.params;

  db.query('SELECT * FROM suka WHERE id_gambar = ?', [id_gambar], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});

// Unlike an image
router.delete('/unlike', (req, res) => {
  const { id_pengguna, id_gambar } = req.body;

  db.query(
    'DELETE FROM suka WHERE id_pengguna = ? AND id_gambar = ?',
    [id_pengguna, id_gambar],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json({ message: 'Image unliked successfully!' });
    }
  );
});

module.exports = router;
