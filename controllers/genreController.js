//Model
const Genre = require('../models/genre');

exports.index = (req, res) => {
    Genre.where("name")
    .exec((err, result) => {
        if (err) {
            return next(err);
        }
        res.render('./genre/genre_list', {genre: result});
    })
}

exports.genre_detail_get = (req, res) => {

}

exports.genre_form_get = (req, res) => {
}

exports.genre_form_post = (req, res) => {

}

exports.genre_delete_get = (req, res) => {

}

exports.genre_delete_post = (req, res) => {

}

exports.genre_update_get = (req, res, next) => {

}

exports.genre_update_post = (req, res) => {
    
}