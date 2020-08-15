import React, { lazy, Suspense, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaShoppingCart } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';

import LoadingItem from '../../../components/LoadingItem';
const CartModal = lazy(() => import('../../../components/CartModal'));
import SectionLoader from '../../../components/SectionLoader';
import SectionTitle from '../../../components/SectionTitle';

import useTranslate from '../../../hooks/useTranslate';
import useFetchPleasureBaskets from '../../../hooks/useFetchPleasureBaskets';
import CartStorage from '../../../services/CartStorage';

import '../articlesStyle.scss';
import './PleasureBaskets.scss';

const PleasureBaskets = () => {
	const [basketForCart, setBasketForCart] = useState(null);
	const [showCartModal, setShowCartModal] = useState(false);
	const [baskets, setBaskets] = useFetchPleasureBaskets([]);
	const [t, locale] = useTranslate();

	const toggleCartModal = () => {
		if (!!showCartModal) {
			setBasketForCart(null);
		}

		setShowCartModal(!showCartModal);
	};

	const handleBasketButtonClick = (basketType) => {
		if (typeof window !== 'undefined') {
			window.location.assign(`/baskets/details?type=${basketType}`);
		}
	};

	const addBasketToCart = async (e, basket) => {
		e.stopPropagation();

		await CartStorage.addBasketToCart({ ...basket });

		setBasketForCart(basket);
		toggleCartModal();
	};

	return (
		<section id='pleasure-baskets' className='articles section-2'>
			<SectionTitle
				title={t('home_page.baskets.pleasure_baskets_title')}
				mobileTitle={t('home_page.baskets.pleasure_baskets_mobile_title')}
				secondary={{ text: t('home_page.baskets.pleasure_baskets_secondary'), link: '/pleasure-baskets' }}
			/>

			<Row className='articles-container justify-content-center desktop-display'>
				{baskets.length ? baskets.map((basket) => (
					<Col md={3} key={basket.type} onClick={() => handleBasketButtonClick(basket.type)}>
						<div className='article-container'>
							<div className='article-inner-container'>
								<h4>{t(basket.labelTranslate)}</h4>
								<h5>{t(basket.homeDescTranslate)}</h5>
								<img src={basket.img} alt={basket.imgAlt} />
							</div>
							<Row className='price-and-buy-container'>
								<Col xs={7} className='price-container'>
									<p className='new-price-euro'>{basket.price}€</p>
									<p className='new-price-cfa'>{basket.priceCFA} FCFA</p>
								</Col>

								<Col xs={5} className='cart-container'>
									<div className='cart-button' onClick={(e) => addBasketToCart(e, basket)}>
										<FaShoppingCart className='cart-icon' />
									</div>
								</Col>
							</Row>
						</div>
					</Col>
				)) :
				[1, 2, 3].map((it, index) => (
					<Col md={4} key={index}>
						<LoadingItem />
					</Col>
				))}
			</Row>

			<div className='mobile-display mobile-slider-container'>
				<Carousel centerMode centerSlidePercentage={100} className='custom-slider'>
					{baskets.length ? baskets.map((basket) => (
						<Col md={3} key={basket.type} onClick={() => handleBasketButtonClick(basket.type)}>
							<div className='article-container'>
								<div className='article-inner-container'>
									<h4>{t(basket.labelTranslate)}</h4>
									<h5>{t(basket.homeDescTranslate)}</h5>
									<img src={basket.img} alt={basket.imgAlt} />
								</div>
								<Row className='price-and-buy-container'>
									<Col xs={7} className='price-container'>
										<p className='new-price-euro'>{basket.price}€</p>
										<p className='new-price-cfa'>{basket.priceCFA} FCFA</p>
									</Col>

									<Col xs={5} className='cart-container'>
										<div className='cart-button' onClick={(e) => addBasketToCart(e, basket)}>
											<FaShoppingCart className='cart-icon' />
										</div>
									</Col>
								</Row>
							</div>
						</Col>
					)) :
					[1, 2, 3].map((it, index) => (
						<Col md={4} key={index}>
							<LoadingItem />
						</Col>
					))}
				</Carousel>
			</div>

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

export default PleasureBaskets;
