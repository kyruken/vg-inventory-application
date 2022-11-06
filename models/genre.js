const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
})

genreSchema.virtual("url").get(function() {
    return `genre/${this._id}`;
})

module.exports = mongoose.model("Genre", genreSchema);