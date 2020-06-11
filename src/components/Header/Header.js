import React, { lazy, useEffect, useState, Suspense } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Divider from '@material-ui/core/Divider';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import { FaRegTrashAlt, FaShoppingCart, FaUserAlt } from 'react-icons/fa';
import { IoMdMenu } from 'react-icons/io';
import i18next from 'i18next';
import { navigate } from "@reach/router";

const LoginForm = lazy(() => import('../LoginForm'));
const SignupForm = lazy(() => import('../SignupForm'));
const CustomDrawer = lazy(() => import('../CustomDrawer'));

import EventEmitter from '../../services/EventEmitter';
import CartStorage from '../../services/CartStorage';
import UserStorage from '../../services/UserStorage';
import useDrawerState from '../../hooks/useDrawerState';
import useTranslate from '../../hooks/useTranslate';
import uniqBy from '../../utils/uniqBy';
import countBy from '../../utils/countBy';

import logoHandsSrc from '../../images/logo-1.png';
import basketsImgs from '../../assets/basketsImgs';

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

const DisplayTooltip = ({ cart, removeBaskets, t }) => {
  const [basketsCount, setBasketsCount] = useState(0);
  const [basketsPrice, setBasketsPrice] = useState(0);

  useEffect(() => {
    if (!!cart && !!cart.baskets) {
      setBasketsCount(cart.baskets.length);
      setBasketsPrice(calculatePrice());
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
                        <img src={basketsImgs[basket.type]} />
                      </Col>
                      <Col xs={7} sm={6} className='label-container'>
                        <h4>{t(`home_page.baskets.${basket.type}_basket_title`)}</h4>
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

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginSignupModal, setShowLoginSignupModal] = useState(false);
  const [switchValue, setSwitchValue] = useState('login');
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState({});
  const [isProfileNavOpen, setIsProfileNavOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [underlinedSection, setUnderlinedSection] = useState('');
  const [t] = useTranslate();
  const [drawerState, setDrawerState, toggleDrawer] = useDrawerState();

  const eventEmitter = new EventEmitter();

  const DRAWER_LIST = [
    { label: t('header.home'), link: '/' },
    { label: t('header.baskets'), link: '/#baskets' },
    { label: t('header.how_it_works'), link: '/#how-it-works' },
    { label: t('header.promise'), link: '/#our-promise' },
    { label: t('header.team'), link: '/team' },
    { label: t('header.blog'), link: '/#blog' },
    { label: t('header.we_recruit'), link: '/jobs' },
  ];

  useEffect(() => {
    updateCart();
    eventEmitter.listen('editCart', updateCart);
    eventEmitter.listen('login', setupLogin);
    eventEmitter.listen('showLogin', toggleShowLoginSignupModal);
  }, []);

  useEffect(() => {
    window.onscroll = updateNavbarStickines;
  }, [sticky]);

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
      setCart(newCart);
    } else {
      setCart({});
    }
  };

  const toggleIsProfileNavOpen = () => setIsProfileNavOpen(!isProfileNavOpen);

  const toggleShowLoginSignupModal = () => setShowLoginSignupModal(!showLoginSignupModal);

  const onSignup = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  const onLogin = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  const goTo = ({ link }) => {
    if (typeof window !== 'undefined') {
      toggleDrawer('left', false);
      navigate(link);
    }
  };

  const removeBaskets = (basketKey) => {
    CartStorage.deleteBasketsByType(basketKey);
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
              <NavDropdown.Item href='/profile/information'>{t('header.profile.information')}</NavDropdown.Item>
              <NavDropdown.Item href='/profile/orders'>{t('header.profile.orders')}</NavDropdown.Item>
              <NavDropdown.Item href='/profile/password'>{t('header.profile.password')}</NavDropdown.Item>
              <NavDropdown.Item href='/profile/relatives'>{t('header.profile.relatives')}</NavDropdown.Item>
              <NavDropdown.Item href='/logout'>{t('header.profile.logout')}</NavDropdown.Item>
            </NavDropdown> :
            <Nav.Link className='account' href='#' onClick={toggleShowLoginSignupModal}>{t('header.profile.account')}</Nav.Link>
          }
          <Nav.Link href='/cart' className='basket-link'>
            <DisplayTooltip cart={cart} removeBaskets={removeBaskets} t={t} />
          </Nav.Link>
          <Nav.Link className='en-link' href='#' onClick={() => i18next.changeLanguage('en')}>EN</Nav.Link>
          <Nav.Link className='fr-link' href='#' onClick={() => i18next.changeLanguage('fr')}>FR</Nav.Link>
        </Nav>
      </Navbar>

      <Suspense fallback={'LOADING'}>
        <CustomDrawer
          anchor='left'
          state={drawerState}
          onItemClick={goTo}
          toggleDrawer={() => toggleDrawer('left', false)}
          list={DRAWER_LIST}
        />
      </Suspense>

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
              <Suspense fallback={'LOADING'}>
                <LoginForm onLogin={onLogin} />
              </Suspense> :
              <Suspense fallback={'LOADING'}>
                <SignupForm onSignup={onSignup} />
              </Suspense>
            }
          </div>
        </Modal.Body>
      </Modal>}
    </Container>
  );
}

export default Header
