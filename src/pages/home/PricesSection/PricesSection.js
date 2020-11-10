import React from 'react';

import './PricesSection.scss';

const PricesSection = () => {
  return (
    <div id='prices-section'>
      <h2>Une offre adaptée</h2>
      <p className='section-description'>Chaque prestation donne lieu à un devis, à régler.</p>
      <p className='section-description'>MYFA vous propose deux offres, en fonction du montant de la prestation réalisée.</p>

      <div id='cards-container'>
        <div className='card'>
          <span className='price-icon'>🚀</span>
          <p className='price-title'>Prestation moins de 15€</p>
          <p className='price-number'>5€</p>
          <p className='or'>ou</p>
          <p className='price-number'>3 275 FCFA</p>
        </div>
        <div className='card'>
          <span className='price-icon'>🚀🚀</span>
          <p className='price-title'>Prestation plus de 15€</p>
          <p className='price-number'>5€</p>
          <p className='or'>ou</p>
          <p className='price-number'>3 275 FCFA</p>
          <p className='price-complement'>+ 10% de la valeur de la prestation</p>
        </div>
      </div>
    </div>
  );
};

export default PricesSection;
