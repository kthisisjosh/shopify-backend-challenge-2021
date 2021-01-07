const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema

const imageSchema = new mongoose.Schema(
    {
        user: {
            type: ObjectId,
            ref: "User",
            required: true
        },
        private: {
            type: Boolean,
            default: false,
            required: true
        },
        price: {
            type: Number,
            trim: true,
            maxlength: 32,
            default: 0
        },
        quantity: {
            type: Number,
            default: 0
        },
        sold: {
            type: Number,
            default: 0
        },
        data_url: {
            type: String,
            require: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Image', imageSchema)
