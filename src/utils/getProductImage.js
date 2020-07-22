import images from '../assets/productsImgs';
import defaultImage from '../images/default-product.png';

const getProductImage = (productCode) => {
  return images[productCode] || defaultImage;
};

export default getProductImage;
