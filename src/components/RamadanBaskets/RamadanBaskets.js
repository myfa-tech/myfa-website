import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaShoppingBasket, FaShoppingCart } from 'react-icons/fa';

import useTranslate from '../../hooks/useTranslate';
import useFetchRamadanBaskets from '../../hooks/useFetchRamadanBaskets';
import CartStorage from '../../services/CartStorage';

import './RamadanBaskets.scss';

const RamadanBaskets = () => {
  const [basketForCart, setBasketForCart] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false);
  const [baskets, setBaskets] = useFetchRamadanBaskets([]);
  const [t, locale] = useTranslate();

  const toggleCartModal = () => {
		if (!!showCartModal) {
			setBasketForCart(null);
		}

		setShowCartModal(!showCartModal);
  };

  const handleBasketButtonClick = (basketType) => {
		if (typeof window !== 'undefined') {
			window.location.assign(`/${locale}/ramadan-baskets?type=${basketType}`);
		}
  };

  const addBasketToCart = async (e, basket) => {
		e.stopPropagation();

		await CartStorage.addToCart({ ...basket });

		setBasketForCart(basket);
		toggleCartModal();
	};

  return (
    <section id='ramadan-baskets'>
      <div className='heading'>
        <h2>{t('home_page.baskets.ramadan_baskets_title')}</h2>
      </div>

      <div>
        <Row className='ramadan-baskets-container baskets-container'>
          {baskets.map((basket) => (
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
          ))}
        </Row>
      </div>
    </section>
  );
};

export default RamadanBaskets;
