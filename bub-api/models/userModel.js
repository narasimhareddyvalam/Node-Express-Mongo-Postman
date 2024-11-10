const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true, 
        minlength: 3,  
        maxlength: 15,  
        validate: {
            validator: function(value) {
                
                return /^[a-zA-Z\s]+$/.test(value);
            },
            message: 'Full name should only contain letters and spaces.'
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
        minlength: 6,  
        maxlength:15,
        validate: {
            validator: function(value) {
                return /^(?=.*[A-Z])(?=.*\d).{6,}$/.test(value);
            },
            message: 'Password must be at least 6 characters long, contain at least one uppercase letter, and one digit.'
        }
    },
    image: {
        type: String,
        trim: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});


userSchema.pre('save', async function(next) {

    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);  
    }
    next();
});


userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.model('User', userSchema);

module.exports = User;
