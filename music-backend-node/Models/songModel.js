const db = require('../Database/db');

class Song {
    static getAll(callback) {
        db.query('SELECT * FROM songs', (err, results) => {
            if (err) callback(err, null);
            else callback(null, results);
        });
    }

    static getById(id, callback) {
        db.query('SELECT * FROM songs WHERE Id = ?', [id], (err, results) => {
            if (err) callback(err, null);
            else callback(null, results[0]);
        });
    }

    static create(song, callback) {
        const { Name, Band, IndexAlbum, Key } = song;
        db.query('INSERT INTO songs (Name, Band, IndexAlbum, Key) VALUES (?, ?, ?, ?)',
            [Name, Band, IndexAlbum, Key],
            (err, results) => {
                if (err) callback(err, null);
                else callback(null, { id: results.insertId, ...song });
            });
    }

    static update(id, song, callback) {
        const { Name, Band, IndexAlbum, Key } = song;
        db.query('UPDATE songs SET Name = ?, Band = ?, IndexAlbum = ?, Key = ? WHERE Id = ?',
            [Name, Band, IndexAlbum, Key, id],
            (err, results) => {
                if (err) callback(err, null);
                else callback(null, { id, ...song });
            });
    }

    static delete(id, callback) {
        db.query('DELETE FROM songs WHERE Id = ?', [id], (err, results) => {
            if (err) callback(err, null);
            else callback(null, { message: 'Chanson supprimée' });
        });
    }
}

module.exports = Song;
