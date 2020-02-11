import React from 'react';
import Baskets from './Baskets';
import basketsInfos from '../../assets/baskets';
import { customBasketDetails } from '../../assets/customBasket';
import EventEmitter from '../../services/EventEmitter';

class BasketsContainer extends React.Component {
	state = {
		basketForCart: null,
		showCartModal: false,
	};

	eventEmitter = new EventEmitter();

	toggleCartModal = () => {
		const state = this.state.showCartModal ?
			{ showCartModal: !this.state.showCartModal, basketForCart: null } :
			{ showCartModal: !this.state.showCartModal };

		this.setState(state);
	};

	addBasketToCart = (e, basket) => {
		e.stopPropagation();

		if (typeof window !== 'undefined') {
			let cart = JSON.parse(window.localStorage.getItem('cart'));

      if (!cart) {
        cart = [];
      }

      cart.push(basket);

      window.localStorage.setItem('cart', JSON.stringify(cart));
			this.eventEmitter.emit('editCart');

			this.setState({ basketForCart: basket }, this.toggleCartModal);
    }
	}

	handleBasketButtonClick = (basketIndex) => {
		if (typeof window !== 'undefined') {
			if (basketIndex === 3) {
				window.location.assign('/custom-basket');
			} else {
				window.location.assign(`/baskets?type=${basketsInfos[basketIndex].type}`);
			}
		}
	};

	render() {
		const { basketForCart, showCartModal } = this.state

		return (
			<Baskets
				basketForCart={basketForCart}
				addBasketToCart={this.addBasketToCart}
				handleBasketButtonClick={this.handleBasketButtonClick}
				showCartModal={showCartModal}
				toggleCartModal={this.toggleCartModal}
				baskets={[...basketsInfos, customBasketDetails]}
			/>
		)
	}
}

export default BasketsContainer
