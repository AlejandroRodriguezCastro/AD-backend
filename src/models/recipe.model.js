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
        ingredients: [
            {
                name: {
                    type: String,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                }
            },
        
        ],
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
        category: {
            type: [String],
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
        sodium: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            required: false,
        },
        like: {
            type: Number,
            required: false,
        },
        video: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;