import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { isAdminLoggedIn } from '../../../services/auth';

import './Header.scss';
import logoSrc from '../../../images/logo-1.png';

const Header = () => (
  <div className='header-container'>
    <a href='/dashboard'>
      <img src={logoSrc} alt='logo' className='logo' />
    </a>
    <a href='/logout'>Logout</a>
  </div>
);

export default Header;
