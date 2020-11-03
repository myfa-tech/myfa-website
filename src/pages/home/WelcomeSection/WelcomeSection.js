import React from 'react'

import Button from '../../../components/Button';

import handAndDashboardImgSrc from '../../../images/welcome-img.png';

import './WelcomeSection.scss';

const WelcomeSection = () => {
  return (
    <div id='welcome-section'>
      <div id='left-text-container'>
        <div className='title-container'>
          <h1>Le tiers de confiance de la diaspora Ivoirienne</h1>
        </div>
        <div className='description'>
          <span>MYFA vous aide à :</span>
          <ul>
            <li>prendre soin de <b>vos proches</b></li>
            <li>acheter du <b>matériel de construction</b></li>
            <li>suivre l’<b>avancée de vos constructions</b></li>
          </ul>
        </div>
        <Button label='Démarrer' href='/#enquiries-form' className='start-btn' />
      </div>
      <div id='right-img-container'>
        <img src={handAndDashboardImgSrc} />
      </div>
    </div>
  );
};

export default WelcomeSection;
