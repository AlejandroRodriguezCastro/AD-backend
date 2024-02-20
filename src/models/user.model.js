const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: false,
        },
        password: {
            type: String,
            required: false,
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