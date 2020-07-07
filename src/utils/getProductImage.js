import images from '../assets/productsImgs';
import defaultImage from '../images/default-basket.png';

const getProductImage = (productCode) => {
  return images[productCode] || defaultImage;
};

export default getProductImage;
