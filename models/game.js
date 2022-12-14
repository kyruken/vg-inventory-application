const mongoose = require('mongoose');
const {DateTime} = require('luxon');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
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
    picture: String
})

gameSchema.virtual("url").get(function() {
    return `/games/game/${this._id}`;
})

gameSchema.virtual("date_formatted").get(function() {
    let year = DateTime.fromJSDate(this.release).year;
    let month = DateTime.fromJSDate(this.release).month;
    let day = DateTime.fromJSDate(this.release).day;
    return `${year}-${month}-${day}`;
})

gameSchema.virtual("date").get(function() {
    let date = DateTime.fromJSDate(this.release).toLocaleString(DateTime.DATE_FULL);
    return date;
})

module.exports = mongoose.model("Game", gameSchema);