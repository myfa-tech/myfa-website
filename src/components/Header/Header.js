import React, { Suspense } from 'react'
import { IoMdMenu } from 'react-icons/io';
import { navigate } from "@reach/router";

import myfaLogoSrc from '../../images/logo-1.png';
import Button from '../Button';
import CustomDrawer from '../CustomDrawer';

import useDrawerState from '../../hooks/useDrawerState';

import './Header.scss';

const DRAWER_LIST = [
  { label: 'Accueil', link: '/' },
  { label: 'Prestations', link: '/#prestations' },
  { label: 'Tarifs', link: '/#tarifs' },
  { label: 'Qui sommes-nous ?', link: '/aboutus' },
  { label: 'Blog', link: '/blog' },
];

const Header = () => {
  const { state: drawerState, toggleDrawer } = useDrawerState();

  const goTo = ({ link }) => {
    if (typeof window !== 'undefined') {
      toggleDrawer('left', false);
      navigate(link);
    }
  };

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
        <Button href='/login' label='Se connecter' className='header-login-btn' />
        <Button className='drawer-button' label={<IoMdMenu />} onClick={() => toggleDrawer('left', true)} />
      </div>

      <Suspense fallback=''>
        <CustomDrawer
          anchor='right'
          state={drawerState}
          onItemClick={goTo}
          toggleDrawer={() => toggleDrawer('right', false)}
          list={DRAWER_LIST}
        />
      </Suspense>
    </div>
  );
};

export default Header;
