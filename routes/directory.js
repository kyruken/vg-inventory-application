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

router.get('/game_update/:id', gameController.game_update_get);
router.post('/game_update/:id', gameController.game_update_post);


router.get('/developers', developerController.index);
router.get('/developer/:id', developerController.developer_detail_get);

router.get('/developer_form/create', developerController.developer_form_get);
router.post('/developer_form/create', developerController.developer_form_post);

router.get('/developer_delete/:id', developerController.developer_delete_get);
router.post('/developer_delete/:id', developerController.developer_delete_post);

router.get('/developer_update/:id', developerController.developer_update_get);
router.post('/developer_update/:id', developerController.developer_update_post);

router.get('/genres', genreController.index);


module.exports = router;