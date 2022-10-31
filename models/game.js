const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    developer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Developer"
    },
    esrb: String,
    genre: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre"
    }],
    release: {
        type: Date,
        required: true
    },
    price: Number,
})

gameSchema.virtual("url").get(function() {
    return `/games/game/${this._id}`;
})

module.exports = mongoose.model("Game", gameSchema);