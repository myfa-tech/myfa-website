import React, { useEffect, useState } from 'react';
import { FaCreditCard, FaEnvelopeOpen, FaMapMarkerAlt, FaRegListAlt, FaShoppingBasket, FaTruck } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';

import useTranslate from '../../../hooks/useTranslate';

import './HowItWorks.scss';

const HowItWorks = () => {
  const [slidePercentage, setSlidePercentage] = useState(30);
  const [t] = useTranslate();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.screen.width <= 500) {
        setSlidePercentage(100);
      } else if (window.screen.width <= 1000) {
        setSlidePercentage(50);
      }
    }
  }, []);

  const slides = [
    {
      Icon: FaShoppingBasket,
      title: <h4>{t('home_page.how_it_works.slide1.title')}</h4>,
      description: <p>{t('home_page.how_it_works.slide1.description')}</p>,
    },
    {
      Icon: FaRegListAlt,
      title: <h4>{t('home_page.how_it_works.slide2.title')}</h4>,
      description: <p>{t('home_page.how_it_works.slide2.description')}</p>,
    },
    {
      Icon: FaMapMarkerAlt,
      title: <h4>{t('home_page.how_it_works.slide3.title')}</h4>,
      description: <p>{t('home_page.how_it_works.slide3.description')}</p>,
    },
    {
      Icon: FaCreditCard,
      title: <h4>{t('home_page.how_it_works.slide4.title')}</h4>,
      description: <p>{t('home_page.how_it_works.slide4.description')}</p>,
    },
    {
      Icon: FaTruck,
      title: <h4>{t('home_page.how_it_works.slide5.title')}</h4>,
      description: <p>{t('home_page.how_it_works.slide5.description')}</p>,
    },
    {
      Icon: FaEnvelopeOpen,
      title: <h4>{t('home_page.how_it_works.slide6.title')}</h4>,
      description: <p>{t('home_page.how_it_works.slide6.description')}</p>,
    },
  ];

  return (
    <section id='how-it-works'>
      <div className='heading'>
        <h2>{t('home_page.how_it_works.title')} 🤔</h2>
      </div>
      <Carousel centerMode centerSlidePercentage={slidePercentage} className='custom-slider'>
        {slides.map((slide, index) => (
          <div key={index}>
            <div className='card-block'>
              <div className='slide-icon'>
                {<slide.Icon className='slider-icon' />}
              </div>
              <div className='slide-title'>
                {slide.title}
              </div>
              <div className='slide-desc'>
                {slide.description}
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default HowItWorks;
