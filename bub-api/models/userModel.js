const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true, 
        minlength: 5,  
        maxlength: 15,  
        validate: {
            validator: function(value) {
                return /^[a-zA-Z\s]+$/.test(value);  
            },
            message: 'Full name can only include letters and spaces.'
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,  
        lowercase: true,  
        trim: true,
        validate: {
            validator: function(value) {
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);  
            },
            message: 'Please enter a valid email address.'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,  // Minimum 8 characters
        validate: {
            validator: function(value) {
                // Regex: at least one uppercase letter, one special character, and minimum 8 characters
                return /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(value);
            },
            message: 'Password must be at least 8 characters long, contain at least one uppercase letter and one special character.'
        }
    },
    image: {
        type: String,  // This stores the file path
        trim: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving if it has been modified
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Compare password method for login
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Handle duplicate email errors
userSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        next(new Error('This email is already registered.'));
    } else {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
