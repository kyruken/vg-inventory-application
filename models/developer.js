const mongoose = require('mongoose');

const devSchema = new mongoose.Schema({
    name: String
})

devSchema.virtual("url").get(function() {
    return `/games/developer/${this._id}`;
})

module.exports = mongoose.model("Developer", devSchema);