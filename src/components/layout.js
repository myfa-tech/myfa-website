
import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import SectionLoader from './SectionLoader';
const Footer = lazy(() => import('./Footer'));

import './layout.scss';

const Layout = ({ children, className, hideHeader, noBackgroundColor, headerBackground, headerDescription, headerBackgroundPosition, stickyHeaderBackgroundPosition }) => {
  return (
    <div className={`layout ${className}`}>
      {hideHeader ?
        null :
        <Header
          headerBackground={headerBackground}
          headerBackgroundPosition={headerBackgroundPosition}
          stickyHeaderBackgroundPosition={stickyHeaderBackgroundPosition}
          headerDescription={headerDescription}
        />
      }
      <div>
        <main>{children}</main>
      </div>
      <Suspense fallback={<SectionLoader />}>
        <Footer noBackgroundColor={noBackgroundColor} />
      </Suspense>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
