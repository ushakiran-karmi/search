import React from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Container, Typography, Button } from '@mui/material'; 
import { RootState } from '../redux/store'; 
import { removeFromWatchlist } from '../redux/movieSlice';
import MovieCard from '../components/MovieCard'; 

const Watchlist: React.FC = () => { 
const dispatch = useDispatch(); 
const watchlist = useSelector((state: RootState) => state.movies.watchlist);

const handleRemoveFromWatchlist = (movieId: number) => { 
  const movieToRemove = watchlist.find((movie) => movie.id === movieId); 
  if (movieToRemove) { 
    dispatch(removeFromWatchlist(movieToRemove)); 
  } 
}; 

return ( 
  <Container sx={{ py: 4 }}> 
    <Typography variant="h4" gutterBottom>
      My Watchlist 
    </Typography>
    <Grid container spacing={3}> 
      {watchlist.length === 0 ? ( 
        <Typography variant="h6" color="textSecondary"> 
          Your watchlist is empty. 
        </Typography> 
      ) : ( 
        watchlist.map((movie) => ( 
          <Grid key={movie.id}> 
            <MovieCard movie={movie} /> 
            <Button 
              variant="contained"
              color="secondary" 
              onClick={() => handleRemoveFromWatchlist(movie.id)} 
              sx={{ mt: 2 }}
            > 
              Remove from Watchlist 
            </Button> 
          </Grid> 
        )) 
      )} 
    </Grid> 
  </Container> 
); 
}; 

export default Watchlist; 