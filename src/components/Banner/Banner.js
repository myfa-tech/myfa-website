import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';

import './Banner.scss';

const Banner = ({ show, text, title, type, onClose }) => {
  return show && (
    <div className={`banner ${type}`}>
      <Row>
        <Col sm={3} className='banner-containers title-container'>
          <h1>{title}</h1>
        </Col>
        <Col sm={8} xs={12} className='banner-containers'>
          <p>{text}</p>
        </Col>
        <Col sm={1} className='banner-containers'>
          <button className='close-button' onClick={onClose}><FaTimes /></button>
        </Col>
      </Row>
    </div>
  );
};

export default Banner;
