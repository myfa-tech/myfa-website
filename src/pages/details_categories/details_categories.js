import React from 'react';

import SEO from '../../components/seo';
import Layout from '../../components/layout';
import useTranslate from '../../hooks/useTranslate';
import SectionTitle from '../../components/SectionTitle';
import CategoryDisplay from './CategoryDisplay';

import storeBg from '../../images/store-bg.jpg';
import fruitsImage from '../../images/fruits-basket-bg.jpg';
import grocerySweetImage from '../../images/morning-pack-bg.jpg';
import healthyImage from '../../images/beauty-basket-bg.jpg';
import veggiesImage from '../../images/veggies-bg.jpg';
import grocerySaltyImage from '../../images/grocery-salty-bg.jpg';

import './details_categories.scss';

const DetailsCategories = () => {
  const [t] = useTranslate();

  const categories = [
    {
      title: t('details_categories.fruits_title'),
      description: t('details_categories.fruits_description'),
      link: '/details-categories/fruits',
      image: fruitsImage,
    },
    {
      title: t('details_categories.veggies_title'),
      description: t('details_categories.veggies_description'),
      link: '/details-categories/veggies',
      image: veggiesImage,
    },
    {
      title: t('details_categories.grocery_salty_title'),
      description: t('details_categories.grocery_salty_description'),
      link: '/details-categories/grocery-salty',
      image: grocerySaltyImage,
    },
    {
      title: t('details_categories.grocery_sweet_title'),
      description: t('details_categories.grocery_sweet_description'),
      link: '/details-categories/grocery-sweet',
      image: grocerySweetImage,
    },
    {
      title: t('details_categories.healthy_title'),
      description: t('details_categories.healthy_description'),
      link: '/details-categories/healthy',
      image: healthyImage,
    },
  ];

  return (
    <Layout
      className='details-categories-page'
      headerBackground={storeBg}
      headerDescription={t('details_categories.description')}
      headerBackgroundPosition='center center'
    >
      <SEO title='Catégories' />

      <SectionTitle title={t('details_categories.title')} secondary={{ text: t('details_categories.secondary'), link: '/' }} />

      <div className='categories-container'>
        {categories.map((cat, index) => (
          <CategoryDisplay key={index} title={cat.title} description={cat.description} link={cat.link} image={cat.image} />
        ))}
      </div>
    </Layout>
  );
};

export default DetailsCategories;
