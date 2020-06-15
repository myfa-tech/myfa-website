import React, { lazy, Suspense, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaShoppingBasket, FaShoppingCart } from 'react-icons/fa';

import LoadingBasket from '../../../components/LoadingBasket';
const CartModal = lazy(() => import('../../../components/CartModal'));
import SectionLoader from '../../../components/SectionLoader';

import useTranslate from '../../../hooks/useTranslate';
import useFetchBasketsInfo from '../../../hooks/useFetchBasketsInfo';
import CartStorage from '../../../services/CartStorage';

import './Baskets.scss';

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
				window.location.assign('custom-basket');
			} else {
				window.location.assign(`baskets?type=${basketType}`);
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
				<h3>{t('home_page.baskets.subtitle')}</h3>
			</div>

			<div className='sub-heading'>
				<h2>{t('home_page.baskets.regular_baskets_title')}</h2>
			</div>

			<Row className='baskets-container justify-content-center'>
				{baskets.length ? baskets.map((basket) => (
					<Col md={4} key={basket.type} onClick={() => handleBasketButtonClick(basket.type)}>
						<div className='basket-container'>
							<div className='basket-inner-container'>
								<h4>{t(basket.labelTranslate)}</h4>
								<h5>{t(basket.homeDescTranslate)}</h5>
								<img src={basket.img} alt={basket.imgAlt} />
							</div>
							<Row className='price-and-buy-container'>
								<Col xs={6} className='price-container'>
									<p className='new-price-euro'>{basket.price}€</p>
									<p className='new-price-cfa'>{basket.priceCFA} FCFA</p>
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
				)) :
				[1, 2, 3].map((it, index) => (
					<Col md={4} key={index}>
						<LoadingBasket />
					</Col>
				))}
			</Row>
			{showCartModal &&
				<Suspense fallback={<SectionLoader />}>
					<CartModal
						showCartModal={showCartModal}
						toggleCartModal={toggleCartModal}
						basket={basketForCart}
					/>
				</Suspense>
			}
		</section>
	);
};

export default Baskets;
