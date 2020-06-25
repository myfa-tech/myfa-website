
import { useEffect, useState } from 'react';

import { fetchAllBaskets } from '../../services/baskets';
import basketsImgs from '../../assets/basketsImgs';

const useFetchAllBasketsInfos = (initBaskets = []) => {
  const [baskets, setBaskets] = useState(initBaskets);

  useEffect(() => {
		const asyncFunc = async () => {
      let fetchedBaskets = await fetchAllBaskets();

      // Set baskets images
      fetchedBaskets = fetchedBaskets.map(b => ({ ...b, img: basketsImgs[b.type] }));

			setBaskets([...fetchedBaskets]);
		};

    asyncFunc();
  });

  return [baskets, setBaskets];
};

export default useFetchAllBasketsInfos;
