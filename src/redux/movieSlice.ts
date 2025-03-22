import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../utils/api';

// Define the Movie and Genre types
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number | null;
}

interface Genre {
  id: number;
  name: string;
}

interface MovieState {
  popularMovies: Movie[];
  trendingMovies: Movie[];
  searchResults: Movie[];
  watchlist: Movie[];
  genres: Genre[];
  genreMovies: Movie[];
  selectedGenre: Genre | null;
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  popularMovies: [],
  trendingMovies: [],
  searchResults: [],
  watchlist: [],
  genres: [],
  genreMovies: [],
  selectedGenre: null,
  loading: false,
  error: null,
};

// Async actions using createAsyncThunk
export const fetchGenres = createAsyncThunk<Genre[]>(
  'movies/fetchGenres',
  async () => {
    const response = await api.get('/genre/movie/list');
    return response.data.genres;
  }
);

export const searchMoviesAsync = createAsyncThunk<Movie[], string>(
  'movies/search',
  async (query) => {
    const response = await api.get(`/search/movie?query=${query}`);
    return response.data.results;
  }
);

export const fetchPopularMovies = createAsyncThunk<Movie[]>(
  'movies/fetchPopularMovies',
  async () => {
    const response = await api.get('/movie/popular');
    return response.data.results;
  }
);

export const fetchTrendingMovies = createAsyncThunk<Movie[]>(
  'movies/fetchTrendingMovies',
  async () => {
    const response = await api.get('/trending/movie/week');
    return response.data.results;
  }
);

export const fetchMoviesByGenre = createAsyncThunk<Movie[], number>(
  'movies/fetchMoviesByGenre',
  async (genreId) => {
    const response = await api.get(`/discover/movie?with_genres=${genreId}`);
    return response.data.results;
  }
);

// Slice definition
const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addToWatchlist: (state, action: PayloadAction<Movie>) => {
      if (!state.watchlist.find((movie) => movie.id === action.payload.id)) {
        state.watchlist.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<Movie>) => {
      state.watchlist = state.watchlist.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
    setSelectedGenre: (state, action: PayloadAction<Genre>) => {
      state.selectedGenre = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch genres
      .addCase(fetchGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.loading = false;
        state.genres = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch genres';
      })
      // Fetch popular movies
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popularMovies = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch popular movies';
      })
      // Fetch trending movies
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.trendingMovies = action.payload;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch trending movies';
      })
      // Search movies
      .addCase(searchMoviesAsync.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      })
      // Fetch movies by genre
      .addCase(fetchMoviesByGenre.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        state.loading = false;
        state.genreMovies = action.payload;
      })
      .addCase(fetchMoviesByGenre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movies by genre';
      });
  },
});

// Export actions and reducer
export const { addToWatchlist, removeFromWatchlist, setSelectedGenre } =
  movieSlice.actions;

export default movieSlice.reducer;
