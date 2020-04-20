import React from "react"
import Slider from "react-slick"
import { FaQuoteLeft } from 'react-icons/fa'

import florianSrc from '../../images/florian.png'
import dorisSrc from '../../images/doris.png'

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import './Slider.scss'

export default class extends React.Component {
  render() {
    const settings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      ...this.props.settings,
    }

    return (
      <Slider {...settings} className='custom-slider'>
        {this.props.slides.map(slide => {
          return this.props.type === 'articles' ? (
            <div key={slide.id}>
              <div className='article-block'>
                <FaQuoteLeft size='2em' className='quote-icon' />
                <p>
                  {slide.description}
                </p>
                <a href={slide.url} className='btn-blog'>
                  Lire la suite
                </a>
                <div className='author-id'>
                  <img src={slide.author === 'florian' ? florianSrc : dorisSrc} className='profile-pic' alt={slide.author} />
                  <h4>{slide.author === 'florian' ? 'Florian Adonis' : 'Doris Somon'}</h4>
                  <span>{slide.author === 'florian' ? 'CTO, MYFA' : 'CEO, MYFA'}</span>
                </div>
              </div>
            </div>
          ) : null
        })}
      </Slider>
    )
  }
}