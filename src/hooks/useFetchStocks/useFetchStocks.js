
import { useEffect, useState } from 'react';

import { fetchStocks } from '../../services/stocks';

const useFetchStocks = (init = []) => {
  const [stocks, setStocks] = useState(init);

  useEffect(() => {
    const fetchData = async () => {
      // const fetchedStocks = await fetchStocks();

      // setStocks(fetchedStocks);
      setStocks([
        { label: 'carots', need: 2, have: 3 },
        { label: 'cucumber', need: 20, have: 3 },
        { label: 'cucumber', need: 9, have: 2 },
        { label: 'cucucscber', need: 18, have: 20 },
        { label: 'cucewmber', need: 5, have: 3 },
        { label: 'pomme de terre', need: 15, have: 3 },
      ]);
    };

    fetchData();
  }, []);

  return [stocks, setStocks];
};

export default useFetchStocks;
