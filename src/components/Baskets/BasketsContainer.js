import React from 'react'

import Baskets from './Baskets'
import Lydia from '../../services/lydia';

class BasketsContainer extends React.Component {
	lydiaService = new Lydia()

	componentDidMount() {
		this.lydiaService.init({ env: 'test' })
	}

	payWithLydia = async (basketName) => {
		await this.lydiaService.sendRequest({
			amount: 9.99, // amount in €
      vendor_token: '5def3a68421aa362289007',
      recipient: '0711223344', // cellphone or email of your client. Leave it like this for your test
      message : "Facture 004 pour un t-shirt taille M", //object of the payment
      env: 'test',
      // The client will be redirect to this URL after the payment
      browser_success_url : "/order_success?order_ref=123",
			// This URL will be called by our server after the payment so you can update the order on your database
      confirm_url : "/confirm_payment?order_ref=123"
		})
	}

	render() {
		return (
			<Baskets
				handleButtonClick={this.payWithLydia}
			/>
		)
	}
}

export default BasketsContainer
