import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaTimes } from 'react-icons/fa';

import './Banner.scss';

const Banner = ({ show, text, title, type, onClose }) => {
  return show && (
    <div className={`banner ${type}`}>
      <Row>
        {title ? <Col sm={3} className='banner-containers title'>
          <h1>{title}</h1>
        </Col> : null}
        <Col sm={title ? 8 : 11} xs={12} className='banner-containers'>
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
