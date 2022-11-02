const express = require('express');
const mongoose = require('mongoose');

const gameController = require('../controllers/gameController');
const developerController = require('../controllers/developerController');
const genreController = require('../controllers/genreController');

const router = express.Router();

//game routes
router.get('/', gameController.index);
router.get('/game/:id', gameController.game_detail_get);

router.get('/game_form/create', gameController.game_form_get);
router.post('/game_form/create', gameController.game_form_post);

router.get('/game_delete/:id', gameController.game_delete_get);
router.post('/game_delete/:id', gameController.game_delete_post);



router.get('/developers', developerController.index);
router.get('/genres', genreController.index);


module.exports = router;