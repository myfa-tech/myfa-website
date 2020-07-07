import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import useTranslate from '../../../hooks/useTranslate';

import './OurServices.scss';

const OurServices = () => {
  const [t] = useTranslate();

  return (
    <section id='our-services'>
      <Row className='steps-container'>
        <Col sm={4}>
          <div className='step'>
            <div className='step-icon'></div>
            <div className='step-title'>{t('home_page.our_services.step_1.title')}</div>
            <div className='step-desc'>
              <p>{t('home_page.our_services.step_1.line_2')}</p>
            </div>
          </div>
        </Col>

        <Col sm={4}>
          <div className='step'>
            <div className='step-icon'></div>
            <div className='step-title'>{t('home_page.our_services.step_2.title')}</div>
            <div className='step-desc'>
              <p>{t('home_page.our_services.step_2.line_2')}</p>
              <p>{t('home_page.our_services.step_2.line_3')}</p>
              <p>{t('home_page.our_services.step_2.line_4')}</p>
              <p>{t('home_page.our_services.step_2.line_5')}</p>
            </div>
          </div>
        </Col>

        <Col sm={4}>
          <div className='step'>
            <div className='step-icon'></div>
            <div className='step-title'>{t('home_page.our_services.step_3.title')}</div>
            <div className='step-desc'>
              <p>{t('home_page.our_services.step_3.line_2')}</p>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default OurServices;
