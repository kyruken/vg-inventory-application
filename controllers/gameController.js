const async = require('async');
//Model
const Game = require('../models/game');
const developerSchema = require('../models/developer');

exports.index = (req, res) => {
    
    async.parallel({
        games(callback){
            Game.where("name")
            .populate("developer")
            .populate("genre")
            .exec(callback);
        },
    }, (err, results) => {
        if (err) throw err;

        console.log(results);
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
        console.log(result);
        res.render('./game/game_detail', {game: result[0]})
    })
}

exports.game_form_get = (req, res) => {
    res.render('./game/game_form')
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