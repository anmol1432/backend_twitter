const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(12);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    confirmPassword: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            // Store hash in your password DB.
            this.password = await bcrypt.hashSync(this.password, salt);
            this.confirm_password = await bcrypt.hashSync(this.confirmPassword, salt);
        }
        next()
    } catch (error) {
        console.log("SEREVER ERROR:- ", error)
        next()
    }
})



const User = mongoose.model('USER', userSchema)

module.exports = User;