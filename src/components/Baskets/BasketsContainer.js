import React from 'react'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

import Baskets from './Baskets'
import lydiaService from '../../services/lydia'

class BasketsContainer extends React.Component {
	basketsInfos = [
		{
			name: 'Fruits&Légumes',
			price: 9.99,
			message: '',
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
			name: 'Sauces',
			price: 9.99,
			message: '',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam semper mattis elit, nec feugiat leo facilisis sit amet. Sed eget nibh ut odio iaculis porta quis ut urna.',
			items: [
				'test 3',
				'test 4',
			],
		},
		{
			name: 'Myfa',
			price: 20,
			message: '',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam semper mattis elit, nec feugiat leo facilisis sit amet. Sed eget nibh ut odio iaculis porta quis ut urna.',
			items: [
				'test 5',
				'test 6',
			],
		},
	]

	state = {
		showModal: false,
		modalInfos: null,
		errorEmail: false,
		errorPhone: false,
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

	verifyEmail = (email) => {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			return true
		} else {
			this.setState({ errorEmail: true })
			return false
		}
	}

	verifyPhone = (phone) => {
		const phoneNumber = parsePhoneNumberFromString(phone, 'CI')

		if (phoneNumber && phoneNumber.isValid()) {
			return true
		} else {
			this.setState({ errorPhone: true })
			return false
		}
	}

	closeModal = () => {
		this.setState({ showModal: false, modalInfos: null , form: {} })
	}

	payWithLydia = async () => {
		const { modalInfos, form } = this.state

		if (this.verifyEmail(form.email) && this.verifyPhone(form.recipientPhone)) {
			await lydiaService.requestPayment(modalInfos, form)
		} else {
			console.log('wrong form info')
		}
	}

	handleChangeFormValue = (e) => {
		const { form } = this.state
		const targetName = e.target.name
		let errorToReset

		form[targetName] = e.target.value

		if (targetName === 'email') {
			errorToReset = 'errorEmail'
		} else if (targetName === 'recipientPhone') {
			errorToReset = 'errorPhone'
		}

		this.setState({ form, [errorToReset]: false })
	}

	render() {
		const { modalInfos, showModal, form, errorEmail, errorPhone } = this.state

		return (
			<Baskets
				handleBasketButtonClick={this.handleBasketButtonClick}
				handleChangeFormValue={this.handleChangeFormValue}
				payWithLydia={this.payWithLydia}
				showModal={showModal}
				modalInfos={modalInfos}
				closeModal={this.closeModal}
				errorEmail={errorEmail}
				errorPhone={errorPhone}
				form={form}
			/>
		)
	}
}

export default BasketsContainer
