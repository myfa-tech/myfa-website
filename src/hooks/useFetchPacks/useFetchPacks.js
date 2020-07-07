import { useEffect, useState } from 'react';

import { fetchPacks } from '../../services/baskets';
import getBasketImage from '../../utils/getBasketImage';

const useFetchPacks = (initBaskets = []) => {
  const [baskets, setBaskets] = useState(initBaskets);

  useEffect(() => {
		const asyncFunc = async () => {
      let fetchedBaskets = await fetchPacks();
      // Set baskets images
      fetchedBaskets = fetchedBaskets.map(b => ({ ...b, img: getBasketImage(b.type) }));

			setBaskets([...fetchedBaskets]);
		};

		asyncFunc();
  }, []);

  return [baskets, setBaskets];
};

export default useFetchPacks;
