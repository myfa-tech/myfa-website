import { useEffect, useState } from 'react';

import { fetchPleasureBaskets } from '../../services/baskets';
import { fetchPacks } from '../../services/baskets';
import getBasketImage from '../../utils/getBasketImage';

const useFetchOrderBaskets = (initBaskets = []) => {
  const [baskets, setBaskets] = useState(initBaskets);

  useEffect(() => {
		const asyncFunc = async () => {
      let fetchedBaskets = [];

      if (typeof window !== 'undefined') {
        if (window.location.pathname.includes('packs')) {
          fetchedBaskets = await fetchPacks();
        } else if (window.location.pathname.includes('baskets')) {
          fetchedBaskets = await fetchPleasureBaskets();
        }
      }

      // Set baskets images
      fetchedBaskets = fetchedBaskets.map(b => ({ ...b, img: getBasketImage(b.type) }));
			setBaskets([...fetchedBaskets]);
		};

		asyncFunc();
  }, []);

  return [baskets, setBaskets];
};

export default useFetchOrderBaskets;
