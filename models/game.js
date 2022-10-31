const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    developer: {
        type: String,
        required: true,
        ref: "developer"
    },
    esrb: String,
    genre: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "genre"
    },
    release: {
        type: Date,
        required: true
    },
    price: Number,
})

module.exports = mongoose.model("Game", gameSchema);