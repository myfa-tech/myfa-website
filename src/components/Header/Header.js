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

import './Header.scss';

const STICKY_LIMIT = 300;

const Header = ({ hideHeader, headerBackground, headerDescription, headerBackgroundPosition }) => {
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
    { label: t('header.all_products'), link: '/#details' },
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
    <div id='header' className={headerBackground ? 'header-image-description' : ''} style={{ backgroundImage: `url(${headerBackground})`, backgroundPosition: headerBackgroundPosition }}>
      <div expand="lg" className={`header-items ${sticky ? 'sticky-navbar': ''}`} style={{ backgroundImage: (sticky && headerBackground) ? `url(${headerBackground})` : '' }}>
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

        {sticky ? <div className='sticky-title'>
          {headerDescription ? <h2>{headerDescription}</h2> :
            <h2>{t('header.sticky.home')}</h2>
          }
        </div> : null}
      </div>

      {headerDescription ? <div className='header-description'>
        <span>{headerDescription}</span>
      </div> : null}

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
