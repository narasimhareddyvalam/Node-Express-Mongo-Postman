const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Joi = require('joi');

// Validation function using Joi for user input
const validateUser = (data) => {
    const schema = Joi.object({
        fullName: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    });
    return schema.validate(data);
};

// Create a new user
exports.createUser = async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { fullName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = new User({ fullName, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        // Handle duplicate email error
        if (err.code === 11000) {
            return res.status(400).json({ message: 'This email is already registered.' });
        }
        res.status(500).json({ message: 'Error creating user', error: err.message });
    }
};

// Update user details
exports.updateUser = async (req, res) => {
    const { fullName, password } = req.body;
    const { email } = req.query;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.fullName = fullName || user.fullName;
        user.password = password ? await bcrypt.hash(password, 10) : user.password;

        await user.save();
        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating user', error: err.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    const { email } = req.query;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.deleteOne({ email });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err.message });
    }
};

// Get all users (full details)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'fullName email');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving users', error: err.message });
    }
};

// Upload image for user
exports.uploadImage = async (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const { email } = req.query;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.imagePath = req.file.path;
        await user.save();

        res.status(200).json({ message: 'Image uploaded', path: req.file.path });
    } catch (err) {
        res.status(500).json({ message: 'Error uploading image', error: err.message });
    }
};
