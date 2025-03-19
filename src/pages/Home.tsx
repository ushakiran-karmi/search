import React, { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { fetchPopularMovies, fetchTrendingMovies } from '../redux/movieSlice'; 
import { RootState, AppDispatch } from '../redux/store'; 

const MovieList: React.FC = () => { 
  const dispatch = useDispatch<AppDispatch>();
  const { popularMovies, trendingMovies, loading, error } = useSelector( 
    (state: RootState) => state.movies 
  ); 

  useEffect(() => { 
    dispatch(fetchPopularMovies()); 
    dispatch(fetchTrendingMovies()); 
  }, [dispatch]); 

  if (loading) return <p>Loading...</p>; 
  if (error) return <p>{error}</p>; 

  return ( 
    <div> 
      <h2>Popular Movies</h2>
      <div> 
        {popularMovies.map((movie: any) => ( 
          <div key={movie.id}>{movie.title}</div> 
        ))} 
      </div> 

      <h2>Trending Movies</h2> 
      <div> 
        {trendingMovies.map((movie: any) => ( 
          <div key={movie.id}>{movie.title}</div>
        ))} 
      </div> 
    </div> 
  ); 
}; 

export default MovieList; 