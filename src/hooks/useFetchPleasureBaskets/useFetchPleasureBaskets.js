import { useEffect, useState } from 'react';

import { fetchPleasureBaskets } from '../../services/baskets';
import getBasketImage from '../../utils/getBasketImage';

const useFetchPleasureBaskets = (initBaskets = []) => {
  const [baskets, setBaskets] = useState(initBaskets);

  useEffect(() => {
		const asyncFunc = async () => {
      let fetchedBaskets = await fetchPleasureBaskets();
      // Set baskets images
      fetchedBaskets = fetchedBaskets.map(b => ({ ...b, img: getBasketImage(b.type) }));

			setBaskets([...fetchedBaskets]);
		};

		asyncFunc();
  }, []);

  return [baskets, setBaskets];
};

export default useFetchPleasureBaskets;
