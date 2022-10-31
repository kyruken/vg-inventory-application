const express = require('express');
const mongoose = require('mongoose');
//Model
const gameSchema = require('../models/game');

const router = express.Router();

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