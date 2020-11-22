import React, { useEffect, useState } from 'react';

import Button from '../../../components/Button';

import './OurServicesSection.scss';

import photo from '../../../images/test-photo.png';
import Divider from '../../../components/Divider';

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

      <div className='service-section'>
        <div className='image-container'>
          <img src={photo} />
        </div>
        <div className='service-description-container'>
          <div className='description right'>
            <div className='top-element'>
              <span className='title'>Livraison de courses <span className='highlight'>alimentaires</span> à domicile</span>
              <p>
                MYFA s’occupe de réaliser les courses pour vos poches.
                Laissez nous leurs coordonnées, nous les appelons pour connaîre leurs besoins.
              </p>
              <p>
                Le tout, dans votre budget.
              </p>

              <Divider tiny />
            </div>
            <div className='bottom-element'>
              <p>
                « Votre site a changé ma vision de l'envoi d'argent. Plus de prise de tête, plus de tracas. »
              </p>

              <p><b>Seydou</b> - Client MYFA</p>

              <Button label='Démarrer' href='/#need-section' className='start-btn' />
            </div>
          </div>
        </div>
      </div>

      <div className='service-section'>
        <div className='service-description-container'>
          <div className='description left'>
            <div className='top-element'>
              <span className='title'>Gestion à distance de <span className='highlight'>chantiers immobiliers</span></span>
              <p>
                Des projets immobilliers au pays ?
                MYFA vous représente sur place : achat de matériel de construction, suivi de travaux, prise de photos.
              </p>
              <p>
                Avec MYFA, recevez une facture de chaque prestation réalisée.
              </p>

              <Divider tiny />
            </div>
            <div className='bottom-element'>
              <p>
                « Votre site a changé ma vision de l'envoi d'argent. Plus de prise de tête, plus de tracas. »
              </p>

              <p><b>Seydou</b> - Client MYFA</p>

              <Button label='Démarrer' href='/#need-section' className='start-btn' />
            </div>
          </div>
        </div>
        <div className='image-container'>
          <img src={photo} />
        </div>
      </div>

      <div className='service-section'>
        <div className='image-container'>
          <img src={photo} />
        </div>
        <div className='service-description-container'>
          <div className='description right'>
            <div className='top-element'>
              <span className='title'>Livraison de <span className='highlight'>médicaments</span> à domicile</span>
              <p>
                MYFA réalise les courses de médicaments de vos proches.
                Sous ordonnances ou non, nous pourrons récupérer les médicaments qui leur faut.
              </p>
              <p>Soyez rassurés, MYFA s’occupe de vos proches.</p>

              <Divider tiny />
            </div>
            <div className='bottom-element'>
              <p>
                « Votre site a changé ma vision de l'envoi d'argent. Plus de prise de tête, plus de tracas. »
              </p>

              <p><b>Seydou</b> - Client MYFA</p>

              <Button label='Démarrer' href='/#need-section' className='start-btn' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServicesSection;
