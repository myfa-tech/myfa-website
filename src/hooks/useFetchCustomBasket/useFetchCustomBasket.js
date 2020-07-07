import { useEffect, useState } from 'react';

import { fetchCustomBasket } from '../../services/baskets';
import getProductImage from '../../utils/getProductImage';
import getBasketImage from '../../utils/getBasketImage';

const useFetchCustomBasket = (initBasket = {}) => {
  const [basket, setBasket] = useState(initBasket);

  useEffect(() => {
		const asyncFunc = async () => {
      let customBasket = await fetchCustomBasket();

      // Set basket images
      customBasket.img = getBasketImage(customBasket.type);
      customBasket.availableBases = customBasket.availableBases.map(base => ({ ...base, img: getProductImage(base.id) }));
      customBasket.availableFruits = customBasket.availableFruits.map(fruit => ({ ...fruit, img: getProductImage(fruit.id) }));
      customBasket.availableVeggies = customBasket.availableVeggies.map(veggie => ({ ...veggie, img: getProductImage(veggie.id) }));
      customBasket.availableSauces = customBasket.availableSauces.map(sauce => ({ ...sauce, img: getProductImage(sauce.id) }));
      customBasket.availableSupps = customBasket.availableSupps.map(supp => ({ ...supp, img: getProductImage(supp.id) }));

			setBasket({ ...customBasket });
		};

		asyncFunc();
  }, []);

  return [basket, setBasket];
};

export default useFetchCustomBasket;
