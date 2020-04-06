import { useEffect, useState } from 'react';

import { fetchCustomBasket } from '../../services/baskets';
import basketsImgs, { foodImages } from '../../assets/basketsImgs';

const useFetchCustomBasket = (initBasket = {}) => {
  const [basket, setBasket] = useState(initBasket);

  useEffect(() => {
		const asyncFunc = async () => {
      let customBasket = await fetchCustomBasket();

      // Set basket images
      customBasket.img = basketsImgs[customBasket.type];
      customBasket.availableBases = customBasket.availableBases.map(base => ({ ...base, img: foodImages[base.id] }));
      customBasket.availableFruits = customBasket.availableFruits.map(fruit => ({ ...fruit, img: foodImages[fruit.id] }));
      customBasket.availableVeggies = customBasket.availableVeggies.map(veggie => ({ ...veggie, img: foodImages[veggie.id] }));
      customBasket.availableSauces = customBasket.availableSauces.map(sauce => ({ ...sauce, img: foodImages[sauce.id] }));
      customBasket.availableSupps = customBasket.availableSupps.map(supp => ({ ...supp, img: foodImages[supp.id] }));

			setBasket({ ...customBasket });
		};

		asyncFunc();
  }, []);

  return [basket, setBasket];
};

export default useFetchCustomBasket;
