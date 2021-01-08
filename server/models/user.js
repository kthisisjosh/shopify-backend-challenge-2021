const mongoose = require('mongoose');
var SHA256 = require('crypto-js/sha256');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
        },
        lastName: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        hashed_password: {
            type: String,
            required: true,
        },
        salt: String,
        role: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

// virtual field
userSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = uuidv4();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

userSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return JSON.stringify(SHA256(password + this.salt).words);
        } catch (err) {
            return '';
        }
    },
};

module.exports = mongoose.model('User', userSchema);
