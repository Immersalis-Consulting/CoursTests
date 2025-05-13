const Song = require('../Models/songModel');

exports.getAllSongs = (req, res) => {
    Song.getAll((err, songs) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(songs);
    });
};

exports.getSongById = (req, res) => {
    const id = req.params.id;
    Song.getById(id, (err, song) => {
        if (err) res.status(500).json({ error: err.message });
        else if (!song) res.status(404).json({ message: 'Chanson non trouvée' });
        else res.json(song);
    });
};

exports.createSong = (req, res) => {
    const newSong = req.body;
    Song.create(newSong, (err, song) => {
        if (err) res.status(500).json({ error: err.message });
        else res.status(201).json(song);
    });
};

exports.updateSong = (req, res) => {
    const id = req.params.id;
    const updatedSong = req.body;
    Song.update(id, updatedSong, (err, song) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(song);
    });
};

exports.deleteSong = (req, res) => {
    const id = req.params.id;
    Song.delete(id, (err, result) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(result);
    });
};
