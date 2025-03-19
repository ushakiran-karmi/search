import React from 'react';
import { Card, CardContent, Typography, CardMedia, Box, IconButton } from '@mui/material';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../redux/movieSlice';

// Define the Movie type based on the data structure expected
interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number | null;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const dispatch = useDispatch();

  // Access watchlist state from Redux store
  const watchlist = useSelector((state: any) => state.movies.watchlist);
  const isInWatchlist = watchlist.some((m: Movie) => m.id === movie.id);

  // Handle click for adding/removing movie from watchlist
  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWatchlist) {
      dispatch(removeFromWatchlist({ ...movie, poster_path: movie.poster_path || '' }));
    } else {
      dispatch(addToWatchlist({ ...movie, poster_path: movie.poster_path || '' }));
    }
  };

  // Fallback image when poster_path is null or empty
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        boxShadow: 3,
        borderRadius: 2,
        overflow: 'hidden',
        height: '100%',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
        },
        position: 'relative',
      }}
    >
      <CardMedia
        component="img"
        image={imageUrl}
        alt={movie.title}
        sx={{
          height: 350,
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
