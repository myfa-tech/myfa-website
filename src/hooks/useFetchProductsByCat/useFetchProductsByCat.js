import { useState, useEffect } from 'react';
import { fetchProducts } from '../../services/products';

const useFetchProductsByCat = (category) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const asyncFunc = async () => {
      let fetchedProducts = await fetchProducts({ category });
      setProducts([...fetchedProducts]);
    };

    asyncFunc();
  }, []);

  return [products, setProducts];
};

export default useFetchProductsByCat;
