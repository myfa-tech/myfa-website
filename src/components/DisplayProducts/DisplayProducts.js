import React, { lazy, Suspense, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import LoadingItem from '../LoadingItem';
const CartProductModal = lazy(() => import('../CartProductModal'));
import SectionLoader from '../SectionLoader';

import CartStorage from '../../services/CartStorage';
import useTranslate from '../../hooks/useTranslate';

import './DisplayProducts.scss';

const DisplayProducts = ({ products, handleProductClick }) => {
  const [productForCart, setProductForCart] = useState(null);
	const [showCartProductModal, setShowCartProductModal] = useState(false);
  const [t] = useTranslate();

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
    <>
      <Row className='display-products justify-content-center'>
				{products.length ? products.map((product) => (
					<Col md={3} key={product.type} onClick={() => handleProductClick(product.type)}>
						<div className='product-container'>
							<div className='product-inner-container'>
								<h4>{t(product.labelTranslate)}</h4>
								<h5>{t(product.homeDescTranslate)}</h5>
								<img src={product.img} alt={product.imgAlt} />
							</div>
							<Row className='price-and-buy-container'>
								<Col xs={7} className='price-container'>
									<p className='new-price-euro'>{product.price}€</p>
									<p className='new-price-cfa'>{product.priceCFA} FCFA</p>
								</Col>

								<Col xs={5} className='cart-container'>
									<div className='cart-button' onClick={(e) => addProductToCart(e, product)}>
										<FaShoppingCart className='cart-icon' />
									</div>
								</Col>
							</Row>
						</div>
					</Col>
				)) :
				[1, 2, 3, 4].map((it, index) => (
					<Col md={3} key={index}>
						<LoadingItem />
					</Col>
				))}
			</Row>
			{showCartProductModal &&
				<Suspense fallback={<SectionLoader />}>
					<CartProductModal
						showCartProductModal={showCartProductModal}
						toggleCartProductModal={toggleCartProductModal}
						product={productForCart}
					/>
				</Suspense>
			}
    </>
  );
};

export default DisplayProducts;
