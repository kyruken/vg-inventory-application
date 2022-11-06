const async = require('async');
//Model
const Genre = require('../models/genre');
const Game = require('../models/game');

exports.index = (req, res) => {
    Genre.where("name")
    .exec((err, result) => {
        if (err) {
            return next(err);
        }
            res.render('./genre/genre_list', { genre: result });
    })
}

exports.genre_detail_get = (req, res) => {
    async.parallel(
        {
            //this Game.where does something amazing where it iterates through the genre array by itself and compares
            //if any of the id's in the array match the req.params.id, and returns that game if theres a match.
            //Good stuff mongoose devs! Amazing functionality that helps me a TON
            games(callback) {
                Game.where("genre")
                .equals(req.params.id)
                .exec(callback);
            },

            genre(callback) {
                Genre.findById(req.params.id).exec(callback);
            }
        }, (err, result) => {
            res.render('./genre/genre_detail', {
                genre: result.genre,
                games: result.games
            })
        }
    )
}

exports.genre_form_get = (req, res) => {
    res.render('./genre/genre_form', { message: "Create genre" })
}

exports.genre_form_post = (req, res) => {
    /* Add validation sanitizer */
    const newGenre = new Genre({
        name: req.body.name,
        description: req.body.description
    })

    newGenre.save((err) => {
        if (err) {
            return next(err);
        }
    })
    
    res.redirect(newGenre.url);

}

exports.genre_delete_get = (req, res) => {
    Genre.findById(req.params.id, (err, result) => {
        if (err) {
            return next(err);
        }
        res.render('./genre/genre_delete', { genre: result })

    })
}

exports.genre_delete_post = (req, res) => {
    async.parallel(
        {
            games(callback) {
                Game.where("genre")
                    .equals(req.params.id)
                    .exec(callback);
            },

            genre(callback) {
                Genre.findById(req.params.id).exec(callback);
            }

        }, (err, result) => {
            if (err) {
                return next(err);
            }
            console.log(result.games);

            if (result.games.length > 0) {
                res.render('./genre/genre_detail', {
                    genre: result.genre,
                    message: "Cannot delete this genre. This genre currently has games on the database."
                })

                return;
            }

            Genre.findByIdAndDelete(req.params.id, (err) => {
                if (err) {
                    return next(err);
                }
        
                res.redirect('/games/genres');
            })
        })


}

exports.genre_update_get = (req, res, next) => {
    Genre.findById(req.params.id, (err, result) => {
        if (err) {
            return next(err);
        }

        res.render('./genre/genre_form', {
            genre: result,
            message: "Update genre"
        })
    })

}

exports.genre_update_post = (req, res) => {
    const newGenre = new Genre({
        name: req.body.name,
        description: req.body.description,
        _id: req.params.id
    })

    Genre.findByIdAndUpdate(req.params.id, newGenre, (err, updatedGenre) => {
        if (err) {
            return next(err);
        }

        res.redirect(updatedGenre.url);
    })
}