const async = require('async');
//Model
const gameSchema = require('../models/game');
const developerSchema = require('../models/developer');

exports.index = (req, res) => {

    async.parallel({
        games(callback){
            gameSchema.where("name")
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