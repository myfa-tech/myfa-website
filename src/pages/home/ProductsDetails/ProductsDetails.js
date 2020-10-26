
import React, { lazy, Suspense, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaShoppingBasket } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';

import LoadingItem from '../../../components/LoadingItem';
import SectionTitle from '../../../components/SectionTitle';
const CartProductModal = lazy(() => import('../../../components/CartProductModal'));
const ServiceInterruptionModal = lazy(() => import('./ServiceInterruptionModal'));
import SectionLoader from '../../../components/SectionLoader';

import CartStorage from '../../../services/CartStorage';
import getProductDetailsImage from '../../../utils/getProductDetailsImage';
import useTranslate from '../../../hooks/useTranslate';
import useFetchBestsellersProducts from '../../../hooks/useFetchBestsellersProducts';

import '../articlesStyle.scss';
import './ProductsDetails.scss';

const ProductsDetails = () => {
	const [productForCart, setProductForCart] = useState(null);
	const [showCartProductModal, setShowCartProductModal] = useState(false);
	const [showServiceInterruptionModal, setShowServiceInterruptionModal] = useState(false);
  const [products, setProducts] = useFetchBestsellersProducts([]);
	const [t] = useTranslate();

	useEffect(() => {
		window.onscroll = triggerServiceInterruptionModalIfScrolled;
	}, []);

	const goToProduct = (productName) => {
		if (typeof window !== 'undefined') {
      window.location.assign(`/products/${productName}`);
    }
	};

	function triggerServiceInterruptionModalIfScrolled() {
		let limit = document.getElementById('bestsellers').offsetHeight - 250;
		let isServiceInterruptionModalViewed = window.sessionStorage.getItem('service-interruption-viewed');

		if (window.pageYOffset >= limit && !isServiceInterruptionModalViewed) {
      toggleServiceInterruptionModal();
    }
	};

	const toggleServiceInterruptionModal = () => {
		setShowServiceInterruptionModal(!showServiceInterruptionModal);
		window.sessionStorage.setItem('service-interruption-viewed', true);
	};

	const toggleCartProductModal = () => {
		if (!!showCartProductModal) {
			setProductForCart(null);
		}

		setShowCartProductModal(!showCartProductModal);
  };

	const addProductToCart = async (e, product) => {
		e.stopPropagation();

		await CartStorage.addProductToCart({ ...product });

		setProductForCart(product);
		toggleCartProductModal();
	};

  return (
    <section id='bestsellers' className='articles'>
			<SectionTitle
				title={t('home_page.products.products_title')}
				secondary={{ text: t('home_page.products.products_secondary'), link: '/details-categories' }}
			/>

			<Row className='articles-container justify-content-center desktop-display'>
				{products.length ? products.map((product) => (
					<Col md={3} key={product.name} onClick={() => goToProduct(product.name)}>
						<div className='article-container'>
							<div className='article-inner-container'>
								<h4>{t(product.labelTranslate)}</h4>
								<h5>{t(product.homeDescTranslate)}</h5>
								<img src={getProductDetailsImage(product.name)} alt={product.imgAlt} />
							</div>
							<Row className='price-and-buy-container'>
								<Col xs={6} className='price-container'>
									<p className='new-price-euro'>{product.price}€</p>
									<p className='new-price-cfa'>{product.priceCFA} FCFA</p>
								</Col>

								<Col xs={6} className='cart-container'>
									<div className='cart-button' onClick={(e) => addProductToCart(e, product)}>
										<FaShoppingBasket className='cart-icon' />
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
					{products.length ? products.map((product, index) => (
						<div key={index}>
							<div className='article-container' onClick={() => goToProduct(product.name)}>
								<div className='article-inner-container'>
									<h4>{t(product.labelTranslate)}</h4>
									<h5>{t(product.homeDescTranslate)}</h5>
									<img src={getProductDetailsImage(product.name)} alt={product.imgAlt} />
								</div>
								<Row className='price-and-buy-container'>
									<Col xs={6} className='price-container'>
										<p className='new-price-euro'>{product.price}€</p>
										<p className='new-price-cfa'>{product.priceCFA} FCFA</p>
									</Col>

									<Col xs={6} className='cart-container'>
										<div className='cart-button' onClick={(e) => addProductToCart(e, product)}>
											<FaShoppingBasket className='cart-icon' />
										</div>
									</Col>
								</Row>
							</div>
						</div>
					)) :
					[1, 2, 3].map((it, index) => (
						<Col md={4} key={index}>
							<LoadingItem />
						</Col>
					))}
				</Carousel>
			</div>

			{showCartProductModal &&
				<Suspense fallback={<SectionLoader />}>
					<CartProductModal
						showCartProductModal={showCartProductModal}
						toggleCartProductModal={toggleCartProductModal}
						product={productForCart}
					/>
				</Suspense>
			}

			{showServiceInterruptionModal &&
				<Suspense fallback={<SectionLoader />}>
					<ServiceInterruptionModal
						showModal={showServiceInterruptionModal}
						toggleModal={toggleServiceInterruptionModal}
					/>
				</Suspense>
			}
    </section>
  );
};

export default ProductsDetails;
