import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';



const options = {
 headers: {
	// Замість api_read_access_token вставте свій токен
 Authorization: 'Bearer api_read_access_token'
 }
};

const url = 'trending/movie/day?language=en-US';

export const getMovies = async () => {
  const response = await axios.get(url, options);
  console.log('JS response.data', response.data);
  return response.data;
};