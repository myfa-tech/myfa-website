import { useEffect, useState } from 'react';

import { fetchActiveBaskets } from '../../services/baskets';
import basketsImgs from '../../assets/basketsImgs';

const useFetchActiveBasketsInfo = (initBaskets = []) => {
  const [baskets, setBaskets] = useState(initBaskets);

  useEffect(() => {
		const asyncFunc = async () => {
      let fetchedBaskets = await fetchActiveBaskets();
      // Set baskets images
      fetchedBaskets = fetchedBaskets.map(b => ({ ...b, img: basketsImgs[b.type] }));

			setBaskets([...fetchedBaskets]);
		};

		asyncFunc();
  }, []);

  return [baskets, setBaskets];
};

export default useFetchActiveBasketsInfo;
