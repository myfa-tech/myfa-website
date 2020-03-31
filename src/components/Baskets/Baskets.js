import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaShoppingBasket, FaShoppingCart } from 'react-icons/fa';
import useTranslate from '../../hooks/useTranslate';

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
	const [t] = useTranslate();

	return (
		<section id='baskets' className='section-2'>
			<div className='heading'>
				<h2>{t('home_page.baskets.title')} 🧺</h2>
				<h3>{t('home_page.baskets.subtitle')}</h3>
			</div>
			<Container>
				<Row className='baskets-container'>
					{baskets.map((basket, index) => (
						<Col md={6} key={basket.name} onClick={() => handleBasketButtonClick(index)}>
							<div className='basket-container'>
								<h4>{t(basket.labelTranslate)}</h4>
								<h5>{t(basket.homeDescTranslate)}</h5>
								<img src={basket.img} alt={basket.imgAlt} />
								<Row className='price-and-buy-container'>
									<Col xs={6} className='price-container'>
										<p className='new-price'>{basket.price}€</p>
									</Col>

									<Col xs={6} className='cart-container'>
										{basket.type !== 'myfa' ?
											<div className='cart-button' onClick={(e) => addBasketToCart(e, basket)}>
												<FaShoppingCart className='cart-icon' />
											</div> :
											<div className='cart-button'>
												<FaShoppingBasket className='cart-icon' />
											</div>
										}
									</Col>
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
