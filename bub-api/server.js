const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Connect to DB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Ensure the 'images' directory exists or create it
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}

// Use the user routes
app.use('/user', userRoutes);

// Serve static files (images)
app.use('/images', express.static(imagesDir));

// Set up the port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
