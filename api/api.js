import axios from "axios";
const url = "http://localhost:8080/api";
const apiKey = "41e467c96314188cd667403a3df5dddd";
const tmdbBaseUrl = "https://api.themoviedb.org/3";

const movieDetailsEndpoint = (movieId) =>
  tmdbBaseUrl + "/movie/" + movieId + "?language=en-US&api_key=" + apiKey;
const upcomingMoviesEndpoint =
  tmdbBaseUrl + "/movie/upcoming?language=en-US&api_key=" + apiKey;
const popularMoviesEndpoint =
  tmdbBaseUrl + "/movie/popular?language=en-US&api_key=" + apiKey;

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const postPaymentData = async (data) => {
  try {
    const response = await axios.post(`${url}/payment-details/`, data);
    return response.data;
  } catch (error) {
    console.error("Error occurred in postPaymentData:", error);

    return { error: error.message || "An error occurred" };
  }
};

export const saveBooking = async (data) => {
  try {
    const response = await axios.post(`${url}/bookings/`, data);
  } catch (error) {
    console.error("Error occurred in saveBooking:", error);

    return { error: error.message || "An error occurred" };
  }
};

export const getMovies = async () => {
  try {
    const response = await axios.get(`${url}/movies/`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getTheatersByMovieId = async (movieId) => {
  try {
    const response = await axios.get(`${url}/showtimes/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getShowtimesByTheaterIdAndMovieId = async (theaterId, movieId) => {
  try {
    const response = await axios.get(
      `${url}/showtimes/theater/${theaterId}/movie/${movieId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getSeatsByScreenId = async (screenId) => {
  try {
    const response = await axios.get(`${url}/seats/screen/${screenId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSeatInfoByIds = async (seatIds) => {
  const queryString = seatIds.map((id) => `ids=${id}`).join("&");

  try {
    const response = await axios.get(`${url}/seats/ids?${queryString}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getSeatReservationInfoByShowtimeId = async (showtimeId) => {
  try {
    const response = await axios.get(
      `${url}/seat-reservations/showtime/${showtimeId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieDetails = (movieId) =>
  apiCall(movieDetailsEndpoint(movieId));

export const fetchUpcomingMovies = () => apiCall(upcomingMoviesEndpoint);

export const fetchPopularMovies = () => apiCall(popularMoviesEndpoint);
