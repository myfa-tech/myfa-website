import React, { useEffect, useState } from 'react';

import './OurServicesSection.scss';

const MAX_X = 10;
const MAX_Y = 10;

const OurServicesSection = () => {
  const [positions, setPositions] = useState([
    { x: 0, y: 0, posX: 0, posY: 0 },
    { x: 0, y: 0, posX: 0, posY: 0 },
    { x: 0, y: 0, posX: 0, posY: 0 },
  ]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const newPositions = [...positions];

      const randomX0 = (Math.random() * 20) - 10;
      const randomY0 = (Math.random() * 20) - 10;
      const randomX1 = (Math.random() * 20) - 10;
      const randomY1 = (Math.random() * 20) - 10;
      const randomX2 = (Math.random() * 20) - 10;
      const randomY2 = (Math.random() * 20) - 10;

      if (positions[0].posX + randomX0 < MAX_X) {
        newPositions[0].posX += randomX0;
        newPositions[0].x = randomX0;
      } else {
        newPositions[0].posX -= randomX0;
        newPositions[0].x = -randomX0;
      }

      if (positions[0].posY + randomY0 < MAX_Y) {
        newPositions[0].posY += randomY0;
        newPositions[0].y = randomY0;
      } else {
        newPositions[0].posY -= randomY0;
        newPositions[0].y = -randomY0;
      }

      if (positions[1].posX + randomX1 < MAX_X) {
        newPositions[1].posX += randomX1;
        newPositions[1].x = randomX1;
      } else {
        newPositions[1].posX -= randomX1;
        newPositions[1].x = -randomX1;
      }

      if (positions[1].posY + randomY1 < MAX_Y) {
        newPositions[1].posY += randomY1;
        newPositions[1].y = randomY1;
      } else {
        newPositions[1].posY -= randomY1;
        newPositions[1].y = -randomY1;
      }

      if (positions[2].posX + randomX2 < MAX_X) {
        newPositions[2].posX += randomX2;
        newPositions[2].x = randomX2;
      } else {
        newPositions[2].posX -= randomX2;
        newPositions[2].x = -randomX2;
      }

      if (positions[2].posY + randomY2 < MAX_Y) {
        newPositions[2].posY += randomY2;
        newPositions[2].y = randomY2;
      } else {
        newPositions[2].posY -= randomY2;
        newPositions[2].y = -randomY2;
      }

      setPositions(newPositions);
    }, 1000);

    return () => clearTimeout(timeout);
  });

  return (
    <div id='our-service-section'>
      <h2>Les prestations de MYFA</h2>

      <div id='services-container'>
        <div className='service' style={{ transform: `translate3d(${positions[0].x}px, ${positions[0].y}px, 0)` }}>
          <span className='icon'>🛒</span>
          <span className='title'>Alimentaire</span>
          <p>MYFA s’occupe de réaliser les courses pour vos poches.</p>
          <p>Laissez nous leurs coordonnées, nous les appelons pour connaîre leurs besoins.</p>
          <p>Le tout, <span className='green-highlight'>dans votre budget</span>.</p>
        </div>

        <div className='service' style={{ transform: `translate3d(${positions[1].x}px, ${positions[1].y}px, 0)` }}>
          <span className='icon'>💊</span>
          <span className='title'>Santé</span>
          <p>MYFA réalise les courses de médicaments de vos proches.</p>
          <p>Sous ordonnances ou non, nous pourrons récupérer les médicaments qui leur faut.</p>
          <p>Soyez rassurés, <span className='green-highlight'>MYFA s’occupe de vos proches</span>.</p>
        </div>

        <div className='service' style={{ transform: `translate3d(${positions[2].x}px, ${positions[2].y}px, 0)` }}>
          <span className='icon'>🚧</span>
          <span className='title'>Batiment</span>
          <p>Des projets immobilliers au pays ?</p>
          <p>MYFA vous représente sur place : achat de matériel de construction, suivi de travaux, prise de photos.</p>
          <p>Avec MYFA, <span className='green-highlight'>recevez une facture de chaque prestation réalisée</span>.</p>
        </div>
      </div>
    </div>
  );
};

export default OurServicesSection;
