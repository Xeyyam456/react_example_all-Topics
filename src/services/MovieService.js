import axios from 'axios';

const API_KEY  = '8b0a0cf0';
const BASE_URL = 'https://www.omdbapi.com';

async function get(params) {
  const res = await axios.get(BASE_URL, 
    { params: { ...params, apikey: API_KEY } });
    
  if (res.data.Response === 'False') throw new Error(res.data.Error);
  return res.data;
}

const MovieService = {
  searchByYear: (year) =>
    get({ s: 'love', y: year, type: 'movie' }),

  getById: (imdbID) =>
    get({ i: imdbID, plot: 'full' }),
};

export default MovieService;
