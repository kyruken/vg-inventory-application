const async = require('async');
const developer = require('../models/developer');

//Model
const Developer = require('../models/developer');
const Game = require('../models/game');

exports.index = (req, res) => {
    Developer.find()
        .exec((err, developers) => {
            res.render('./developer/developer_list', { developers });

        })
}

exports.developer_detail_get = (req, res) => {
    async.parallel(
        {
            games(callback) {
                Game.where("developer")
                    .equals(req.params.id)
                    .where("title")
                    .exec(callback);
            },
            developer(callback) {
                Developer.findById(req.params.id)
                .exec(callback);
            }
        }, (err, data) => {
            console.log(data);
            res.render('./developer/developer_detail', { 
                games: data.games,
                developer: data.developer
             });
        })
}