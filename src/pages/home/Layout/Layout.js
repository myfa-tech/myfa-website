import React, { Suspense } from 'react';

import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import SectionLoader from '../../../components/SectionLoader';

import './Layout.scss';

const HomeLayout = ({ className, children }) => {
  return (
    <div className={`layout ${className}`}>
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

export default HomeLayout;
