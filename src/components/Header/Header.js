import React, { useEffect, useState } from 'react';
import { Col, Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import Divider from '@material-ui/core/Divider';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import { FaRegTrashAlt, FaShoppingCart, FaUserAlt } from 'react-icons/fa';
import { IoMdMenu } from 'react-icons/io';

import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
import CustomDrawer from '../CustomDrawer';

import EventEmitter from '../../services/EventEmitter';
import CartStorage from '../../services/CartStorage';
import UserStorage from '../../services/UserStorage';
import useDrawerState from '../../hooks/useDrawerState';
import useTranslate from '../../hooks/useTranslate';

import logoHandsSrc from '../../images/logo-1.png';
import logoLettersSrc from '../../images/logo-letters.png';

import './Header.scss';

const STICKY_LIMIT = 300;

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

const getTooltip = (cart, basketsPrice, basketCount, removeBaskets, t, locale) => {
  const goToCart = () => {
    if (typeof window !== 'undefined') {
      window.location.assign(`/${locale}/cart`);
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

          {cart.baskets && Object.keys(cart.baskets).length ?
            <>
              <ul className='baskets-container'>
                {Object.keys(cart.baskets).map((basketKey, index) => (
                  <li key={index}>
                    <Row>
                      <Col xs={0} sm={2} className='image-container d-none d-sm-flex'>
                        <img src={cart.baskets[basketKey].img} />
                      </Col>
                      <Col xs={7} sm={6} className='label-container'>
                        <h4>{t(`home_page.baskets.${basketKey}_basket_title`)}</h4>
                        <p>{cart.baskets[basketKey].price.toFixed(2)} €</p>
                      </Col>
                      <Col xs={5} sm={4} className='qty-container'>
                        <FaRegTrashAlt className='trash-icon' onClick={() => removeBaskets(basketKey)} />
                        <p>{t('header.custom_tooltip.qty')}: {cart.baskets[basketKey].qty}</p>
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
          {basketCount ? <div className='baskets-count'>{basketCount}</div> : null}
        </span>
    </CustomTooltip>
  )
};

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginSignupModal, setShowLoginSignupModal] = useState(false);
  const [switchValue, setSwitchValue] = useState('login');
  const [basketCount, setBasketCount] = useState(0);
  const [user, setUser] = useState(null);
  const [basketsPrice, setBasketsPrice] = useState(0);
  const [cart, setCart] = useState({});
  const [isProfileNavOpen, setIsProfileNavOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [underlinedSection, setUnderlinedSection] = useState('');
  const [t, locale] = useTranslate();
  const [frHref, setFrHref] = useState('/fr');
  const [enHref, setEnHref] = useState('/en');
  const [drawerState, setDrawerState, toggleDrawer] = useDrawerState();

  const eventEmitter = new EventEmitter();

  const DRAWER_LIST = [
    { label: t('header.baskets'), link: `/${locale}/#baskets` },
    { label: t('header.how_it_works'), link: `/${locale}/#how-it-works` },
    { label: t('header.promise'), link: `/${locale}/#our-promise` },
    { label: t('header.team'), link: `/${locale}/team` },
    { label: t('header.blog'), link: `/${locale}/#blog` },
  ];

  useEffect(() => {
    updateCart();
    setLocaleLinks()
    eventEmitter.listen('editCart', updateCart);
    eventEmitter.listen('login', setupLogin);
  }, []);

  useEffect(() => {
    window.onscroll = updateNavbarStickines;
  }, [sticky]);

  useEffect(() => {
    updateBasketsPriceAndNumber();
  }, [cart]);

  useEffect(() => {
    setupLogin();
  }, [showLoginSignupModal]);

  useEffect(() => {
    if (!!user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  const setLocaleLinks = () => {
    const href = window.location.pathname;

    setFrHref(`/fr/${href.substr(4)}`);
    setEnHref(`/en/${href.substr(4)}`);
  };

  const updateNavbarStickines = () => {
    if (window.pageYOffset >= STICKY_LIMIT && !sticky) {
      setSticky(true);
    } else if (window.pageYOffset < STICKY_LIMIT && sticky) {
      setSticky(false);
    }

    let basketsAnchor = document.getElementById('baskets');
    let promiseAnchor = document.getElementById('our-promise');
    let blogAnchor = document.getElementById('blog');

    let basketsHeight = basketsAnchor ? basketsAnchor.offsetTop - 200 : null;
    let promiseHeight = promiseAnchor ? promiseAnchor.offsetTop - 200 : null;
    let blogHeight = blogAnchor ? blogAnchor.offsetTop - 200 : null;
    let cursor = window.pageYOffset;

    if (basketsHeight && promiseHeight && blogHeight) {
      if (cursor < basketsHeight && underlinedSection !== 'home') {
        setUnderlinedSection('home');
      } else if (cursor >= basketsHeight && cursor < promiseHeight && underlinedSection !== 'baskets') {
        setUnderlinedSection('baskets');
      } else if (cursor >= promiseHeight && cursor < blogHeight && underlinedSection !== 'promise') {
        setUnderlinedSection('promise');
      } else if (cursor >= blogHeight && underlinedSection !== 'blog') {
        setUnderlinedSection('blog');
      }
    }
  };

  const setupLogin = () => {
    let userFromStorage = UserStorage.getUser();

    if (!!userFromStorage) {
      setUser({ ...userFromStorage });
    }
  };

  const updateCart = async () => {
    let newCart = await CartStorage.getCartFromStorage();

    if (!!newCart) {
      let enhancedCart = {};

      enhancedCart.baskets = newCart.baskets.reduce((acc, cur) => {
        if (!acc[cur.type]) {
          acc[cur.type] = {
            ...cur,
            price: 0,
            qty: 0,
            label: cur.label,
            singlePrice: cur.price,
            type: cur.type,
            img: cur.img,
            items: cur.items || {},
          };
        }

        acc[cur.type].qty = acc[cur.type].qty + 1;
        acc[cur.type].price = acc[cur.type].price + cur.price;

        return acc;
      }, {});

      let newBasketsPrice = Object.values(enhancedCart.baskets).map(v => v.price).reduce((acc, cur) => acc + cur, 0);

      setCart(enhancedCart);
      setBasketsPrice(newBasketsPrice);
      setBasketCount(newCart.baskets.length);
    } else {
      setCart({});
      setBasketsPrice(0);
      setBasketCount(0);
    }
  };

  const updateBasketsPriceAndNumber = () => {
    if (cart && cart.baskets) {
      let newBasketsPrice = Object.values(cart.baskets).map(v => v.price).reduce((acc, cur) => acc + cur, 0);
      setBasketsPrice(newBasketsPrice);
    }
  };

  const toggleIsProfileNavOpen = () => setIsProfileNavOpen(!isProfileNavOpen);

  const toggleShowLoginSignupModal = () => setShowLoginSignupModal(!showLoginSignupModal);

  const onSignup = () => {
    if (typeof window !== 'undefined') {
      window.location.assign(`/${locale}/profile`);
    }
  };

  const onLogin = () => {
    if (typeof window !== 'undefined') {
      window.location.assign(`/${locale}`);
    }
  };

  const goTo = ({ link }) => {
    if (typeof window !== 'undefined') {
      toggleDrawer('left', false);
      window.location.assign(link);
    }
  };

  const removeBaskets = (basketKey) => {
    CartStorage.deleteBasketsByType(basketKey);

    delete cart.baskets[basketKey];

    if (cart.baskets.length) {
      setBasketCount(cart.baskets.length);
    }

    setCart({ ...cart });
  };

  return (
    <Container id='header'>
      <Navbar expand="lg" className={`${sticky ? 'sticky-navbar justify-content-between': 'justify-content-between'}`}>
        <Button className='drawer-button' onClick={() => toggleDrawer('left', true)}><IoMdMenu /></Button>
        <Nav className='menu'>
          {isLoggedIn ?
            <NavDropdown
              onMouseEnter={toggleIsProfileNavOpen}
              onMouseLeave={toggleIsProfileNavOpen}
              show={isProfileNavOpen}
              title={<span className='profile-link'><FaUserAlt /> <span>{user.firstname}</span></span>}
              className='account'
            >
              <NavDropdown.Item href={`/${locale}/profile/information`}>{t('header.profile.information')}</NavDropdown.Item>
              <NavDropdown.Item href={`/${locale}/profile/orders`}>{t('header.profile.orders')}</NavDropdown.Item>
              <NavDropdown.Item href={`/${locale}/profile/password`}>{t('header.profile.password')}</NavDropdown.Item>
              <NavDropdown.Item href={`/${locale}/profile/relatives`}>{t('header.profile.relatives')}</NavDropdown.Item>
              <NavDropdown.Item href='/logout'>{t('header.profile.logout')}</NavDropdown.Item>
            </NavDropdown> :
            <Nav.Link className='account' href='#' onClick={toggleShowLoginSignupModal}>{t('header.profile.account')}</Nav.Link>
          }
          <Nav.Link href={`/${locale}/cart`} className='basket-link'>
            {cart && getTooltip(cart, basketsPrice, basketCount, removeBaskets, t, locale)}
          </Nav.Link>
          <Nav.Link className='en-link' href={enHref}>EN</Nav.Link>
          <Nav.Link className='fr-link' href={frHref}>FR</Nav.Link>
        </Nav>
      </Navbar>

      <CustomDrawer
        anchor='left'
        state={drawerState}
        onItemClick={goTo}
        toggleDrawer={() => toggleDrawer('left', false)}
        list={DRAWER_LIST}
      />

      {showLoginSignupModal && <Modal show={showLoginSignupModal} onHide={toggleShowLoginSignupModal} id='account-modal'>
        <Modal.Header closeButton />
        <Modal.Body>
          <div className='form-container'>
            <img src={logoHandsSrc} alt='logo' className='logo-big' />
            <ButtonGroup className='login-signup-switch' aria-label="outlined primary button group">
              <Button className={`switch-button ${switchValue === 'login' ? 'active' : ''}`} onClick={() => setSwitchValue('login')}>{t('header.login_signup_modal.login_button')}</Button>
              <Button className={`switch-button ${switchValue === 'signup' ? 'active' : ''}`} onClick={() => setSwitchValue('signup')}>{t('header.login_signup_modal.signup_button')}</Button>
            </ButtonGroup>
            {switchValue === 'login' ?
              <LoginForm onLogin={onLogin} /> :
              <SignupForm onSignup={onSignup} />
            }
          </div>
        </Modal.Body>
      </Modal>}
    </Container>
  );
}

export default Header
