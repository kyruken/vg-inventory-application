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

//developer routes
router.get('/developers', developerController.index);
router.get('/developer/:id', developerController.developer_detail_get);

router.get('/developer_form/create', developerController.developer_form_get);
router.post('/developer_form/create', developerController.developer_form_post);

router.get('/developer_delete/:id', developerController.developer_delete_get);
router.post('/developer_delete/:id', developerController.developer_delete_post);

router.get('/developer_update/:id', developerController.developer_update_get);
router.post('/developer_update/:id', developerController.developer_update_post);

//genre routes
router.get('/genres', genreController.index);
router.get('/genre/:id', genreController.genre_detail_get);

router.get('/genre_form/create', genreController.genre_form_get);
router.post('/genre_form/create', genreController.genre_form_post);

router.get('/genre_delete/:id', genreController.genre_delete_get);
router.post('/genre_delete/:id', genreController.genre_delete_post);

router.get('/genre_update/:id', genreController.genre_update_get);
router.post('/genre_update/:id', genreController.genre_update_post);


module.exports = router;