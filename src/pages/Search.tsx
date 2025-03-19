import React, { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { useLocation } from 'react-router-dom';
import { Container, Typography, Grid } from '@mui/material'; 
import { searchMoviesAsync } from '../redux/movieSlice';
import MovieCard from '../components/MovieCard'; 
import Loading from '../components/Loading'; 
import { AppDispatch, RootState } from '../redux/store'; 


function useQuery() {
  return new URLSearchParams(useLocation().search); 
}

const Search: React.FC = () => {
  const query = useQuery();
  const searchQuery = query.get('q'); 
  const dispatch = useDispatch<AppDispatch>(); 
  const { searchResults, loading } = useSelector((state: RootState) => state.movies);

  
  useEffect(() => {
    if (searchQuery) {
      dispatch(searchMoviesAsync(searchQuery)); 
    }
  }, [dispatch, searchQuery]); 

  
  if (loading) {
    return (
      <Container sx={{ py: 4 } as any}>
        <Loading message="Searching movies..." />
      </Container>
    ); 
  }

  return (
    <Container sx={{ py: 4 } as any}>
      <Typography variant="h4" gutterBottom>
        Search Results for "{searchQuery}"
      </Typography>
      {searchResults.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No movies found. Please try a different search term.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {searchResults.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Search; 
