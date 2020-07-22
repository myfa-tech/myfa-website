import { useState, useEffect } from 'react';
import { fetchSingleProduct } from '../../services/products';

const useFetchProductInfo = (init = {}) => {
  const [product, setProduct] = useState(init);

  useEffect(() => {
    const asyncFunc = async () => {
      let productName = window.location.pathname.split('/products/')[1];
      let fetchedProduct = await fetchSingleProduct(productName);
      setProduct({ ...fetchedProduct });
    };

    asyncFunc();
  }, []);

  return [product, setProduct];
};

export default useFetchProductInfo;
