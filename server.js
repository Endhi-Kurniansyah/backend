const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const penggunaRoutes = require('./routes/PenggunaRoutes');
const gambarRoutes = require('./routes/GambarRoutes');
const kategoriRoutes = require('./routes/KategoriRoutes');
const komentarRoutes = require('./routes/KomentarRoutes');
const pengikutRoutes = require('./routes/PengikutRoutes');
const sukaRoutes = require('./routes/SukaRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/pengguna', penggunaRoutes);
app.use('/api/gambar', gambarRoutes);
app.use('/api/kategori', kategoriRoutes);
app.use('/api/komentar', komentarRoutes);
app.use('/api/pengikut', pengikutRoutes);
app.use('/api/suka', sukaRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the API server!');
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).send('Route not found');
});

// Handle server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
