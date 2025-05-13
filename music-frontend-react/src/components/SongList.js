import React, { useState, useEffect } from 'react';
import { getAllSongs, deleteSong } from '../api/api';

const SongList = ({ onEdit }) => {
    const [songs, setSongs] = useState([]);

    // Charger les chansons depuis l'API au chargement du composant
    useEffect(() => {
        fetchSongs();
    }, []);

    // Récupérer les chansons depuis l'API
    const fetchSongs = async () => {
        try {
            const data = await getAllSongs();
            setSongs(data);
        } catch (error) {
            console.error("Erreur lors du chargement des chansons:", error);
        }
    };

    // Gérer la suppression d'une chanson
    const handleDelete = async (id) => {
        try {
            await deleteSong(id);
            fetchSongs(); // Rafraîchir la liste après suppression
        } catch (error) {
            console.error("Erreur lors de la suppression de la chanson:", error);
        }
    };

    // Gérer la modification d'une chanson
    const handleEdit = (song) => {
        onEdit(song);
    };

    // Retourner l'affichage du composant
    return (
        <div>
            <h2>Liste des chansons</h2>
            <ul>
                {songs.map((song) => (
                    <li key={song.id}>
                        {song.name} by {song.band} ({song.key})
                        <button onClick={() => handleEdit(song)}>Modifier</button>
                        <button onClick={() => handleDelete(song.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SongList;