
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItemButton, ListItemText, Typography, Box } from '@mui/material';
import { fetchGenres, fetchMoviesByGenre, setSelectedGenre } from '../redux/movieSlice';
import type { AppDispatch } from '../redux/store';

// Define the Genre type for better type safety
interface Genre {
  id: number;
  name: string;
}


const GenreDrawer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const genres = useSelector((state: any) => state.movies.genres); // `any` is used here for simplicity, replace with RootState
  const selectedGenre = useSelector((state: any) => state.movies.selectedGenre); // Same here, replace with RootState

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const handleGenreClick = (genre: Genre) => {
    dispatch(setSelectedGenre(genre));
    dispatch(fetchMoviesByGenre(genre.id)); // Fetch movies by selected genre
  };

  return (
    <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
      <Typography variant="h6">Genres</Typography>
      <List>
        {genres.map((genre: Genre) => (
          <ListItemButton
            key={genre.id}
            selected={selectedGenre?.id === genre.id}
            onClick={() => handleGenreClick(genre)}
          >
            <ListItemText primary={genre.name} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default GenreDrawer;
