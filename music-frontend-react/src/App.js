import React, { useState } from 'react';
import SongList from './components/SongList';
import SongForm from './components/SongForm';

function App() {
    const [selectedSong, setSelectedSong] = useState(null);

    const handleEdit = (song) => {
        setSelectedSong(song); // Définir la chanson sélectionnée pour modification
    };

    const handleSave = () => {
        setSelectedSong(null); // Réinitialiser après l'enregistrement
    };

    return (
        <div>
            <h1>Gestion des Chansons</h1>
            <SongForm selectedSong={selectedSong} onSave={handleSave} />
            <SongList onEdit={handleEdit} />
        </div>
    );
}

export default App;