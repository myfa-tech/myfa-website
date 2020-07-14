
import { useEffect, useState } from 'react';

import { fetchAllBaskets } from '../../services/baskets';
import getBasketImage from '../../utils/getBasketImage';

const useFetchAllBasketsInfos = (initBaskets = []) => {
  const [baskets, setBaskets] = useState(initBaskets);

  useEffect(() => {
		const asyncFunc = async () => {
      let fetchedBaskets = await fetchAllBaskets();

      // Set baskets images
      fetchedBaskets = fetchedBaskets.map(b => ({ ...b, img: getBasketImage(b.type) }));

			setBaskets([...fetchedBaskets]);
		};

    asyncFunc();
  }, []);

  return [baskets, setBaskets];
};

export default useFetchAllBasketsInfos;
