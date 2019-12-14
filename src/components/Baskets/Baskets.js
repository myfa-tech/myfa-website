import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'

import './Baskets.scss'

import fruitsLegumesSrc from '../../assets/images/fruits-legumes.jpg'
import fruitsLegumesPlusSrc from '../../assets/images/fruits-legumes-plus.jpg'
import saucesSrc from '../../assets/images/sauces.jpg'

const Baskets = ({ handleBasketButtonClick, showModal, modalInfos, closeModal, handleChangeFormValue, form, payWithLydia, errorEmail, errorPhone }) => {
	return (
		<section id='baskets' className='section section-2'>
			<Container>
				<Row>
					<div className='heading'>
						<h2>Choisissez votre panier ! 🧺</h2>
					</div>
					<Col md={4} className='basket-container'>
						<img src={fruitsLegumesSrc} alt='panier fruits et légumes' />
						<h3 className='basket-name'>Fruits & Légumes 🍌🥕</h3>
						<p><span className='regular-price'>14€</span><span className='reduction'>-25%</span></p>
						<p className='new-price'>9,99€ jusqu'au 31/12/2019</p>
						<button onClick={() => handleBasketButtonClick(0)} className='order-button'>Je commande</button>
					</Col>
					<Col md={4} className='basket-container middle-basket'>
						<h4>Le plus demandé</h4>
						<img src={saucesSrc} alt='panier sauces' />
						<h3 className='basket-name'>Sauces 🍗🍖</h3>
						<p><span className='regular-price'>20€</span><span className='reduction'>-50%</span></p>
						<p className='new-price'>9,99€ jusqu'au 31/12/2019</p>
						<button onClick={() => handleBasketButtonClick(1)} className='order-button'>Je commande</button>
					</Col>
					<Col md={4} className='basket-container'>
						<img src={fruitsLegumesPlusSrc} alt='panier myfa' />
						<h3 className='basket-name'>Panier MYFA 🙌🏾</h3>
						<p><span className='regular-price'>25€</span><span className='reduction'>-15%</span></p>
						<p className='new-price'>20€ jusqu'au 31/12/2019</p>
						<button onClick={() => handleBasketButtonClick(2)} className='order-button'>Je commande</button>
					</Col>
				</Row>
			</Container>

			{showModal && <Modal show={showModal} onHide={closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>Le panier {modalInfos.name}</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<p className='important-text'>Ce panier contient :</p>
					<ul>
						{modalInfos.items.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
					<p className='important-text'>Quelques informations</p>
					<form>
						<input type='email' className={`form-input ${errorEmail ? 'error' : ''}`} name='email' value={form.email} onChange={handleChangeFormValue} placeholder='Votre email' />
						<input type='tel' className={`form-input ${errorPhone ? 'error' : ''}`} name='recipientPhone' value={form.recipientPhone} onChange={handleChangeFormValue} placeholder='Tél. du destinataire' />
						<button type='button' className='order-button modal-order' onClick={payWithLydia}>Payer</button>
					</form>
				</Modal.Body>
			</Modal>}
		</section>
	)
}

export default Baskets
