import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Chip,
  Rating,
} from '@mui/material';
import api from '../utils/api'; // Ensure this points to your API utility
import Loading from '../components/Loading'; // Ensure this component exists and is correctly implemented

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

interface Actor {
  id: number;
  name: string;
}

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Type for route parameters
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<Actor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieRes, creditsRes] = await Promise.all([
          api.get(`/movie/${id}`),
          api.get(`/movie/${id}/credits`),
        ]);
        setMovie(movieRes.data);
        setCast(creditsRes.data.cast.slice(0, 10));
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };
    fetchData();
  }, [id]);

  if (!movie) {
    return <Loading />;
  }

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h3" gutterBottom>
            {movie.title}
          </Typography>
          <Rating value={movie.vote_average / 2} readOnly />
          <Typography paragraph>{movie.overview}</Typography>
          <Typography>Release Date: {movie.release_date}</Typography>
          <Box mt={2}>
            {cast.map((actor) => (
              <Chip
                key={actor.id}
                label={actor.name}
                sx={{ margin: '4px' }}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MovieDetails;
