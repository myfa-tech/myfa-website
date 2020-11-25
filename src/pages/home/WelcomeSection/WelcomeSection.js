import React from 'react'

import Button from '../../../components/Button';

import handAndDashboardImgSrc from '../../../images/welcome-img.png';
import mobileHandAndDashboardImgSrc from '../../../images/mobile-welcome-img.png';

import './WelcomeSection.scss';

const WelcomeSection = () => {
  return (
    <div id='welcome-section'>
      <div id='left-text-container'>
        <div className='title-container'>
          <h1>Le tiers de confiance de la diaspora Ivoirienne</h1>
        </div>
        <div className='description'>
          <ul>
            <li>✔ Faites les courses pour vos proches</li>
            <li>✔ Achetez des médicaments pour vos proches</li>
            <li>✔ Achetez du matériel de construction</li>
          </ul>
        </div>
        <Button label='Démarrer' href='/#need-section' className='start-btn' />
      </div>
      <div id='right-img-container'>
        <img className='welcome-img' src={handAndDashboardImgSrc} />
        <img className='mobile-welcome-img' src={mobileHandAndDashboardImgSrc} />
      </div>
    </div>
  );
};

export default WelcomeSection;
