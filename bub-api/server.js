const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.use('/user', userRoutes);

// Serve images folder statically
app.use('/images', express.static(path.join(__dirname, 'images')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
