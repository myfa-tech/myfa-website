import React from 'react';

import stationFSrc from '../../images/stationf-logo.png';
import abcSrc from '../../images/abc-logo.png';
import qontoSrc from '../../images/qonto-logo.png';
import startupWeekendSrc from '../../images/startup-weekend-logo.png';

import './Trustees.scss';
import { Col, Container, Row } from 'react-bootstrap';

const trusteesList = [
  { name: 'stationf', logo: stationFSrc },
  { name: 'abc', logo: abcSrc },
  { name: 'qonto', logo: qontoSrc },
  { name: 'startupweekend', logo: startupWeekendSrc },
];

const Trustees = () => {
  return (
    <section id='trustees'>
      <div className='title-container'>
        <h2>Ils nous font confiance 🤝</h2>
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
