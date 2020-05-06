
import { useEffect, useState } from 'react';

import { fetchStocks, editStock } from '../../services/stocks';

const useFetchStocks = (init = []) => {
  const [stocks, setStocks] = useState(init);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedStocks = await fetchStocks();

      setStocks(fetchedStocks);
    };

    fetchData();
  }, []);

  const editStocks = async (stocks, stock) => {
    setStocks(stocks);
    editStock(stock);
  };

  return [stocks, editStocks];
};

export default useFetchStocks;
