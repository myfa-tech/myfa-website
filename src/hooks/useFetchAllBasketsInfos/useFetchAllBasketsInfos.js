
import { useEffect, useState } from 'react';

import { fetchRamadanBaskets, fetchHomeBaskets } from '../../services/baskets';
import basketsImgs from '../../assets/basketsImgs';

const useFetchAllBasketsInfos = (initBaskets = []) => {
  const [baskets, setBaskets] = useState(initBaskets);

  useEffect(() => {
		const asyncFunc = async () => {
      const result = await Promise.all([
        fetchRamadanBaskets(),
        fetchHomeBaskets(),
      ]);

      let fetchedBaskets = [...result[0], ...result[1]];

      // Set baskets images
      fetchedBaskets = fetchedBaskets.map(b => ({ ...b, img: basketsImgs[b.type] }));

			setBaskets([...fetchedBaskets]);
		};

    asyncFunc();
  });

  return [baskets, setBaskets];
};

export default useFetchAllBasketsInfos;
