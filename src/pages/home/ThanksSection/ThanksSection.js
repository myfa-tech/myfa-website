import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';

import ThierryAdonisWithBasket from '../../../images/thierry-receiving-basket.jpg';
import JanyAdonisWithBasket from '../../../images/jany-receiving-basket.jpg';
import ElianeWithBasket from '../../../images/eliane-receiving-basket.jpg';
import AlissaWithBasket from '../../../images/alissa-receives-basket.jpg';
import EmmanuelWithBasket from '../../../images/emmanuel-receives-basket.jpg';

import useTranslate from '../../../hooks/useTranslate';

import './ThanksSection.scss';

const ThanksSection = () => {
  const [slidePercentage, setSlidePercentage] = useState(30);
  const [t, locale] = useTranslate();

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.screen.width <= 500) {
        setSlidePercentage(100);
      } else if (window.screen.width <= 1000) {
        setSlidePercentage(50);
      }
    }
  }, []);

  return (
    <section id='thanks-section'>
      <div className='heading'>
        <h2>#Toutpourlamyfa</h2>
        <h3>Prendre soin de vous et de vos proches est notre priorité. Merci MYFA !</h3>
      </div>

      <div className='custom-slider'>
        <Carousel centerMode centerSlidePercentage={slidePercentage}>
          {slides.map((slide, index) => (
            <div key={index}>
              <img className='slider-img' src={slide.img} alt={slide.alt} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default ThanksSection;
