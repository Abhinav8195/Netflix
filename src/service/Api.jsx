// src/services/api.js

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export async function fetchMovies() {
    try {
        const response = await fetch(`${API_BASE_URL}/movies`);
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}
