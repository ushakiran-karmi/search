import axios from 'axios'; //[pause]

const api = axios.create({ //[pause]
  baseURL: 'https://api.themoviedb.org/3', //[pause]
  params: { //[pause]
    api_key: import.meta.env.VITE_TMDB_ACCESS_KEY, //[pause]
  }, //[pause]
  headers: { //[pause]
    'Content-Type': 'application/json', //[pause]
  }, //[pause]
}); //[pause]

export const getPopularMovies = () => api.get('/movie/popular'); //[pause]

export const getTrendingMovies = () => api.get('/trending/movie/day'); //[pause]

export default api; //[pause]