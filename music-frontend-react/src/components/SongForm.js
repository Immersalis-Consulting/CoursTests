import React, { useState, useEffect } from 'react';
import { createSong, updateSong } from '../api/api';

const SongForm = ({ selectedSong, onSave }) => {
    const [song, setSong] = useState({ name: '', band: '', indexAlbum: 1, key: '' });

    useEffect(() => {
        if (selectedSong) {
            setSong(selectedSong); // Charger les données de la chanson sélectionnée
        } else {
            setSong({ name: '', band: '', indexAlbum: 1, key: '' });
        }
    }, [selectedSong]);

    const handleChange = (e) => {
        setSong({ ...song, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (song.id) {
                await updateSong(song.id, song); // Mise à jour si l'ID est présent
            } else {
                await createSong(song); // Création si l'ID est absent
            }
            onSave();
            setSong({ name: '', band: '', indexAlbum: 1, key: '' });
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de la chanson:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{song.id ? 'Modifier la chanson' : 'Ajouter une chanson'}</h2>
            <input
                name="name"
                placeholder="Nom"
                value={song.name}
                onChange={handleChange}
            />
            <input
                name="band"
                placeholder="Groupe"
                value={song.band}
                onChange={handleChange}
            />
            <input
                name="indexAlbum"
                type="number"
                placeholder="Index Album"
                value={song.indexAlbum}
                onChange={handleChange}
            />
            <input
                name="key"
                placeholder="Clé"
                value={song.key}
                onChange={handleChange}
            />
            <button type="submit">{song.id ? 'Mettre à jour' : 'Ajouter'}</button>
        </form>
    );
};

export default SongForm;