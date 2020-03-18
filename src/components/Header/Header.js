import React, { useEffect, useState } from 'react';
import { Col, Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import Divider from '@material-ui/core/Divider';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import { FaRegTrashAlt, FaShoppingCart, FaUserAlt } from 'react-icons/fa';

import useTranslate from '../../hooks/useTranslate';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
import EventEmitter from '../../services/EventEmitter';

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

const getTooltip = (cart, basketsPrice, basketCount, removeBaskets) => {
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
          <h3 className='title'>Mon panier</h3>

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
                        <h4>{cart.baskets[basketKey].label}</h4>
                        <p>{cart.baskets[basketKey].price.toFixed(2)} €</p>
                      </Col>
                      <Col xs={5} sm={4} className='qty-container'>
                        <FaRegTrashAlt className='trash-icon' onClick={() => removeBaskets(basketKey)} />
                        <p>Quantité: {cart.baskets[basketKey].qty}</p>
                      </Col>
                      <Col></Col>
                    </Row>
                  </li>
                ))}
              </ul>

              <Divider variant='middle' />

              <div className='price-container'>
                <h3>Total TTC</h3>
                <h3>{basketsPrice.toFixed(2)} €</h3>
              </div>

              <Divider variant='middle' />

              <button className='pay-button' onClick={goToCart}>Payer</button>
            </> :
            <div className='empty-cart'>
              <p>Votre panier est vide</p>
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
  const [t] = useTranslate();

  const eventEmitter = new EventEmitter();

  const updateCartCount = () => {
    let cart = JSON.parse(window.localStorage.getItem('cart'));

    if (cart) {
      setBasketCount(cart.length);
    }
  };

  useEffect(() => {
    updateCart();
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

  const updateNavbarStickines = () => {
    if (window.pageYOffset >= STICKY_LIMIT && !sticky) {
      setSticky(true);
    } else if (window.pageYOffset < STICKY_LIMIT && sticky) {
      setSticky(false);
    }

    let basketsAnchor = document.getElementById('baskets');
    let promiseAnchor = document.getElementById('our-promise');
    let teamAnchor = document.getElementById('team');
    let newsAnchor = document.getElementById('news');

    let basketsHeight = basketsAnchor ? basketsAnchor.offsetTop - 200 : null;
    let promiseHeight = promiseAnchor ? promiseAnchor.offsetTop - 200 : null;
    let teamHeight = teamAnchor ? teamAnchor.offsetTop - 200 : null;
    let newsHeight = newsAnchor ? newsAnchor.offsetTop - 200 : null;
    let cursor = window.pageYOffset;

    if (basketsHeight && promiseHeight && teamHeight) {
      if (cursor < basketsHeight && underlinedSection !== 'home') {
        setUnderlinedSection('home');
      } else if (cursor >= basketsHeight && cursor < promiseHeight && underlinedSection !== 'baskets') {
        setUnderlinedSection('baskets');
      } else if (cursor >= promiseHeight && cursor < teamHeight && underlinedSection !== 'promise') {
        setUnderlinedSection('promise');
      } else if (cursor >= teamHeight && cursor < newsHeight && underlinedSection !== 'team') {
        setUnderlinedSection('team');
      } else if (cursor >= newsHeight && underlinedSection !== 'news') {
        setUnderlinedSection('news');
      }
    }
  };

  const setupLogin = () => {
    let userFromStorage = JSON.parse(window.localStorage.getItem('user'));

    if (!!userFromStorage) {
      setUser({ ...userFromStorage });
    }
  };

  const updateCart = () => {
    if (typeof window !== 'undefined') {
      let newCart = JSON.parse(window.localStorage.getItem('cart'));

      if (!!newCart) {
        let enhancedCart = {};

        enhancedCart.baskets = newCart.reduce((acc, cur) => {
          if (!acc[cur.type]) {
            acc[cur.type] = {
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
        setBasketCount(newCart.length);
      }
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
      window.location.assign('/profile');
    }
  };

  const onLogin = () => {
    if (typeof window !== 'undefined') {
      window.location.assign('/');
    }
  };

  const removeBaskets = (basketKey) => {
    const savedCart = JSON.parse(window.localStorage.getItem('cart'));

    let filteredCart = savedCart.filter(b => b.type !== basketKey);

    window.localStorage.setItem('cart', JSON.stringify(filteredCart));

    updateCartCount();

    eventEmitter.emit('editCart');

    delete cart.baskets[basketKey];
    setCart({ ...cart });
  };

  return (
    <Container id='header'>
      <Navbar expand="lg" className={`${sticky ? 'sticky-navbar': ''}`}>
        <Navbar.Brand href="/">
          <img src={logoLettersSrc} alt='logo' className='logo' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className='menu'>
            <Nav.Link className={`${underlinedSection === 'home' ? 'underlined' : ''}`} href="/#home">{t('header.home')}</Nav.Link>
            <Nav.Link className={`${underlinedSection === 'baskets' ? 'underlined' : ''}`} href="/#baskets">{t('header.baskets')}</Nav.Link>
            <Nav.Link className={`${underlinedSection === 'promise' ? 'underlined' : ''}`} href="/#our-promise">{t('header.promise')}</Nav.Link>
            <Nav.Link className={`${underlinedSection === 'team' ? 'underlined' : ''}`} href="/#team">{t('header.team')}</Nav.Link>
            <Nav.Link className={`${underlinedSection === 'news' ? 'underlined' : ''}`} href="/#news">{t('header.news')}</Nav.Link>
            {isLoggedIn ?
              <NavDropdown
                onMouseEnter={toggleIsProfileNavOpen}
                onMouseLeave={toggleIsProfileNavOpen}
                show={isProfileNavOpen}
                title={<span className='profile-link'><FaUserAlt /> <span>{user.firstname}</span></span>}
                className='account'
              >
                <NavDropdown.Item href="/profile/information">{t('header.profile.information')}</NavDropdown.Item>
                <NavDropdown.Item href='/profile/orders'>{t('header.profile.orders')}</NavDropdown.Item>
                <NavDropdown.Item href='/profile/password'>{t('header.profile.password')}</NavDropdown.Item>
                <NavDropdown.Item href='/profile/relatives'>{t('header.profile.relatives')}</NavDropdown.Item>
                <NavDropdown.Item href='/logout'>{t('header.profile.logout')}</NavDropdown.Item>
              </NavDropdown> :
              <Nav.Link className='account' href='#' onClick={toggleShowLoginSignupModal}>{t('header.profile.account')}</Nav.Link>
            }
            <Nav.Link href="/cart" className='basket-link'>
              {cart && getTooltip(cart, basketsPrice, basketCount, removeBaskets)}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {showLoginSignupModal && <Modal show={showLoginSignupModal} onHide={toggleShowLoginSignupModal} id='account-modal'>
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
