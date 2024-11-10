const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); // No options needed as of mongoose 6+
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit the process if the connection fails
    }
};

module.exports = connectDB;
