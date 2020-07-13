import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import TextField from '@material-ui/core/TextField';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { FaCheck } from 'react-icons/fa'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

import CartModal from '../../components/CartModal';
import SEO from '../../components/seo';
import Layout from '../../components/layout';
import ButtonWithLoader from '../../components/ButtonWithLoader';
import MYFAButton from '../../components/Button';

import getQueryParam from '../../utils/getQueryParam';
import useTranslate from '../../hooks/useTranslate';
import CartStorage from '../../services/CartStorage';
import getBasketImage from '../../utils/getBasketImage';
import EventEmitter from '../../services/EventEmitter';
import useFetchOrderBaskets from '../../hooks/useFetchOrderBaskets';
import UserStorage from '../../services/UserStorage';
import { sendBasketCommentMail } from '../../services/mailjet';

import beautyIngr1 from '../../images/beauty_ingr_1.jpg';
import beautyIngr2 from '../../images/beauty_ingr_2.jpg';
import beautyIngr3 from '../../images/beauty_ingr_3.jpg';

import veggiesPackBgHeader from '../../images/veggies-pack-bg.jpg';
import fruitsBasketBgHeader from '../../images/fruits-basket-bg.jpg';
import chocolatePackBgHeader from '../../images/morning-pack-bg.jpg';
import beautyBasketBgHeader from '../../images/beauty-basket-bg.jpg';
import defaultBgHeader from '../../images/default-bg.jpg';

import './baskets.scss';

const basketsOtherImgs = {
  'beauty': [beautyIngr1, beautyIngr2, beautyIngr3],
};

const QTY_MAX = 5;

const Baskets = () => {
  const [qty, setQty] = useState(1);
  const [isDone, setIsDone] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [baskets, setBaskets] = useFetchOrderBaskets([]);
  const [t, locale] = useTranslate();
  const [commentError, setCommentError] = useState(false);
  const [comment, setComment] = useState('');
  const [isCommentSendingLoading, setIsCommentSendingLoading] = useState(false);
  const [isCommentSent, setIsCommentSent] = useState(false);

  const user = UserStorage.getUser();
  const headers = {
    veggies: { bg: veggiesPackBgHeader, description: t('header.packs_description')},
    morning: { bg: chocolatePackBgHeader, description: t('header.packs_description') },
    fruits: { bg: fruitsBasketBgHeader, description: t('header.baskets_description') },
    beauty: { bg: beautyBasketBgHeader, description: t('header.baskets_description') },
    chocolate: { bg: chocolatePackBgHeader, description: t('header.baskets_description') },
  };
  const type = (typeof window !== 'undefined') ? getQueryParam('type') : '';
  const catType = (typeof window !== 'undefined' && window.location.pathname.includes('packs')) ? 'packs' : 'baskets';
  const basket = baskets.find(b => b.type === type);
  const otherBaskets = basket ? baskets.filter(b => b.type !== basket.type) : [];

  const eventEmitter = new EventEmitter();

  const toggleCartModal = () => {
    setShowCartModal(!showCartModal);
  };

  const getHeader = () => {
    if (headers[type]) {
      return headers[type];
    } else {
      let defaultHeader = { bg: defaultBgHeader };

      if (catType === 'packs') {
        defaultHeader.description = t('header.packs_description');
      } else {
        defaultHeader.description = t('header.baskets_description');
      }

      return defaultHeader;
    }
  };

  const handleCommentChange = (e) => {
    const { value } = e.target;

    setComment(value);
    setCommentError(false);
  };

  const addToCart = async () => {
    await CartStorage.addToCart({ ...basket }, qty);
    setIsDone(true);
    toggleCartModal();
  };

  const sendComment = async () => {
    if (comment !== '') {
      setIsCommentSendingLoading(true);

      await sendBasketCommentMail({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        comment,
        basketType: type,
      });

      setComment('');
      setIsCommentSent(true);
      setIsCommentSendingLoading(false);
    } else {
      setCommentError(true);
    }
  };

  const updateQty = (adding) => {
    let newQty = qty + adding;

    if (newQty > 0 && newQty <= QTY_MAX) {
      setQty(newQty);
    }

    setIsDone(false);
  }

  const goToBasketPage = (type) => {
    if (typeof window !== 'undefined') {
      window.location.assign(`/${catType}?type=${type}`);
		}
  };

  return basket ? (
    <Layout
      className='baskets'
      headerBackground={getHeader().bg}
      headerBackgroundPosition='center center'
      headerDescription={getHeader().description}
    >
      <SEO title='Panier' />

      <section id='basket-to-order'>
        <Row>
          <Col md='4' className='imgs-col'>
            <div className='basket-img-container'>
              <div className='images-container'>
                <img src={getBasketImage(basket.type)} alt={basket.imgAlt} />
                {[0, 1, 2].map(item => (
                  basketsOtherImgs[basket.type] && basketsOtherImgs[basket.type][item] ?
                    <img
                      src={basketsOtherImgs[basket.type][item]}
                      alt={`${basket.type} basket image ${item}`}
                      key={`img-${basket.type}-${item}`}
                    /> :
                    null
                ))}
              </div>
              <p>{t('basket_to_order.photo_disclaimer')}</p>
            </div>
          </Col>
          <Col md='8'>
            <h1>{t(basket.labelTranslate)}</h1>

            <h2>
              <span className='new-price'>{basket.price} € - {basket.priceCFA} FCFA</span>
            </h2>

            <p className='description'>{t(basket.descriptionTranslate)}</p>

            <h3>{t('basket_to_order.basket_contains')}</h3>

            <table>
              {basket.itemsTranslate.map((item, index) => (
                <tr key={index}>
                  <td className='label-column'>{t(`ingredients.${item.label}`)}</td>
                  <td className='qty-column'>x {item.qty}</td>
                </tr>
              ))}
            </table>

            <div className='qty-container'>
              <h4>{t('basket_to_order.qty')}</h4>

              <ButtonGroup className='qty-buttons' variant='contained' color='primary' aria-label='contained primary button group'>
                <Button className='qty-button' onClick={() => updateQty(-1)}>-</Button>
                <Button className='qty-display'>{qty}</Button>
                <Button className='qty-button' onClick={() => updateQty(1)}>+</Button>
              </ButtonGroup>

              {qty === QTY_MAX ? <p className='max-qty-msg'>{t('basket_to_order.max_qty_reached')}</p> : null}

              {isDone ?
                <span className='order-button isDone'>
                  <FaCheck color='#6c6' />
                </span> :
                <button type='button' className='order-button' onClick={addToCart}>{t('basket_to_order.add_to_cart')}</button>
              }
            </div>

            <h3>{t('basket_to_order.other_baskets')}</h3>

            <div className='other-baskets-row'>
              {otherBaskets.map(otherBasket => (
                <div key={otherBasket.type} className='basket-card' onClick={() => goToBasketPage(otherBasket.type)}>
                  <img src={otherBasket.img} />
                  <h4>{t(otherBasket.labelTranslate)}</h4>
                </div>
              ))}
            </div>

            <div className='comment-form'>
              <h3>{t('basket_to_order.suggestion_title')}</h3>

              {!!user ?
                <>
                  <TextField
                    type='text'
                    className='full-width form-input big-form-input'
                    variant='outlined'
                    error={commentError}
                    multiline
                    label='Message'
                    placeholder={t('basket_to_order.suggestion_placeholder')}
                    name='comment'
                    value={comment}
                    onChange={handleCommentChange}
                  />

                  <ButtonWithLoader
                    isLoading={isCommentSendingLoading}
                    label={t('basket_to_order.suggestion_button')}
                    onClick={sendComment}
                    className='send-comment-button'
                    success={isCommentSent}
                    successLabel={`${t('basket_to_order.suggestion_button_success')} ✅`}
                  />
                </> :
                <div className='suggestion-login-container'>
                  <MYFAButton
                    onClick={() => eventEmitter.emit('showLogin')}
                    type='button'
                    label={t('basket_to_order.suggestion_login')}
                  />
                </div>
              }
            </div>
          </Col>
        </Row>

        {showCartModal &&
          <CartModal
            showCartModal={showCartModal}
            toggleCartModal={toggleCartModal}
            basket={basket}
          />
        }
      </section>
    </Layout>
  ) : null;
};

export default Baskets;
