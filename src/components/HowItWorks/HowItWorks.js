import React from 'react';
import Slider from 'react-slick';
import { FaCreditCard, FaEnvelopeOpen, FaMapMarkerAlt, FaRegListAlt, FaShoppingBasket, FaTruck } from 'react-icons/fa';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HowItWorks.scss';

const HowItWorks = () => {
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
      title: <h4>Sélectionnez votre panier</h4>,
      description: <p>Fruits, Légumes, Sauces ou MYFA.</p>,
    },
    {
      Icon: FaRegListAlt,
      title: <h4>Renseignez les informations sur votre proche</h4>,
      description: <p>Nous l'appelons pour déterminer les conditions de livraison.</p>,
    },
    {
      Icon: FaMapMarkerAlt,
      title: <h4>Sélectionnez le quartier de livraison</h4>,
      description: <p>Parmi les 12 quartiers d'Abidjan.</p>,
    },
    {
      Icon: FaCreditCard,
      title: <h4>Réglez en toute sécurité</h4>,
      description: <p>Faites vos achats l'esprit serein.</p>,
    },
    {
      Icon: FaTruck,
      title: <h4>Livraison en moins de 48h</h4>,
      description: <p>Sous réserve de la disponibilité de votre proche.</p>,
    },
    {
      Icon: FaEnvelopeOpen,
      title: <h4>Suivez l'acheminement</h4>,
      description: <p>Par email ou SMS, restez au courant.</p>,
    },
  ];

  return (
    <section id='how-it-works'>
      <div className='heading'>
        <h2>Comment ça marche ? 🤔</h2>
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
