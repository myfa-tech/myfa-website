import React, { lazy, Suspense, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaShoppingBasket } from 'react-icons/fa';

import LoadingBasket from '../../../components/LoadingBasket';
const CartModal = lazy(() => import('../../../components/CartModal'));
import SectionLoader from '../../../components/SectionLoader';
import SectionTitle from '../../../components/SectionTitle';

import useTranslate from '../../../hooks/useTranslate';
import useFetchPacks from '../../../hooks/useFetchPacks';

import '../articlesStyle.scss';
import './Packs.scss';

const Packs = () => {
	const [basketForCart, setBasketForCart] = useState(null);
	const [showCartModal, setShowCartModal] = useState(false);
	const [baskets, setBaskets] = useFetchPacks([]);

	const [t, locale] = useTranslate();

	const toggleCartModal = () => {
		if (!!showCartModal) {
			setBasketForCart(null);
		}

		setShowCartModal(!showCartModal);
	};

	const handleBasketButtonClick = (basketType) => {
		if (typeof window !== 'undefined') {
			window.location.assign(`baskets?type=${basketType}`);
		}
	};

	return (
		<section id='packs' className='articles section-2'>
			<SectionTitle
				title={t('home_page.packs.packs_title')}
				mobileTitle={t('home_page.packs.packs_mobile_title')}
				secondary={{ text: t('home_page.packs.packs_secondary'), link: '/packs' }}
			/>

			<Row className='articles-container justify-content-center'>
				{baskets.length ? baskets.map((basket) => (
					<Col md={3} key={basket.type} onClick={() => handleBasketButtonClick(basket.type)}>
						<div className='article-container'>
							<div className='article-inner-container'>
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
									<div className='cart-button'>
										<FaShoppingBasket className='cart-icon' />
									</div>
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

export default Packs;
