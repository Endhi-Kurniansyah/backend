const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

router.post('/signup', (req, res) => {
  const { nama_pengguna, email, kata_sandi } = req.body;

  bcrypt.hash(kata_sandi, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: 'Password error' });

    db.query(
      'INSERT INTO pengguna (nama_pengguna, email, kata_sandi, tanggal_dibuat) VALUES (?, ?, ?, NOW())',
      [nama_pengguna, email, hash],
      (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Email already exists' });
          }
          return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'User created successfully' });
      }
    );
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM pengguna WHERE email = ? OR nama_pengguna = ?';
  db.query(query, [email, email], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });

    const user = results[0];

    bcrypt.compare(password, user.kata_sandi, (err, isMatch) => {
      if (err) return res.status(500).json({ error: 'Password comparison error' });
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ id_pengguna: user.id_pengguna }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
      res.json({ token });
    });
  });
});

module.exports = router;
