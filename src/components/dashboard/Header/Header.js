import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { isAdminLoggedIn } from '../../../services/auth';

import './Header.scss';
import logoSrc from '../../../images/logo-1.png';

const Header = () => (
  <Container>
    <Navbar expand='lg'>
      <Navbar.Brand href='/dashboard'>
        <img src={logoSrc} alt='logo' className='logo' />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse className='justify-content-end'>
        <Nav className='menu'>
          {isAdminLoggedIn() ?
            <Nav.Link href='/logout'>Logout</Nav.Link> :
            <Nav.Link href='/'>Accueil</Nav.Link>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Container>
);

export default Header;
