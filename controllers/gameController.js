const async = require('async');
//Model
const Game = require('../models/game');
const Developer = require('../models/developer');
const Genre = require('../models/genre');
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
        {result: result,
         name: "Add a game"
        });
    })
}

exports.game_form_post = (req, res) => {
    res.render('./game/game_form')
}

exports.game_delete_get = (req, res) => {
    res.render('./game/game_delete')
}

exports.game_delete_post = (req, res) => {
    res.render('./game/game_delete')
}