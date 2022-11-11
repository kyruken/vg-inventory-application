const async = require('async');
const {body, validationResult } = require('express-validator');
//Model
const Game = require('../models/game');
const Developer = require('../models/developer');
const Genre = require('../models/genre');
const { findByIdAndUpdate } = require('../models/game');
exports.index = (req, res) => {

    async.parallel({
        games(callback){
            Game.where("name")
            .populate("developer")
            .populate("genre")
            .exec(callback);
        },
    }, (err, results) => {
        if(err) {
            return next(err);
        }
        res.render('./game/game_list', {
            games: results.games
        });

    })
}

exports.game_detail_get = (req, res) => {
    Game.where('_id')
    .equals(req.params.id)
    .populate('developer')
    .populate('genre')
    .exec((err, result) => {
        if(err) {
            return next(err);
        }
        res.render('./game/game_detail', {game: result[0]})
    })
}

exports.game_form_get = (req, res) => {
    //we need to get all developers
    //all genres
    async.parallel({
        developers(callback) {
            Developer.find({})
            .select('name')
            .exec(callback);

        },
        genres(callback) {
            Genre.find({})
            .select('name')
            .exec(callback);
        },
    }, (err, result) => {
        if(err) {
            return next(err);
        }
        res.render('./game/game_form', 
        {developers: result.developers,
         genres: result.genres,
         name: "Add a game"
        });
    })
}

exports.game_form_post = [
    (req, res, next) => {
        if(!Array.isArray(req.body.genre)) {
            req.body.genre = typeof req.body.genre === "undefined" ? [] : [req.body.genre];
        }
        next();
    }, 

    body("title", "Title must not be empty")
    .trim()
    .isLength({min: 1, max: 46})
    .escape(),
    body("description", "Description must not be empty")
    .trim()
    .isLength({max: 256})
    .escape(),
    body("developer", "Developer must not be empty")
    .trim()
    .isLength({min: 1})
    .escape(),
    body("esrb").escape(),
    body("genre.*").escape(),
    body("release", "Invalid release date")
    .isISO8601()
    .toDate(),
    
    (req, res, next) => {

        const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
            // Build your resulting errors however you want! String, object, whatever - it works!
            return `* ${msg} *`;
          };

        const errors = validationResult(req).formatWith(errorFormatter);
        
        if(!errors.isEmpty()) {
            //if theres errors, reload the form page again with all the dev and genre data
            async.parallel({
                developers(callback) {
                    Developer.find({})
                    .select('name')
                    .exec(callback);
        
                },
                genres(callback) {
                    Genre.find({})
                    .select('name')
                    .exec(callback);
                },
            }, (err, result) => {
                if(err) {
                    return next(err);
                }
                res.render('./game/game_form', 
                {developers: result.developers,
                 genres: result.genres,
                 name: "Add a game",
                 message: "Failed to add game to database",
                 error: errors.array()
                });
            })
            return;
        }

        const newGame = new Game({
            title: req.body.title,
            description: req.body.description,
            developer: req.body.developer,
            esrb: req.body.esrb,
            genre: req.body.genre,
            release: req.body.release,
            price: req.body.price,
            picture: req.body.picture
        })

        newGame.save((err) => {
            if (err) {
                return next(err);
            }
            //success then redirect to new game 
            res.redirect(newGame.url);
        })
    }
]

exports.game_delete_get = (req, res, next) => {
    Game.findById(req.params.id, (err, result) => {
        if (err) {
            return next(err);
        }
        res.render('./game/game_delete', {game: result});
    })
}

exports.game_delete_post = (req, res) => {
    Game.findByIdAndDelete(req.params.id, (err) => {
        res.redirect("/");
    })
}

exports.game_update_get = (req, res) => {
    async.parallel(
        {
            game(callback) {
                Game.findById(req.params.id)
                .populate("developer")
                .populate("genre")
                .exec(callback);
            },
            developers(callback) {
                Developer.find({})
                .select("name")
                .exec(callback);
                
            },

            genres(callback) {
                Genre.find({})
                .select("name")
                .exec(callback);
            }
        }, (err, result) => {

            for(let x = 0; x < result.genres.length; x++) {
                for (let y = 0; y < result.game.genre.length; y++) {
                    if (result.game.genre[y]._id.toString() == result.genres[x]._id.toString()) {
                        result.genres[x].checked = true;
                    }
                }
            }

            res.render(`./game/game_form`, {
                developers: result.developers, 
                genres: result.genres,
                game: result.game, 
                name: "Update game"});
        }
    )

    
}

exports.game_update_post = (req, res, next) => {
    /* Maybe add field validations later on? */

    const newGame = new Game({
        title: req.body.title,
        description: req.body.description,
        developer: req.body.developer,
        esrb: req.body.esrb,
        genre: typeof req.body.genre === "undefined" ? [] : req.body.genre,
        release: req.body.release,
        picture: req.body.picture,
        _id: req.params.id
    });

    Game.findByIdAndUpdate(req.params.id, newGame, (err, updatedGame) => {
        if(err) {
            return next(err);
        }
        res.redirect(updatedGame.url);
    })
}