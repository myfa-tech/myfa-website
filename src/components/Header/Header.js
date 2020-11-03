import React from 'react'

import myfaLogoSrc from '../../images/logo-1.png';
import Button from '../Button';

import './Header.scss';

const Header = () => {
  return (
    <div id='header'>
      <div id='left-items'>
        <a href='/'><img id='header-logo' src={myfaLogoSrc} /></a>
        <ul className='menu'>
          <li className='menu-item'><a href='/prestations'>Prestations</a></li>
          <li className='menu-item'><a href='/tarifs'>Tarifs</a></li>
          <li className='menu-item'><a href='/aboutus'>Qui sommes-nous ?</a></li>
          <li className='menu-item'><a href='/blog'>Blog</a></li>
        </ul>
      </div>
      <div id='right-items'>
        <Button label='Se connecter' className='header-login-btn' />
      </div>
    </div>
  );
};

export default Header;
