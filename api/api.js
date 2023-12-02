import axios from 'axios';
const url = 'http://localhost:8080/api';
const apiKey = '41e467c96314188cd667403a3df5dddd'
const tmdbBaseUrl = 'https://api.themoviedb.org/3'

const movieDetailsEndpoint =  movieId => tmdbBaseUrl + '/movie/' + movieId + '?language=en-US&api_key=' + apiKey


const apiCall = async (endpoint , params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {},
    }

        try {
            const response = await axios.request(options)
            return response.data
        } catch (error) {
            console.log(error)
            return {}
        }
    }

export const getMovies = async () => {
    try {
        const response = await axios.get(`${url}/movies/`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const fetchMovieDetails = (movieId) => apiCall(movieDetailsEndpoint(movieId))