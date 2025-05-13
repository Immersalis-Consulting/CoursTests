import axios from 'axios';

const API_URL = 'https://localhost:7043/api/songs';

export const getAllSongs = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getSongById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createSong = async (song) => {
    const response = await axios.post(API_URL, song);
    return response.data;
};

export const updateSong = async (id, song) => {
    const response = await axios.put(`${API_URL}/${id}`, song);
    return response.data;
};

export const deleteSong = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};