
import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaShoppingBasket } from 'react-icons/fa';

import LoadingItem from '../../../components/LoadingItem';
import SectionTitle from '../../../components/SectionTitle';

import useTranslate from '../../../hooks/useTranslate';

import '../articlesStyle.scss';
import './ProductsDetails.scss';

const ProductsDetails = () => {
  const [products, setProducts] = useState([
    { type: 'fruit',  },
  ]);
  const [t] = useTranslate();

  return (
    <section id='products' className='articles'>
			<SectionTitle
				title={t('home_page.products.products_title')}
				mobileTitle={t('home_page.products.products_mobile_title')}
				secondary={{ text: t('home_page.products.products_secondary'), link: '/details-categories' }}
			/>

			<Row className='articles-container justify-content-center'>
				{products.length ? products.map((product) => (
					<Col md={3} key={product.type} onClick={() => handleBasketButtonClick(product.type)}>
						<div className='article-container'>
							<div className='article-inner-container'>
								<h4>{t(product.labelTranslate)}</h4>
								<h5>{t(product.homeDescTranslate)}</h5>
								<img src={product.img} alt={product.imgAlt} />
							</div>
							<Row className='price-and-buy-container'>
								<Col xs={6} className='price-container'>
									<p className='new-price-euro'>{product.price}€</p>
									<p className='new-price-cfa'>{product.priceCFA} FCFA</p>
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
						<LoadingItem />
					</Col>
				))}
      </Row>
    </section>
  );
};

export default ProductsDetails;
