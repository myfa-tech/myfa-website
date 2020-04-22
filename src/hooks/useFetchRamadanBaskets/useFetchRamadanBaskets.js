import { useEffect, useState } from 'react';

import { fetchRamadanBaskets } from '../../services/baskets';
import basketsImgs from '../../assets/basketsImgs';

const useFetchRamadanBaskets = (initBaskets = []) => {
  const [baskets, setBaskets] = useState(initBaskets);

  useEffect(() => {
		const asyncFunc = async () => {
      let fetchedBaskets = await fetchRamadanBaskets();
      // Set baskets images
      fetchedBaskets = fetchedBaskets.map(b => ({ ...b, img: basketsImgs[b.type] }));

			setBaskets([...fetchedBaskets]);
		};

		asyncFunc();
  }, []);

  return [baskets, setBaskets];
};

export default useFetchRamadanBaskets;
