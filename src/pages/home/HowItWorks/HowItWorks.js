import React from 'react';
import Slider from 'react-slick';
import { FaCreditCard, FaEnvelopeOpen, FaMapMarkerAlt, FaRegListAlt, FaShoppingBasket, FaTruck } from 'react-icons/fa';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import useTranslate from '../../../hooks/useTranslate';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HowItWorks.scss';

const HowItWorks = () => {
  const [t] = useTranslate();

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    nextArrow: <IoMdArrowDropright />,
    prevArrow: <IoMdArrowDropleft />,
  };

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
      <Slider {...settings} className='custom-slider'>
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
      </Slider>
    </section>
  );
};

export default HowItWorks;
