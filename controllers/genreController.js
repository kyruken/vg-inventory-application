//Model
const genreSchema = require('../models/genre');

exports.index = (req, res) => {
    res.render('./genre/genre_list');
}