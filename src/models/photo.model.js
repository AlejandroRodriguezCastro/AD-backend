const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: true,
        },
        recipe: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Recipe',
        },
    },
    {
        timestamps: true,
    }
);

const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;