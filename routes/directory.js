const express = require('express');
const mongoose = require('mongoose');

const gameController = require('../controllers/gameController');
const developerController = require('../controllers/developerController');
const genreController = require('../controllers/genreController');

const router = express.Router();

router.get('/', gameController.index);
router.get('/developers', developerController.index);
router.get('/genres', genreController.index);


module.exports = router;