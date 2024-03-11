import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const options = {
 headers: {
 Authorization:
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWZhNjQyYjg4ZmE2N2YzNTYzNGMyOWUwMmRlZjkyZCIsInN1YiI6IjY1ZWVlMGNhZTcyZmU4MDE4NTVjNWY0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WcoELXVOlEDwKSpkYHGcy-9SLPh6msOLpCyXyRaYI4Y'
 }
};

export const getMovies = async () => {
    const url = 'trending/movie/day?language=en-US';
  const response = await axios.get(url, options);
  
  return response.data;
};

export const getMovieById = async (movieId) => {
    const url = `/movie/${movieId}?language=en-US`;
    const response = await axios.get(url, options);
    return response.data;
  };

  export const getCast = async movieId => {
    const url = `/movie/${movieId}/credits?language=en-US`;
    const response = await axios.get(url, options);
    return response.data.cast;
  };
  
  export const getReviews = async movieId => {
    const url = `/movie/${movieId}/reviews?language=en-US&page=1`;
    const response = await axios.get(url, options);
    return response.data.results;
  };
  
  export const getMoviesSearch = async moviesFilter => {
    const url = `/search/movie?query=${moviesFilter}&include_adult=false&language=en-US&page=1`;
    const response = await axios.get(url, options);
    return response.data.results;
  };