import React from 'react';
import Slider from 'react-slick';
import { FaQuoteLeft } from 'react-icons/fa';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';

import florianSrc from '../../images/florian.png'
import dorisSrc from '../../images/doris.png'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './News.scss';

const News = () => {
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
      id:'premier-membre-myfa',
      description: 'La semaine dernière nous participions à la conférence MobileOne. Pendant deux jours, l\'événement couvre tous les aspects liés au mobile, de la technique au marketing. Les différentes problématiques sont traitées sous forme de conférences de 30 minutes.',
      url: '/articles/premier-membre-myfa',
      author: 'doris'
    },
    {
      id:'voyage-abidjan',
      description: 'Si on nous avait dit, il y a 8 mois, lorsque nous nous lancions, que les choses se concrétiseraient aussi rapidement, je n’y aurais pas cru, et Doris non plus. Voilà déjà 1 semaine que nous sommes rentrés de notre premier “voyage d’affaires”, ni plus ni moins qu’en Côte d’Ivoire. En Afrique, continent qui nous est cher.',
      url: '/articles/voyage-abidjan',
      author: 'florian'
    },
    {
      id:'global-women-startup-weekend-paris',
      description: 'On est d’accord, le nom de l’évènement est long. Mais le principe est simple ! « Women », vous l’aurez compris, signifie que les porteuses de projets sont uniquement des femmes (Who run the world ? demandez à Beyoncé).',
      url: '/articles/global-women-startup-weekend-paris',
      author: 'doris'
    },
    {
      id:'appli-pour-la-mif',
      description: "Hein ? Quoi ? Que veut dire “Myfa” ? Cela veut dire “famille” en verlan. Le verlan étant une forme d'argot français qui consiste en l'inversion des syllabes d'un mot. Vous comprendrez donc d’où le chanteur Stromae tient son nom… Le y ? juste pour le style...",
      url: '/articles/appli-pour-la-mif',
      author: 'doris'
    },
  ]

  return (
    <section id='news'>
      <div className='heading'>
        <h2>Actualités 📰</h2>
      </div>

      <Slider {...settings} className='custom-slider'>
        {slides.map((slide, index) => (
          <div key={slide.id}>
            <div className='article-block'>
              <FaQuoteLeft size='2em' className='quote-icon' />
              <p>
                {slide.description}
              </p>
              <a href={slide.url} className='btn-news'>
                Lire la suite
              </a>
              <div className='author-id'>
                <img src={slide.author === 'florian' ? florianSrc : dorisSrc} className='profile-pic' alt={slide.author} />
                <h4>{slide.author === 'florian' ? 'Florian Adonis' : 'Doris Somon'}</h4>
                <span>{slide.author === 'florian' ? 'CTO, MYFA' : 'CEO, MYFA'}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  )
}

export default News
