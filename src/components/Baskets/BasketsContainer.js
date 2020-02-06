import React from 'react';

import Baskets from './Baskets';
import basketsInfos from '../../assets/baskets';
import { customBasketDetails } from '../../assets/customBasket';

class BasketsContainer extends React.Component {
	state = {
		showModal: false,
		isLoading: false,
		modalBasket: null,
		isLoggedIn: false,
	};

	componentDidMount() {
		if (!!window.localStorage.getItem('user')) {
      this.setState({ isLoggedIn: true });
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
	}

	closeModal = () => {
		if (!this.state.isLoading) {
			this.setState({ showModal: false, modalBasket: null , form: {}, errorEmail: false, errorPhone: false })
		}
	}

	setIsLoading = (isLoading) => {
		this.setState({ isLoading });
	}

	render() {
		const { modalBasket, showModal, isLoggedIn, isLoading } = this.state

		return (
			<Baskets
				handleBasketButtonClick={this.handleBasketButtonClick}
				isLoading={isLoading}
				setIsLoading={this.setIsLoading}
				showModal={showModal}
				isLoggedIn={isLoggedIn}
				modalBasket={modalBasket}
				baskets={[...basketsInfos, customBasketDetails]}
				closeModal={this.closeModal}
			/>
		)
	}
}

export default BasketsContainer
