import { useState, useEffect } from 'react';
import { fetchProducts } from '../../services/products';

const useFetchBestsellersProducts = (init = []) => {
  const [products, setProducts] = useState(init);

  useEffect(() => {
    const asyncFunc = async () => {
      let fetchedProducts = await fetchProducts({ bestsellers: true });
      setProducts([...fetchedProducts]);
    };

    asyncFunc();
  }, []);

  return [products, setProducts];
};

export default useFetchBestsellersProducts;
