const express = require('express');
const mongoose = require('mongoose');
//Model
const gameSchema = require('../models/game');

const router = express.Router();

run();
function run() {
    const game = new gameSchema({
        title: "Mario",
        developer: "Nintendo",
        release: 1998
    })
      // const user = new User({name: "Yungler", age: 21, email: "boloman@gmail.com"});
    game.save();
}
router.get('/', (req, res) => {
    res.render('game/game_list');
})

router
    .route('/:id')
    .get((req, res) => {
        res.send(`Your game id is ${req.params.id}`);
    })
    .post((req, res) => {
        res.send(`Your game id is ${req.params.id}`);
    })
    .delete((req, res) => {

    })




module.exports = router;