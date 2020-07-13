import React, { useState } from 'react';

import Layout from '../../components/layout';
import DisplayProducts from '../../components/DisplayProducts';
import SEO from '../../components/seo';
import SectionTitle from '../../components/SectionTitle';

import useFetchPacks from '../../hooks/useFetchPacks';
import useTranslate from '../../hooks/useTranslate';

import './packs.scss';

const Packs = () => {
  const [packs, setPacks] = useFetchPacks([]);
  const [t] = useTranslate();

  const goToType = (type) => {
    if (typeof window !== 'undefined') {
			window.location.assign(`/packs/details?type=${type}`);
		}
  };

  return (
    <Layout className='packs'>
      <SEO title='Packs' />

      <div id='packs'>
        <SectionTitle title={t('packs.page.title')} secondary={{ text: t('packs.page.secondary'), link: '/' }} />
        <DisplayProducts products={packs} handleProductClick={goToType} />
      </div>
    </Layout>
  );
};

export default Packs;
