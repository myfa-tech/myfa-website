import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { FaShoppingCart } from 'react-icons/fa';

import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
import EventEmitter from '../../services/EventEmitter';

import logoHandsSrc from '../../images/logo-1.png';
import logoLettersSrc from '../../images/logo-letters.png';

import './Header.scss';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginSignupModal, setShowLoginSignupModal] = useState(false);
  const [switchValue, setSwitchValue] = useState('login');
  const [basketCount, setBasketCount] = useState(0);
  const eventEmitter = new EventEmitter();

  const updateCartCount = () => {
    let cart = JSON.parse(window.localStorage.getItem('cart'));

    if (cart) {
      setBasketCount(cart.length);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      updateCartCount();

      eventEmitter.listen('editCart', updateCartCount);
    }
  }, []);

  useEffect(() => {
    if (!!window.localStorage.getItem('user')) {
      setIsLoggedIn(true);
    }
  }, [showLoginSignupModal]);

  const toggleShowLoginSignupModal = () => setShowLoginSignupModal(!showLoginSignupModal);

  const onSignup = () => {
    if (typeof window !== 'undefined') {
      window.location.assign('/profile');
    }
  };

  const onLogin = () => {
    if (typeof window !== 'undefined') {
      window.location.assign('/profile');
    }
  };

  return (
    <Container id='header'>
      <Navbar expand="lg">
        <Navbar.Brand href="/">
          <img src={logoLettersSrc} alt='logo' className='logo' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className='menu'>
            <Nav.Link href="/#home">Accueil</Nav.Link>
            <Nav.Link href="/#baskets">Nos paniers</Nav.Link>
            <Nav.Link href="/#our-promise">Notre Promesse</Nav.Link>
            <Nav.Link href="/#team">L'équipe</Nav.Link>
            {isLoggedIn ?
              <NavDropdown title='Mon compte' className='account'>
                <NavDropdown.Item href="/profile/information">Mes informations</NavDropdown.Item>
                <NavDropdown.Item href='/profile/orders'>Mes commandes</NavDropdown.Item>
                <NavDropdown.Item href='/profile/password'>Changer mon mot de passe</NavDropdown.Item>
                <NavDropdown.Item href='/profile/relatives'>Mes proches</NavDropdown.Item>
                <NavDropdown.Item href='/logout'>Déconnexion</NavDropdown.Item>
              </NavDropdown> :
              <Nav.Link className='account' href='#' onClick={toggleShowLoginSignupModal}>Mon compte</Nav.Link>
            }
            <Nav.Link href="/cart" className='basket-link'>
              <FaShoppingCart />
              {basketCount ? <div className='baskets-count'>{basketCount}</div> : null}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {showLoginSignupModal && <Modal show={showLoginSignupModal} onHide={toggleShowLoginSignupModal} id='account-modal'>
        <Modal.Body>
          <div className='form-container'>
            <img src={logoHandsSrc} alt='logo' className='logo-big' />
            <ButtonGroup className='login-signup-switch' aria-label="outlined primary button group">
              <Button className={`switch-button ${switchValue === 'login' ? 'active' : ''}`} onClick={() => setSwitchValue('login')}>Se connecter</Button>
              <Button className={`switch-button ${switchValue === 'signup' ? 'active' : ''}`} onClick={() => setSwitchValue('signup')}>S'inscrire</Button>
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
