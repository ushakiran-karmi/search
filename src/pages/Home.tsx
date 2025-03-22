import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography } from '@mui/material';
import { fetchPopularMovies, fetchTrendingMovies, fetchMoviesByGenre } from '../redux/movieSlice';
import Loading from '../components/Loading';
import MovieCard from '../components/MovieCard';
import { AppDispatch, RootState } from '../redux/store'; // Import AppDispatch

// Ensure the Movie type matches the one defined in the reducer
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview?: string;
  release_date?: string;
  vote_average: number | null; // Updated to match the reducer
}

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    popularMovies,
    trendingMovies,
    genreMovies,
    selectedGenre,
    loading,
  } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (selectedGenre) {
      dispatch(fetchMoviesByGenre(selectedGenre.id));
    } else {
      dispatch(fetchPopularMovies());
      dispatch(fetchTrendingMovies());
    }
  }, [dispatch, selectedGenre]);

  if (loading) {
    return <Loading message="Fetching movies..." />;
  }

  console.log('Genre Movies:', genreMovies); // Debugging line to check the data

  // Render movies by genre
  if (selectedGenre) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          {selectedGenre.name} Movies
        </Typography>
        <Grid container spacing={3}>
          {genreMovies.map((movie: Movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  // Render popular and trending movies
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Popular Movies
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {popularMovies.slice(0, 6).map((movie: Movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" gutterBottom>
        Trending Now
      </Typography>
      <Grid container spacing={3}>
        {trendingMovies.slice(0, 6).map((movie: Movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;