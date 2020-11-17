import React, { Suspense, useState } from 'react'
import { IoMdMenu } from 'react-icons/io';
import { navigate } from "@reach/router";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import myfaLogoSrc from '../../images/logo-1.png';
import Button from '../Button';
import CustomDrawer from '../CustomDrawer';

import useDrawerState from '../../hooks/useDrawerState';

import './Header.scss';

const DRAWER_LIST = [
  { label: 'Accueil', link: '/' },
  { label: 'Prestations', link: '/#our-service-section' },
  { label: 'Tarifs', link: '/#prices-section' },
  {
    label: 'Qui sommes-nous ?',
    items: [
      { label: "L'équipe", link: '/team' },
      { label: 'Avis des clients', link: '/ratings' },
      { label: 'Questions fréquentes', link: '/faq' },
    ],
  },
  { label: 'Blog', link: '/blog' },
  { label: 'Me faire rappeler', link: '/#need-section', type: 'button' },
];

const Header = () => {
  const { state: drawerState, toggleDrawer } = useDrawerState();
  const [anchorEl, setAnchorEl] = useState(null);

  const goTo = ({ link }) => {
    if (typeof window !== 'undefined') {
      toggleDrawer('right', false);
      navigate(link);
    }
  };

  const handleMenuItemClick = (e, link) => {
    if (!anchorEl) {
      setAnchorEl(e.currentTarget);
    } else if (link) {
      goTo({ link })
    } else {
      setAnchorEl(null);
    }
  };

  return (
    <div id='header'>
      <div id='left-items'>
        <a href='/'><img id='header-logo' src={myfaLogoSrc} /></a>
        <ul className='menu'>
          <li className='menu-item'><a href='/#our-service-section'>Prestations</a></li>
          <li className='menu-item'><a href='/#prices-section'>Tarifs</a></li>
          <li className='menu-item'>
            <a href='#' className={Boolean(anchorEl) ? 'selected' : null} onClick={(e) => handleMenuItemClick(e)}>Qui sommes-nous ?</a>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={(e) => handleMenuItemClick(e)}
            >
              <MenuItem onClick={(e) => handleMenuItemClick(e, '/team')}>L'équipe</MenuItem>
              <MenuItem onClick={(e) => handleMenuItemClick(e, '/ratings')}>Avis des clients</MenuItem>
              <MenuItem onClick={(e) => handleMenuItemClick(e, '/faq')}>Questions fréquentes</MenuItem>
            </Menu>
          </li>
          <li className='menu-item'><a href='/blog'>Blog</a></li>
        </ul>
      </div>
      <div id='right-items'>
        <Button href='/#need-section' label='Me faire rappeler' className='header-login-btn' />
        <Button className='drawer-button' label={<IoMdMenu />} onClick={() => toggleDrawer('right', true)} />
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
