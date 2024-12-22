const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');

// Mengatur environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Untuk mengizinkan request dari domain lain

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Ganti dengan username MySQL Anda
  password: '', // Ganti dengan password MySQL Anda
  database: 'pixture', // Ganti dengan nama database Anda
});

db.connect(err => {
  if (err) throw err;
  console.log('Database connected!');
});

// Endpoint untuk Sign Up
app.post('/signup', (req, res) => {
  const { nama_pengguna, email, kata_sandi } = req.body;

  // Hash password
  bcrypt.hash(kata_sandi, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: 'Password error' });

    // Masukkan data ke tabel pengguna
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

// Endpoint untuk Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // Cek apakah email atau username ada di database
    const query = 'SELECT * FROM pengguna WHERE email = ? OR nama_pengguna = ?';
    db.query(query, [email, email], (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (results.length === 0) return res.status(404).json({ error: 'User not found' });
  
      const user = results[0];
  
      // Bandingkan password
      bcrypt.compare(password, user.kata_sandi, (err, isMatch) => {
        if (err) return res.status(500).json({ error: 'Password comparison error' });
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
  
        // Buat token JWT
        const token = jwt.sign({ id_pengguna: user.id_pengguna }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
        res.json({ token });
      });
    });
  });
  

// Jalankan server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
