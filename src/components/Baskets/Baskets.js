import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaShoppingBasket, FaShoppingCart } from 'react-icons/fa';

import CartModal from '../CartModal';

import useTranslate from '../../hooks/useTranslate';
import useFetchBasketsInfo from '../../hooks/useFetchBasketsInfo';

import './Baskets.scss';
import CartStorage from '../../services/CartStorage';

const Baskets = () => {
	const [basketForCart, setBasketForCart] = useState(null);
	const [showCartModal, setShowCartModal] = useState(false);
	const [baskets, setBaskets] = useFetchBasketsInfo([]);
	const [t, locale] = useTranslate();

	const toggleCartModal = () => {
		if (!!showCartModal) {
			setBasketForCart(null);
		}

		setShowCartModal(!showCartModal);
	};

	const handleBasketButtonClick = (basketType) => {
		if (typeof window !== 'undefined') {
			if (basketType === 'myfa') {
				window.location.assign(`/${locale}/custom-basket`);
			} else {
				window.location.assign(`/${locale}/baskets?type=${basketType}`);
			}
		}
	};

	const addBasketToCart = async (e, basket) => {
		e.stopPropagation();

		await CartStorage.addToCart({ ...basket });

		setBasketForCart(basket);
		toggleCartModal();
	};

	return (
		<section id='baskets' className='section-2'>
			<div className='heading'>
				<h2>{t('home_page.baskets.title')} 🧺</h2>
				<h3>{t('home_page.baskets.subtitle')}</h3>
			</div>
			<Container>
				<Row className='baskets-container'>
					{baskets.map((basket) => (
						<Col md={6} key={basket.type} onClick={() => handleBasketButtonClick(basket.type)}>
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
