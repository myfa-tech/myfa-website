import React from 'react';

import Layout from '../../components/layout';
import DisplayProducts from '../../components/DisplayProducts';
import SEO from '../../components/seo';
import SectionTitle from '../../components/SectionTitle';

import useFetchBaskets from '../../hooks/useFetchPleasureBaskets';
import useTranslate from '../../hooks/useTranslate';

import './baskets.scss';

const Packs = () => {
  const [baskets, setBaskets] = useFetchBaskets([]);
  const [t] = useTranslate();

  const goToType = (type) => {
    if (typeof window !== 'undefined') {
			window.location.assign(`/baskets/details?type=${type}`);
		}
  };

  return (
    <Layout className='baskets'>
      <SEO title='Paniers' />

      <div id='baskets'>
        <SectionTitle title={t('baskets.page.title')} secondary={{ text: t('baskets.page.secondary'), link: '/' }} />
        <DisplayProducts products={baskets} handleProductClick={goToType} />
      </div>
    </Layout>
  );
};

export default Packs;
