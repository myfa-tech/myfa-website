import React, { lazy, useEffect, useState, Suspense } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import Modal from 'react-bootstrap/Modal';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { FaUserAlt } from 'react-icons/fa';
import { IoMdMenu } from 'react-icons/io';
import i18next from 'i18next';
import { navigate } from "@reach/router";

import SectionLoader from '../SectionLoader';
const LoginForm = lazy(() => import('../LoginForm'));
const SignupForm = lazy(() => import('../SignupForm'));
const CustomDrawer = lazy(() => import('../CustomDrawer'));
const DisplayTooltip = lazy(() => import('./DisplayTooltip'));

import EventEmitter from '../../services/EventEmitter';
import CartStorage from '../../services/CartStorage';
import UserStorage from '../../services/UserStorage';
import useDrawerState from '../../hooks/useDrawerState';
import useTranslate from '../../hooks/useTranslate';

import logoHandsSrc from '../../images/logo-1.png';
import defaultBackground from '../../images/default-bg.jpg';

import './Header.scss';

const STICKY_LIMIT = 300;

const Header = ({ headerBackground, headerDescription, headerBackgroundPosition, stickyHeaderBackgroundPosition }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginSignupModal, setShowLoginSignupModal] = useState(false);
  const [switchValue, setSwitchValue] = useState('login');
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState({});
  const [isProfileNavOpen, setIsProfileNavOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [t] = useTranslate();
  const [drawerState, setDrawerState, toggleDrawer] = useDrawerState();

  const DEFAULT_HEADER_DESCRIPTION = t('home_page.home.welcome_title');

  const eventEmitter = new EventEmitter();

  const DRAWER_LIST = [
    { label: t('header.home'), link: '/' },
    { label: t('header.all_products'), link: '/#bestsellers' },
    { label: t('header.supply_packs'), link: '/#packs' },
    { label: t('header.gifts_baskets'), link: '/#pleasure-baskets' },
    { label: t('header.ratings'), link: '/ratings' },
    { label: t('header.faq'), link: '/faq' },
  ];

  useEffect(() => {
    updateCart();
    eventEmitter.listen('editCart', updateCart);
    eventEmitter.listen('login', setupLogin);
    eventEmitter.listen('showLogin', toggleShowLoginSignupModal);
  }, []);

  useEffect(() => {
    window.onscroll = updateNavbarStickiness;
  }, [sticky]);

  useEffect(() => {
    setupLogin();
  }, [showLoginSignupModal]);

  useEffect(() => {
    if (!!user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  const updateNavbarStickiness = () => {
    if (window.pageYOffset >= STICKY_LIMIT && !sticky) {
      setSticky(true);
    } else if (window.pageYOffset < STICKY_LIMIT && sticky) {
      setSticky(false);
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

  const removeProduct = (productIndex) => {
    CartStorage.deleteProductByIndex(productIndex);
  };

  return (
    <div id='header' className='header-image-description' style={{ backgroundImage: `url(${headerBackground || defaultBackground})`, backgroundPosition: headerBackgroundPosition || 'center center' }}>
      <div expand="lg" className='header-items'>
        <div className='navbar-header'>
          <Button className='drawer-button' onClick={() => toggleDrawer('left', true)}><IoMdMenu /></Button>
          <span className='menu'>
            {isLoggedIn ?
              <Dropdown className='profile-btn'>
                <Dropdown.Toggle
                  onMouseEnter={toggleIsProfileNavOpen}
                  onMouseLeave={toggleIsProfileNavOpen}
                  show={isProfileNavOpen}
                  className='account'
                >
                  <span className='profile-link'><FaUserAlt /> <span>{user.firstname}</span></span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href='/profile/information'>{t('header.profile.information')}</Dropdown.Item>
                  <Dropdown.Item href='/profile/orders'>{t('header.profile.orders')}</Dropdown.Item>
                  <Dropdown.Item href='/profile/password'>{t('header.profile.password')}</Dropdown.Item>
                  <Dropdown.Item href='/profile/relatives'>{t('header.profile.relatives')}</Dropdown.Item>
                  <Dropdown.Item href='/logout'>{t('header.profile.logout')}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> :
              <a className='account' href='#' onClick={toggleShowLoginSignupModal}>{t('header.profile.account')}</a>
            }
            <a href='/cart' className='basket-link'>
              <Suspense fallback=''>
                <DisplayTooltip cart={cart} removeBaskets={removeBaskets} removeProduct={removeProduct} t={t} />
              </Suspense>
            </a>
            <a className='en-link' href='#' onClick={() => i18next.changeLanguage('en')}>EN</a>
            <a className='fr-link' href='#' onClick={() => i18next.changeLanguage('fr')}>FR</a>
          </span>
        </div>
      </div>

      {sticky ? <div expand="lg" className='header-items sticky-navbar' style={{ backgroundImage: `url(${headerBackground || defaultBackground})`, backgroundPosition: (stickyHeaderBackgroundPosition || 'center center') }}>
        <div className='navbar-header'>
          <Button className='drawer-button' onClick={() => toggleDrawer('left', true)}><IoMdMenu /></Button>
          <span className='menu'>
            {isLoggedIn ?
              <Dropdown className='profile-btn'>
                <Dropdown.Toggle
                  onMouseEnter={toggleIsProfileNavOpen}
                  onMouseLeave={toggleIsProfileNavOpen}
                  show={isProfileNavOpen}
                  className='account'
                >
                  <span className='profile-link'><FaUserAlt /> <span>{user.firstname}</span></span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href='/profile/information'>{t('header.profile.information')}</Dropdown.Item>
                  <Dropdown.Item href='/profile/orders'>{t('header.profile.orders')}</Dropdown.Item>
                  <Dropdown.Item href='/profile/password'>{t('header.profile.password')}</Dropdown.Item>
                  <Dropdown.Item href='/profile/relatives'>{t('header.profile.relatives')}</Dropdown.Item>
                  <Dropdown.Item href='/logout'>{t('header.profile.logout')}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> :
              <a className='account' href='#' onClick={toggleShowLoginSignupModal}>{t('header.profile.account')}</a>
            }
            <a href='/cart' className='basket-link'>
              <Suspense fallback=''>
                <DisplayTooltip cart={cart} removeBaskets={removeBaskets} t={t} />
              </Suspense>
            </a>
            <a className='en-link' href='#' onClick={() => i18next.changeLanguage('en')}>EN</a>
            <a className='fr-link' href='#' onClick={() => i18next.changeLanguage('fr')}>FR</a>
          </span>
        </div>

        <div className='sticky-title'>
          {headerDescription ? <h2>{headerDescription}</h2> :
            <h2>{t('header.sticky.home')}</h2>
          }
        </div>
      </div> : null}

      <div className='header-description'>
        <span>{headerDescription || DEFAULT_HEADER_DESCRIPTION}</span>
      </div>

      <Suspense fallback=''>
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
              <Suspense fallback={<SectionLoader />}>
                <LoginForm onLogin={onLogin} />
              </Suspense> :
              <Suspense fallback={<SectionLoader />}>
                <SignupForm onSignup={onSignup} />
              </Suspense>
            }
          </div>
        </Modal.Body>
      </Modal>}
    </div>
  );
}

export default Header
