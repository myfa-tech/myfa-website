
import { useEffect, useState } from 'react';

import { fetchStocks } from '../../services/stocks';

const useFetchStocks = (init = []) => {
  const [stocks, setStocks] = useState(init);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedStocks = await fetchStocks();

      setStocks(fetchedStocks);
    };

    fetchData();
  }, []);

  return [stocks, setStocks];
};

export default useFetchStocks;
