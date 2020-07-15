import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaShoppingBasket } from 'react-icons/fa';

import useTranslate from '../../hooks/useTranslate';
import getProductDetailsImage from '../../utils/getProductDetailsImage';

import './ProductsGrid.scss';

const ProductsGrid = ({
  products,
  onItemClicked,
  onItemCartClicked,
}) => {
  const [t] = useTranslate();

  return (
    <div id='products-grid'>
      {products.map(product => (
        <div key={product.id} className='product-container' onClick={() => onItemClicked(product.name)}>
          <div className='product-inner-container'>
            <h4>{t(product.labelTranslate)}</h4>
            <h5>{t(product.homeDescTranslate)}</h5>
            <img src={getProductDetailsImage(product.image)} alt={product.imgAlt} />
          </div>
          <Row className='price-and-buy-container'>
            <Col xs={7} className='price-container'>
              <p className='new-price-euro'>{product.price}€</p>
              <p className='new-price-cfa'>{product.priceCFA} FCFA</p>
            </Col>

            <Col xs={5} className='cart-container'>
              <div className='cart-button' onClick={(e) => onItemCartClicked(e, product)}>
                <FaShoppingBasket className='cart-icon' />
              </div>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
};

export default ProductsGrid;
