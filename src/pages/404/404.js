import React from "react";

import Layout from "../../components/layout";
import SEO from "../../components/seo";
import useTranslate from "../../hooks/useTranslate";

import './404.scss';

import banana404 from '../../images/404-banana.jpg';

const NotFoundPage = () => {
  const [t, locale] = useTranslate();

  return (
    <Layout>
      <div id='page-404'>
        <SEO title={t('404.seo_title')} />
        <h1>{t('404.title')}</h1>
        <h2>{t('404.subtitle')}</h2>

        <img src={banana404} />

        <a href={`/${locale}`} className='go-home-button'>{t('404.cta')}</a>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
