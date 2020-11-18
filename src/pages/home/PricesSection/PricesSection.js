import React from 'react';

import './PricesSection.scss';

const PricesSection = () => {
  return (
    <div id='prices-section'>
      <h2>Une offre adaptée à chacun de vos besoins</h2>
      <p className='section-description'>Chaque prestation donne lieu à un devis.</p>
      <p className='section-description'>MYFA vous propose deux offres, en fonction de votre budget.</p>

      <div id='cards-container'>
        <div className='card'>
          <span className='price-icon'>🚀</span>
          <p className='price-title'>Budget moins de 15€</p>
          <p className='price-number'>5€</p>
          <p className='or'>ou</p>
          <p className='price-number cfa'>3 275 FCFA</p>
        </div>
        <div className='card'>
          <span className='price-icon'>🚀🚀</span>
          <p className='price-title'>Budget plus de 15€</p>
          <p className='price-number'>5€</p>
          <p className='or'>ou</p>
          <p className='price-number cfa'>3 275 FCFA</p>
          <p className='price-complement'>+ 10% de la valeur du devis</p>
        </div>
      </div>
    </div>
  );
};

export default PricesSection;
