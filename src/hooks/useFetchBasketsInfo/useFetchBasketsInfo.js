import { useEffect, useState } from 'react';

import { fetchHomeBaskets } from '../../services/baskets';
import basketsImgs from '../../assets/basketsImgs';

const useFetchBasketsInfo = (initBaskets = []) => {
  const [baskets, setBaskets] = useState(initBaskets);

  useEffect(() => {
		const asyncFunc = async () => {
      let fetchedBaskets = await fetchHomeBaskets();
      // Set baskets images
      fetchedBaskets = fetchedBaskets.map(b => ({ ...b, img: basketsImgs[b.type] }));

			setBaskets([...fetchedBaskets]);
		};

		asyncFunc();
  }, []);

  return [baskets, setBaskets];
};

export default useFetchBasketsInfo;
