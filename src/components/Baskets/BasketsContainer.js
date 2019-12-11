import React from 'react'

import Baskets from './Baskets'
import lydiaService from '../../services/lydia'

class BasketsContainer extends React.Component {
	basketsInfos = [
		{
			basketName: 'Fruits&Légumes',
			amount: 9.99,
			message: '',
			orderRef: 'MYFA1',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam semper mattis elit, nec feugiat leo facilisis sit amet. Sed eget nibh ut odio iaculis porta quis ut urna.',
			items: [
				'test 1',
				'test 2',
				'test 1',
				'test 2',
				'test 1',
				'test 2',
				'test 1',
				'test 2',
				'test 1',
				'test 2',
			],
		},
		{
			basketName: 'Sauces',
			amount: 9.99,
			message: '',
			orderRef: 'MYFA2',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam semper mattis elit, nec feugiat leo facilisis sit amet. Sed eget nibh ut odio iaculis porta quis ut urna.',
			items: [
				'test 3',
				'test 4',
			],
		},
	]

	state = {
		showModal: false,
		modalInfos: null,
		form: {
			email: '',
			recipientPhone: '',
		}
	}

	handleBasketButtonClick = (basketIndex) => {
		this.setState({
			showModal: true,
			modalInfos: this.basketsInfos[basketIndex],
		})
	}

	closeModal = () => {
		this.setState({ showModal: false, modalInfos: null , form: {} })
	}

	payWithLydia = async () => {
		const { modalInfos, form } = this.state

		if (form.email && form.recipientPhone) {
			await lydiaService.requestPayment(modalInfos, form)
		} else {
			console.log('wrong form info')
		}
	}

	handleChangeFormValue = (e) => {
		const { form } = this.state
		form[e.target.name] = e.target.value

		this.setState({ form })
	}

	render() {
		const { modalInfos, showModal, form } = this.state

		return (
			<Baskets
				handleBasketButtonClick={this.handleBasketButtonClick}
				handleChangeFormValue={this.handleChangeFormValue}
				payWithLydia={this.payWithLydia}
				showModal={showModal}
				modalInfos={modalInfos}
				closeModal={this.closeModal}
				form={form}
			/>
		)
	}
}

export default BasketsContainer
