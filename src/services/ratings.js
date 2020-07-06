
import Axios from 'axios';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const fetchRatings = async (ratingsPerPage = 10, pageNumber = 1) => {
  let axios = Axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });

  let query = `?size=${ratingsPerPage}&page=${pageNumber}`;

  const result = await axios.get(`/ratings${query}`);

  return result.data;
};

const saveRating = async (rating) => {
  try {
    await Axios.post(`${REACT_APP_BACKEND_URL}/ratings`, rating);
  } catch(e) {
    console.log(e);
  }
};

export { fetchRatings, saveRating };
