import React, { Suspense } from 'react';

import Footer from '../Footer';
import Header from '../Header';
import SectionLoader from '../SectionLoader';

import './Layout.scss';

const Layout = ({ className, children, color }) => {
  return (
    <div className={`layout ${className} ${color}`}>
      <Header />
      <div>
        <main>{children}</main>
      </div>
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Layout;
