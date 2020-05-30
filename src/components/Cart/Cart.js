import React, { useEffect, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import { Row, Col } from 'react-bootstrap';

import CartItems from './CartItems';
import MessageToRelative from './MessageToRelative';
import ButtonWithLoader from '../ButtonWithLoader';
import AddRecipientModal from './AddRecipientModal';

import { addRecipient } from '../../services/users';
import stripeService from '../../services/stripe';
import EventEmitter from '../../services/EventEmitter';
import useTranslate from '../../hooks/useTranslate';
import UserStorage from '../../services/UserStorage';
import CartStorage from '../../services/CartStorage';
import mobileMoney from '../../services/mobileMoney';
import some from '../../utils/some';

import './Cart.scss';

const NODE_ENV = process.env.NODE_ENV;

const Cart = () => {
  const [cart, setCart] = useState({});
  const [basketsPrice, setBasketsPrice] = useState(0);
  const [basketsNumber, setBasketsNumber] = useState(0);
  const [step, setStep] = useState(1);
  const [recipientsErrors, setRecipientsErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [showAddRecipientModal, setShowAddRecipientModal] = useState(false);
  const [basketAddingRecipientIndex, setBasketAddingRecipientIndex] = useState(null);

  const [t] = useTranslate();

  const user = UserStorage.getUser();
  const eventEmitter = new EventEmitter();

  useEffect(() => {
    initCart();
    eventEmitter.listen('editCart', initCart);
  }, []);

  const initCart = async () => {
    let newCart = await CartStorage.getCartFromStorage();

    if (!!newCart && !!newCart.baskets) {
      let newBasketsNumber = newCart.baskets.length;
      let newBasketsPrice = newCart.baskets.map(b => b.price).reduce((acc, cur) => acc + cur, 0);

      setCart(newCart);
      setBasketsNumber(newBasketsNumber);
      setBasketsPrice(newBasketsPrice);
    } else {
      setCart({});
      setBasketsNumber(0);
      setBasketsPrice(0);
    }

    setIsFetching(false);
  };

  const triggerLoginSignupModal = () => {
    eventEmitter.emit('showLogin');
  };

  const toggleAddRecipientModal = () => setShowAddRecipientModal(!showAddRecipientModal);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const getRecipientsErrors = () => {
    const errors = [];

    cart.baskets.forEach((b, index) => {
      if (!b.recipient) {
        errors.push(`recipient-${index}`)
      }
    });

    return errors;
  };

  const goToStep = (stepId) => {
    if ((stepId === 2 && !!user) ||
      ((stepId === 3 || stepId === 4) && !user)) {
      return;
    }

    setStep(stepId);
  };

  const handleNext = (e) => {
    if (step === 1) {
      if (!!user) {
        const errors = getRecipientsErrors();

        if (!!errors.length) {
          setRecipientsErrors([...errors]);
        } else {
          nextStep(3);
        }
      } else {
        triggerLoginSignupModal();
      }
    } else if (step === 4) {
      pay();
    } else {
      nextStep();
    }
  };

  function nextStep(increment = 1) {
    setStep(step + increment);
    scrollToTop();
  };

  const handleChangeRecipient = (e, basketIndex) => {
    if (!user) {
      triggerLoginSignupModal();
    } else {
      const errors = recipientsErrors.filter(err => err !== `recipient-${basketIndex}`);

      setRecipientsErrors([...errors]);

      if (e.target.value === 'add-one') {
        setBasketAddingRecipientIndex(basketIndex);
        toggleAddRecipientModal();
      } else {
        cart.baskets[basketIndex].recipient = JSON.parse(e.target.value);

        CartStorage.editCart({ ...cart });
      }
    }
  };

  const handleChangeMessageToRelative = (message) => {
    setCart({ ...cart, message });
  };

  const removeBasket = (basketIndex) => {
    CartStorage.deleteBasketByIndex(basketIndex);
  };

  async function pay() {
    const user = UserStorage.getUser();

    setIsLoading(true);

    const promises = [];

    if (NODE_ENV === 'development') {
      cart.isTest = true;
    }

    promises.push(stripeService.createPayment(cart, user));

    if (!some(user.recipients, relativeFormValues)) {
      promises.push(addRecipient(relativeFormValues));
    }

    await Promise.all(promises);

    emptyStoredCart();
    setIsLoading(false);
  };

  async function checkoutWithMTNOrangeMoney() {
    const user = UserStorage.getUser();

    setIsLoading(true);

    cart.recipient = relativeFormValues;
    cart.price = basketsPrice;

    const promises = [];

    if (NODE_ENV === 'development') {
      cart.isTest = true;
    }

    promises.push(mobileMoney.createPayment(cart, user));

    if (!some(user.recipients, relativeFormValues)) {
      promises.push(addRecipient(relativeFormValues));
    }

    await Promise.all(promises);

    emptyStoredCart();
    setIsLoading(false);
  };

  const emptyStoredCart = async () => {
    await CartStorage.deleteCart();
  };

  return (
    <section id='cart'>
      {!isFetching ?
        cart && cart.baskets && Object.keys(cart.baskets).length ?
          <Row>
            <Col md='8'>
              {step === 1 ?
                <CartItems
                  cart={cart}
                  errors={recipientsErrors}
                  handleChangeRecipient={handleChangeRecipient}
                  basketsPrice={basketsPrice}
                  removeBasket={removeBasket}
                  user={user}
                /> :
                <div className='disabled-section' onClick={() => goToStep(1)}>
                  <h2>{t('cart.items.title')}</h2>
                </div>
              }
              {step === 4 ?
                <MessageToRelative
                  message={cart.message}
                  handleChangeMessage={handleChangeMessageToRelative}
                /> :
                <div className={`disabled-section message-to-relative ${!user ? 'cannot-click' : ''}`} onClick={() => goToStep(4)}>
                  <h2>{t('cart.message_to_relative_title')}</h2>
                </div>
              }
            </Col>
            <Col md='4'>
              <div className='price-container'>
                <h2>{t('cart.price_container.total')}</h2>

                <Divider variant='middle' />

                <div className='content-container'>
                  <p>{basketsNumber} {t('cart.price_container.baskets')} : {basketsPrice.toFixed(2)} €</p>
                  <p>{t('cart.price_container.grand_total')} : {basketsPrice.toFixed(2)} €</p>
                </div>

                <Divider variant='middle' className='second-divider' />

                {(step <= 3) ?
                  <ButtonWithLoader
                    isLoading={isLoading}
                    label={t('cart.price_container.next')}
                    onClick={handleNext}
                    className='next-button'
                  /> :
                  <>
                    <ButtonWithLoader
                      isLoading={isLoading}
                      label={t('cart.price_container.pay_by_card')}
                      onClick={handleNext}
                      className='next-button pay-by-card-btn'
                    />
                    <ButtonWithLoader
                      isLoading={isLoading}
                      label={t('cart.price_container.orange_mtn_button')}
                      onClick={checkoutWithMTNOrangeMoney}
                      className='next-button'
                    />
                  </>
                }

                <p className='covid19-warning'>{t('cart.price_container.covid19_warning')}</p>
              </div>
            </Col>
          </Row> :
          <div className='empty-cart-container'>
            <p>{t('cart.empty_cart')}</p>
            <a href='/#baskets' className='discover-baskets-button'>{t('cart.discover_baskets')}</a>
          </div> :
      null}
      <AddRecipientModal
        cart={cart}
        showModal={showAddRecipientModal}
        toggleModal={toggleAddRecipientModal}
        basketIndex={basketAddingRecipientIndex}
      />
    </section>
  );
};

export default Cart;
