import React from 'react'
import { Row, Col } from 'react-bootstrap'
import useTranslate from '../../../hooks/useTranslate';
import foundersSrc from '../../../images/founders.jpeg';
import phoneFoundersSrc from '../../../images/phone-founders.jpg';

import './OurPromise.scss';

const OurPromise = () => {
  const [t] = useTranslate();

  return (
    <section id='our-promise' className='section-3'>
      <div className='title-container'>
        <h2>{t('home_page.our_promise.title')} ✨</h2>
      </div>
      <Row className='content-container'>
        <Col md={5} className='image-container'>
          <img className='founders-image' srcSet={`${foundersSrc} w949, ${phoneFoundersSrc} 450w`} />
          <p>{t('home_page.our_promise.image_title')}</p>
        </Col>
        <Col md={7} className='text-container'>
          <div className='content'>
            <h3>{t('home_page.our_promise.paragraph_title')}</h3>
            <p>{t('home_page.our_promise.paragraph_description')}</p>
          </div>
        </Col>
      </Row>
    </section>
  );
}

export default OurPromise;
