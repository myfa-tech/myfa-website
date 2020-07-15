import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Divider from '@material-ui/core/Divider';
import { FaRegTrashAlt, FaShoppingCart } from 'react-icons/fa';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

import Button from '../../Button';
import CartStorage from '../../../services/CartStorage';
import uniqBy from '../../../utils/uniqBy';
import countBy from '../../../utils/countBy';
import getBasketImage from '../../../utils/getBasketImage';
import getProductDetailsImage from '../../../utils/getProductDetailsImage';
import get from '../../../utils/get';

import './DisplayTooltip.scss';

const CustomTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#fff',
    color: '#000',
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
  arrow: {
    color: '#ddd',
  }
}))(Tooltip);

const DisplayTooltip = ({ cart, removeBaskets, removeProduct, t }) => {
  const [basketsCount, setItemsCount] = useState(0);
  const [itemsPrice, setItemsPrice] = useState(0);

  useEffect(() => {
    const asyncFunc = async () => {
      if (!!cart && (!!cart.baskets || !!get(cart, 'products.items'))) {
        setItemsCount(cart.baskets.length + get(cart, 'products.items.length', 0));
        setItemsPrice(await calculatePrice());
      } else {
        setItemsCount(0);
        setItemsPrice(0);
      }
    }

    asyncFunc();
  }, [cart]);

  const calculatePrice = async () => {
    let newCart = await CartStorage.getCartFromStorage();
    let newBasketsPrice = newCart.baskets.map(b => b.price).reduce((acc, cur) => acc + cur, 0);
    let newProductsPrice = get(newCart, 'products.items', []).map(p => p.price).reduce((acc, cur) => acc + cur, 0);

    return newBasketsPrice + newProductsPrice;
  };

  const goToCart = () => {
    if (typeof window !== 'undefined') {
      window.location.assign('/cart');
    }
  };

  return (
    <CustomTooltip
      interactive
      arrow
      className='popover-container'
      title={
        <div id='cart-popover'>
          <h3 className='title'>{t('header.custom_tooltip.title')}</h3>

          <Divider variant='middle' />

          {get(cart, 'baskets.length') || get(cart, 'products.items.length') ?
            <>
              <ul className='baskets-container'>
                {uniqBy(cart.baskets, 'type').map((basket, index) => (
                  <li key={index}>
                    <Row>
                      <Col xs={0} sm={2} className='image-container d-none d-sm-flex'>
                        <img src={getBasketImage(basket.type)} />
                      </Col>
                      <Col xs={7} sm={6} className='label-container'>
                        <h4>{t(`home_page.${basket.category}.${basket.type}_title`)}</h4>
                        <p>{basket.price.toFixed(2)} €</p>
                      </Col>
                      <Col xs={5} sm={4} className='qty-container'>
                        <FaRegTrashAlt className='trash-icon' onClick={() => removeBaskets(basket.type)} />
                        <p>{t('header.custom_tooltip.qty')}: {countBy(cart.baskets, 'type', basket.type)}</p>
                      </Col>
                      <Col></Col>
                    </Row>
                  </li>
                ))}
                {!!cart.products && cart.products.items.map((product, index) => (
                  <li key={index}>
                    <Row>
                      <Col xs={0} sm={2} className='image-container d-none d-sm-flex'>
                        <img src={getProductDetailsImage(product.name)} />
                      </Col>
                      <Col xs={7} sm={6} className='label-container'>
                        <h4>{t(product.labelTranslate)}</h4>
                        <p>{product.price.toFixed(2)} €</p>
                      </Col>
                      <Col xs={5} sm={4} className='qty-container'>
                        <FaRegTrashAlt className='trash-icon' onClick={() => removeProduct(index)} />
                        <p>{t('header.custom_tooltip.qty')}: {product.qty}</p>
                      </Col>
                      <Col></Col>
                    </Row>
                  </li>
                ))}
              </ul>

              <Divider variant='middle' />

              <div className='price-container'>
                <h3>{t('header.custom_tooltip.total_ttc')}</h3>
                <h3>{itemsPrice.toFixed(2)} €</h3>
              </div>

              <Divider variant='middle' />

              <Button onClick={goToCart} className='pay-button' label={t('header.custom_tooltip.checkout')} />
            </> :
            <div className='empty-cart'>
              <p>{t('header.custom_tooltip.empty_basket')}</p>
            </div>
          }

        </div>
      }>
        <span>
          <FaShoppingCart style={{ pointerEvents: "none" }} />
          {basketsCount ? <div className='baskets-count'>{basketsCount}</div> : null}
        </span>
    </CustomTooltip>
  )
};

export default DisplayTooltip;
