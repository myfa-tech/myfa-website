import React from 'react';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import Slider from 'react-slick';

import ThierryAdonisWithBasket from '../../images/thierry-receiving-basket.jpg';
import JanyAdonisWithBasket from '../../images/jany-receiving-basket.jpg';
import ElianeWithBasket from '../../images/eliane-receiving-basket.jpg';
import AlissaWithBasket from '../../images/alissa-receives-basket.jpg';
import EmmanuelWithBasket from '../../images/emmanuel-receives-basket.jpg';

import useTranslate from '../../hooks/useTranslate';

import './ThanksSection.scss';

const ThanksSection = () => {
  const [t] = useTranslate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
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
      img: ThierryAdonisWithBasket,
      alt: 'thierry adonis reçoit son panier'
    },
    {
      img: JanyAdonisWithBasket,
      alt: 'jany adonis reçoit son panier'
    },
    {
      img: ElianeWithBasket,
      alt: 'eliane ndossi reçoit son panier'
    },
    {
      img: AlissaWithBasket,
      alt: 'alissa simon reçoit son panier'
    },
    {
      img: EmmanuelWithBasket,
      alt: 'emmanuel koffy reçoit son panier'
    },
  ];

  return (
    <section id='thanks-section'>
      <div className='heading'>
        <h2>#Toutpourlamyfa</h2>
        <h3>Prendre soin de vos proches est notre priorité. Ils vous disent merci.</h3>
      </div>

      <div className='custom-slider'>
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index}>
              <img className='slider-img' src={slide.img} alt={slide.alt} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ThanksSection;
