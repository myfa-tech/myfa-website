import images from '../assets/productsImgs';
import defaultImage from '../images/default-product.png';

const getProductDetailsImage = (productImgName) => {
  return images[productImgName] || defaultImage;
};

export default getProductDetailsImage;
