const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: String,
    description: String,
})

genreSchema.virtual("url").get(function() {
    return `/games/genre/${this._id}`;
})

module.exports = mongoose.model("Genre", genreSchema);