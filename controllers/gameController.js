//Model
const gameSchema = require('../models/game');

exports.index = (req, res) => {
    res.render('./game/game_list');
}