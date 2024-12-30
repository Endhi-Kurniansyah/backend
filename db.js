const mysql = require('mysql');
require('dotenv').config();

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

module.exports = db;
