const express = require('express');
const router = express.Router();
const songController = require('../Controllers/songController');

router.get('/songs', songController.getAllSongs);
router.get('/songs/:id', songController.getSongById);
router.post('/songs', songController.createSong);
router.put('/songs/:id', songController.updateSong);
router.delete('/songs/:id', songController.deleteSong);

module.exports = router;