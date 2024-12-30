const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

router.get('/profile', authenticateToken, (req, res) => {
  const userId = req.user.id_pengguna;

  db.query('SELECT id_pengguna, nama_pengguna, email, tanggal_dibuat FROM pengguna WHERE id_pengguna = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    res.json(results[0]);
  });
});

module.exports = router;
