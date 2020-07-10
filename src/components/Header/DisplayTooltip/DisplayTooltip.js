import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Divider from '@material-ui/core/Divider';
import { FaRegTrashAlt, FaShoppingCart } from 'react-icons/fa';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

import uniqBy from '../../../utils/uniqBy';
import countBy from '../../../utils/countBy';
import getBasketImage from '../../../utils/getBasketImage';

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

const DisplayTooltip = ({ cart, removeBaskets, t }) => {
  const [basketsCount, setBasketsCount] = useState(0);
  const [basketsPrice, setBasketsPrice] = useState(0);

  useEffect(() => {
    if (!!cart && !!cart.baskets) {
      setBasketsCount(cart.baskets.length);
      setBasketsPrice(calculatePrice());
    } else {
      setBasketsCount(0);
      setBasketsPrice(0);
    }
  }, [cart]);

  const calculatePrice = () => {
    return cart.baskets.reduce((acc, curr) => acc + curr.price, 0);
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

          {!!cart && !!cart.baskets && !!cart.baskets.length ?
            <>
              <ul className='baskets-container'>
                {uniqBy(cart.baskets, 'type').map((basket, index) => (
                  <li key={index}>
                    <Row>
                      <Col xs={0} sm={2} className='image-container d-none d-sm-flex'>
                        <img src={getBasketImage(basket.type)} />
                      </Col>
                      <Col xs={7} sm={6} className='label-container'>
                        <h4>{t(`home_page.packs.${basket.type}_title`)}</h4> :
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
              </ul>

              <Divider variant='middle' />

              <div className='price-container'>
                <h3>{t('header.custom_tooltip.total_ttc')}</h3>
                <h3>{basketsPrice.toFixed(2)} €</h3>
              </div>

              <Divider variant='middle' />

              <button className='pay-button' onClick={goToCart}>{t('header.custom_tooltip.checkout')}</button>
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
