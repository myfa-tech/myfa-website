import React from 'react';
import Slider from 'react-slick';
import { FaQuoteLeft } from 'react-icons/fa';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';

import useTranslate from '../../hooks/useTranslate';

import florianSrc from '../../images/florian.png';
import dorisSrc from '../../images/doris.png';
import manuellaSrc from '../../images/manuella.png';
import alexandreSrc from '../../images/alex.png';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './News.scss';

const authors = {
  'florian': {
    name: 'Florian Adonis',
    title: 'CTO, MYFA',
    img: florianSrc,
  },
  'doris': {
    name: 'Doris Somon',
    title: 'CEO, MYFA',
    img: dorisSrc,
  },
  'alexandre': {
    name: 'Alexandre Meschberger',
    title: 'CFO, MYFA',
    img: alexandreSrc,
  },
  'manuella': {
    name: 'Manuella Sani',
    title: 'Responsable Opérations CI, MYFA',
    img: manuellaSrc,
  },
};

const News = () => {
  const [t] = useTranslate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    initialSlide: 0,
    nextArrow: <IoMdArrowDropright />,
    prevArrow: <IoMdArrowDropleft />,
  };

  const slides = [
    {
      id:'recession-croissance-startup',
      description: t('home_page.news.slide6_description'),
      url: '/articles/recession-croissance-startup',
      author: 'doris',
    },
    {
      id:'confinement-trouve-emploi',
      description: t('home_page.news.slide5_description'),
      url: '/articles/confinement-trouve-emploi',
      author: 'manuella',
    },
    {
      id:'premier-membre-myfa',
      description: t('home_page.news.slide1_description'),
      url: '/articles/premier-membre-myfa',
      author: 'doris',
    },
    {
      id:'voyage-abidjan',
      description: t('home_page.news.slide2_description'),
      url: '/articles/voyage-abidjan',
      author: 'florian',
    },
    {
      id:'global-women-startup-weekend-paris',
      description: t('home_page.news.slide3_description'),
      url: '/articles/global-women-startup-weekend-paris',
      author: 'doris',
    },
    {
      id:'appli-pour-la-mif',
      description: t('home_page.news.slide4_description'),
      url: '/articles/appli-pour-la-mif',
      author: 'doris',
    },
  ];

  return (
    <section id='news'>
      <div className='heading'>
        <h2>{t('home_page.news.title')} 📰</h2>
      </div>

      <Slider {...settings} className='custom-slider'>
        {slides.map((slide, index) => (
          <div key={slide.id}>
            <div className='article-block'>
              <FaQuoteLeft size='2em' className='quote-icon' />
              <p className='article-title'>
                {slide.description}
              </p>
              <a href={slide.url} className='btn-news'>{t('home_page.news.read_more_button')}</a>
              <div className='author-id'>
                <img src={authors[slide.author].img} className='profile-pic' alt={slide.author} />
                <h4>{authors[slide.author].name}</h4>
                <span>{authors[slide.author].title}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default News;
