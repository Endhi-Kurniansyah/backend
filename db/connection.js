const mysql = require('mysql2');

// Set up the database connection
const connection = mysql.createConnection({
  host: 'localhost', // Change this with your host
  user: 'root',      // Your database username
  password: '',      // Your database password
  database: 'pixture' // Your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to the database.');
});

module.exports = connection;
