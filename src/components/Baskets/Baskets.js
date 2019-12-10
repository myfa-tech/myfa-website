import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Modal from 'react-modal'

import './Baskets.scss'

import fruitsLegumesSrc from '../../assets/images/fruits-legumes.jpg'
import fruitsLegumesPlusSrc from '../../assets/images/fruits-legumes-plus.jpg'
import saucesSrc from '../../assets/images/sauces.jpg'

const Baskets = ({ handleBasketButtonClick, showModal, closeModal }) => {
	return (
		<section id='baskets' className='section section-2'>
			<Container>
				<Row>
					<div className='heading'>
						<h2>Précommandez des paniers à <span className='reduced-price'>prix très très réduits</span></h2>
					</div>
					<Col md={4} className='basket-container'>
						<img src={fruitsLegumesSrc} alt='panier fruits et légumes' />
						<h3 className='basket-name'>Le panier Fruits&Légumes</h3>
						<p><span className='regular-price'>14€</span><span className='reduction'>-25%</span></p>
						<p className='new-price'>9,99€ jusqu'au 31/12/2019</p>
						<button onClick={() => handleBasketButtonClick(0)} className='order-button'>Commander</button>
					</Col>
					<Col md={4} className='basket-container middle-basket'>
						<h4>Le plus demandé</h4>
						<img src={saucesSrc} alt='panier sauces' />
						<h3 className='basket-name'>Le panier Sauces</h3>
						<p><span className='regular-price'>20€</span><span className='reduction'>-50%</span></p>
						<p className='new-price'>9,99€ jusqu'au 31/12/2019</p>
						<button className='order-button'>Commander</button>
					</Col>
					<Col md={4} className='basket-container'>
						<img src={fruitsLegumesPlusSrc} alt='panier fruits et légumes plus' />
						<h3 className='basket-name'>Le panier Plus</h3>
						<p><span className='regular-price'>25€</span><span className='reduction'>-15%</span></p>
						<p className='new-price'>20€ jusqu'au 31/12/2019</p>
						<button className='order-button'>Commander</button>
					</Col>
				</Row>
			</Container>

			<Modal
				isOpen={showModal}
				onRequestClose={closeModal}
				style={{}}
				contentLabel='Commander un panier'
			>

				<h2>Hello</h2>
				<button onClick={closeModal}>close</button>
				<div>I am a modal</div>
				<form>
					<input />
					<button>tab navigation</button>
					<button>stays</button>
					<button>inside</button>
					<button>the modal</button>
				</form>
			</Modal>
		</section>
	)
}

export default Baskets
