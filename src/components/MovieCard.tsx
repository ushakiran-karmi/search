import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  IconButton,
} from '@mui/material';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../redux/movieSlice';
import { useNavigate } from 'react-router-dom';

// Define the Movie type based on the data structure expected
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number | null;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access watchlist state from Redux store
  const watchlist = useSelector((state: any) => state.movies.watchlist);
  const isInWatchlist = watchlist.some((m: Movie) => m.id === movie.id);

  // Handle click for adding/removing movie from watchlist
  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from triggering the card's onClick
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie));
    } else {
      dispatch(addToWatchlist(movie));
    }
  };

  // Handle navigation to movie details page
  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`); // Navigate to the MovieDetails page with the movie ID
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        boxShadow: 3,
        borderRadius: 2,
        overflow: 'hidden',
        height: 'auto',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
        },
        position: 'relative',
      }}
      onClick={handleCardClick} // Navigate to MovieDetails on card click
    >
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        sx={{
          height: 250,
          objectFit: 'cover',
          width: '100%',
        }}
      />
      <CardContent sx={{ flexGrow: 1, padding: 2 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
            fontSize: '1.1rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {movie.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: '0.875rem' }}
          >
            Rating: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10
          </Typography>
        </Box>
      </CardContent>

      {/* Watchlist Icon */}
      <IconButton
        onClick={handleWatchlistClick}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: isInWatchlist ? 'primary.main' : 'text.secondary',
        }}
      >
        {isInWatchlist ? <Bookmark /> : <BookmarkBorder />}
      </IconButton>
    </Card>
  );
};

export default MovieCard;

