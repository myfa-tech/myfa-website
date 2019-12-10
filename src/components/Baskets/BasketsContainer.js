import React from 'react'

import Baskets from './Baskets'
import { timingSafeEqual } from 'crypto'

class BasketsContainer extends React.Component {
	basketsInfos = [
		{
			amount: 9.99,
			message: '',
			orderRef: 'MYFA1',
		}
	]

	state = {
		showModal: false,
		modalInfos: null,
	}

	handleBasketButtonClick = (basketIndex) => {
		this.setState({
			showModal: true,
			modalInfos: this.basketsInfos[basketIndex],
		})
	}

	closeModal = () => {
		this.setState({ showModal: false, modalInfos: null })
	}

	// payWithLydia = async (basketIndex) => {
	// 	const basketInfos = this.basketsInfos[basketIndex]

	// 	const response = await this.lydiaService.sendRequest({
	// 		amount: basketInfos.amount, // amount in €
  //     vendor_token: '5def3a68421aa362289007',
  //     recipient: '0711223344', // cellphone or email of your client. Leave it like this for your test
  //     message : basketInfos.message, //object of the payment
  //     browser_success_url : "/order_success?order_ref=123",
  //     confirm_url : "/confirm_payment?order_ref=123"
	// 	})

	// 	console.log({ response })
	// }

	render() {
		const { showModal } = this.state

		return (
			<Baskets
				handleBasketButtonClick={this.handleBasketButtonClick}
				showModal={showModal}
				closeModal={this.closeModal}
			/>
		)
	}
}

export default BasketsContainer
