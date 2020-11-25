import React from 'react';

import './PricesSection.scss';

import pricesBgImg from '../../../images/background-symbol-img.jpg';

const PricesSection = () => {
  return (
    <div id='prices-section'>
      <h2>Une offre adaptée à chacun de vos besoins</h2>
      <p className='section-description'>Chaque prestation donne lieu à un devis.</p>
      <p className='section-description'>MYFA vous propose deux offres, en fonction du montant de la prestation réalisée.</p>

      <div className='image-container'>
        <img src={pricesBgImg} />
      </div>

      <div id='cards-container'>
        <div className='card'>
          <span className='price-icon'>🚀</span>
          <p className='price-title'>Achat moins de 50€</p>
          <p className='price-number'>8€</p>
          <p className='or'>soit</p>
          <p className='price-number cfa'>5 240 FCFA</p>
        </div>
        <div className='card'>
          <span className='price-icon'>🚀🚀</span>
          <p className='price-title'>Achat entre 50€ et 200€</p>
          <p className='price-number'>3€</p>
          <p className='or'>soit</p>
          <p className='price-number cfa'>1 965 FCFA</p>
          <p className='price-complement'>+ 10% de la valeur d'achat</p>
        </div>
        <div className='card'>
          <span className='price-icon'>🚀🚀🚀</span>
          <p className='price-title'>Achat plus de 200€</p>
          <p className='price-number'>12%</p>
          <p className='price-complement'>de la valeur d'achat</p>
        </div>
      </div>
    </div>
  );
};

export default PricesSection;
