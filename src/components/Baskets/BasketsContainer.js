import React, { useState } from 'react';
import Baskets from './Baskets';
import basketsInfos from '../../assets/baskets';
import { customBasketDetails } from '../../assets/customBasket';
import EventEmitter from '../../services/EventEmitter';
import useTranslate from '../../hooks/useTranslate';

const BasketsContainer = () => {
	const [basketForCart, setBasketForCart] = useState(null);
	const [showCartModal, setShowCartModal] = useState(false);
	const [t, locale] = useTranslate();

	const eventEmitter = new EventEmitter();

	const toggleCartModal = () => {
		if (!!showCartModal) {
			setBasketForCart(null);
		}

		setShowCartModal(!showCartModal);
	};

	const addBasketToCart = (e, basket) => {
		e.stopPropagation();

		if (typeof window !== 'undefined') {
			let cart = JSON.parse(window.localStorage.getItem('cart'));

      if (!cart) {
        cart = [];
      }

      cart.push(basket);

      window.localStorage.setItem('cart', JSON.stringify(cart));
			eventEmitter.emit('editCart');

			setBasketForCart(basket);
			toggleCartModal();
    }
	};

	const handleBasketButtonClick = (basketIndex) => {
		if (typeof window !== 'undefined') {
			if (basketIndex === 3) {
				window.location.assign(`/${locale}/custom-basket`);
			} else {
				window.location.assign(`/${locale}/baskets?type=${basketsInfos[basketIndex].type}`);
			}
		}
	};

	return (
		<Baskets
			basketForCart={basketForCart}
			addBasketToCart={addBasketToCart}
			handleBasketButtonClick={handleBasketButtonClick}
			showCartModal={showCartModal}
			toggleCartModal={toggleCartModal}
			baskets={[...basketsInfos, customBasketDetails]}
		/>
	);
}

export default BasketsContainer
