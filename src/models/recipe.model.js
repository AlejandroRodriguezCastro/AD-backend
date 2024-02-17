const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        ingredients: {
            type: [mongoose.Schema.Types.ObjectId],
            required: true,
            ref: 'Ingredient',
        },
        instructions: {
            type: [String],
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        photo: {
            type: [String],
            required: false
        },
        requiredTime: {
            type: Number,
            required: true,
        },
        portion: {
            type: Number,
            required: true,
        },
        hastag: {
            type: String,
            required: true,
        },
        calorie: {
            type: Number,
            required: true,
        },
        fat: {
            type: Number,
            required: true,
        },
        protein: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        like: {
            type: Number,
            required: true,
        },
        video: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;