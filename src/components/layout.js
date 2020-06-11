
import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
const Footer = lazy(() => import('./Footer'));

import './layout.scss';

const Layout = ({ children, className, hideHeader, noBackgroundColor, showLoginSignupModal, toggleShowLoginSignupModal }) => {
  return (
    <div className={`layout ${className}`}>
      {hideHeader ?
        null :
        <Header
          showLoginSignupModal={showLoginSignupModal}
          toggleShowLoginSignupModal={toggleShowLoginSignupModal}
        />
      }
      <div>
        <main>{children}</main>
      </div>
      <Suspense fallback={'LOADING'}>
        <Footer noBackgroundColor={noBackgroundColor} />
      </Suspense>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
