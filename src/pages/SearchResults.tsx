import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

interface Movie {
    id: number;
    title: string;
}

const SearchResults: React.FC = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (query) {
            const fetchMovies = async () => {
                try {
                    const response = await axios.get(
                        `https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${query}`
                    );
                    setMovies(response.data.results);
                } catch (error) {
                    console.error("Error fetching search results", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchMovies();
        }
    }, [query]);

    if (loading) return <p className="p-4">Loading...</p>;
    if (!movies.length) return <p className="p-4">No results found for "{query}"</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Search Results for "{query}"</h2>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id} className="p-2 mb-2 bg-gray-800 text-white rounded-md">
                        {movie.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResults;
