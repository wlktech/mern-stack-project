const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReceipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Receipe', ReceipeSchema); // 'Receipe' is the name of the collection in the database