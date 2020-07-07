import images from '../assets/basketsImgs';
import defaultImage from '../images/default-basket.png';

const getBasketImage = (basketType) => {
  return images[basketType] || defaultImage;
};

export default getBasketImage;
