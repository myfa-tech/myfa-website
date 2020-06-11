import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import useTranslate from '../../../hooks/useTranslate';
import stationFSrc from '../../../images/stationf-logo.png';
import abcSrc from '../../../images/abc-logo.png';
import qontoSrc from '../../../images/qonto-logo.png';
import startupWeekendSrc from '../../../images/startup-weekend-logo.png';

import './Trustees.scss';

const trusteesList = [
  { name: 'stationf', logo: stationFSrc },
  { name: 'abc', logo: abcSrc },
  { name: 'qonto', logo: qontoSrc },
  { name: 'startupweekend', logo: startupWeekendSrc },
];

const Trustees = () => {
  const [t] = useTranslate();

  return (
    <section id='trustees'>
      <div className='heading'>
        <h2>{t('home_page.trustees.title')} 🤝</h2>
      </div>
      <Row className='content-container'>
        {trusteesList.map(trustee => (
          <Col xs='3' key={trustee.name}>
            <img src={trustee.logo} />
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default Trustees;
