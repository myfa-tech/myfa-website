
import Axios from 'axios';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const fetchProducts = async ({ bestsellers, category }) => {
  let axios = Axios.create({
    baseURL: REACT_APP_BACKEND_URL,
  });

  let url = '/products?';

  if (!!bestsellers) {
    url += 'bestsellers=true&'
  }

  if (!!category) {
    url += `category=${category}`
  }

  const response = await axios.get(url);

  return response.data.products;
};

const fetchSingleProduct = async (productName) => {
  let axios = Axios.create({
    baseURL: REACT_APP_BACKEND_URL,
  });

  let url = `/products?name=${productName}`;

  const response = await axios.get(url);

  return response.data.product;
};

export { fetchProducts, fetchSingleProduct };
