import React from 'react';

import './OurServicesSection.scss';

const OurServicesSection = () => {
  return (
    <div id='our-service-section'>
      <h2>Les prestations de MYFA</h2>

      <div id='services-container'>
        <div className='service'>
          <span className='icon'>🛒</span>
          <span className='title'>Alimentaire</span>
          <p>MYFA s’occupe de réaliser les courses pour vos poches.</p>
          <p>Laissez nous leurs coordonnées, nous les appelons pour connaîre leurs besoins. </p>
          <p>Le tout, dans votre budget.</p>
        </div>

        <div className='service'>
          <span className='icon'>💊</span>
          <span className='title'>Santé</span>
          <p>MYFA réalise les courses de médicaments de vos proches.</p>
          <p>Sous ordonnances ou non, nous pourrons récupérer les médicaments qui leur faut.</p>
          <p>Soyez rassurés, MYFA s’occupe de vos proches.</p>
        </div>

        <div className='service'>
          <span className='icon'>🚧</span>
          <span className='title'>Bâtiment</span>
          <p>Des projets immobilliers au pays ?</p>
          <p>MYFA vous représente sur place : achat de matériel de construction, suivi de travaux, prise de photos.</p>
          <p>Avec MYFA, recevez une facture de chaque prestation réalisée.</p>
        </div>
      </div>
    </div>
  );
};

export default OurServicesSection;
