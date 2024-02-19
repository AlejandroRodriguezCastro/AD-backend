const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            trim: true, // trim whitespace
            minlength: 12,
        },
        recipe: {
            type: [mongoose.Schema.Types.ObjectId],
            required: false,
            ref: 'Recipe',
        },
        favorite: {
            type: [mongoose.Schema.Types.ObjectId],
            required: false,
            ref: 'Recipe',
        },
        avatar: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;