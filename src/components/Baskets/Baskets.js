import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';

import CartModal from '../CartModal';

import './Baskets.scss';

const Baskets = ({
	addBasketToCart,
	handleBasketButtonClick,
	basketForCart,
	baskets,
	showCartModal,
	toggleCartModal,
}) => {
	return (
		<section id='baskets' className='section section-2'>
			<div className='heading'>
				<h2>Choisissez votre panier ! 🧺</h2>
				<h3>Nos produits sont de saison, venant des producteurs. La composition des paniers peut donc varier.</h3>
			</div>
			<Container>
				<Row className='baskets-container'>
					{baskets.map((basket, index) => (
						<Col md={6} key={basket.name} onClick={() => handleBasketButtonClick(index)}>
							<div className='basket-container'>
								<h4>{basket.label}</h4>
								<h5>{basket.homeDesc}</h5>
								<img src={basket.img} alt={basket.imgAlt} />
								<Row>
									{basket.type !== 'myfa' ?
										<>
										<Col xs={6} className='price-container'>
											<p><span className='regular-price'>{basket.realPrice}€</span><span className='reduction'>-{basket.reduction}%</span></p>
											<p className='new-price'><b>{basket.price}€</b> jusqu'au 10/03/2020</p>
										</Col>

										<Col xs={6} className='cart-container'>

												<div className='cart-button' onClick={(e) => addBasketToCart(e, basket)}>
													<FaShoppingCart className='cart-icon' />
												</div>
										</Col>
										</>:
										<Col xs={6} className='price-container custom-basket'>
											<p><span className='regular-price'>{basket.realPrice}€</span><span className='reduction'>-{basket.reduction}%</span></p>
											<p className='new-price'><b>{basket.price}€</b> jusqu'au 10/03/2020</p>
										</Col>
									}
								</Row>
							</div>
						</Col>
					))}
				</Row>
			</Container>
			{showCartModal &&
				<CartModal
					showCartModal={showCartModal}
					toggleCartModal={toggleCartModal}
					basket={basketForCart}
				/>
			}
		</section>
	);
};

export default Baskets;
