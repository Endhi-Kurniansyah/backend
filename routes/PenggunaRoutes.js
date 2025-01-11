const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/connection');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { nama_pengguna, email, kata_sandi } = req.body;
  const hash = await bcrypt.hash(kata_sandi, 10);

  db.query(
    'INSERT INTO pengguna (nama_pengguna, email, kata_sandi) VALUES (?, ?, ?)',
    [nama_pengguna, email, hash],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.status(201).json({ message: 'User registered successfully!' });
    }
  );
});

// Login
router.post('/login', (req, res) => {
  const { email, kata_sandi } = req.body;

  db.query('SELECT * FROM pengguna WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    const user = results[0];
    const isMatch = await bcrypt.compare(kata_sandi, user.kata_sandi);

    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id_pengguna: user.id_pengguna }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});

module.exports = router;
