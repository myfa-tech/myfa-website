import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FaBell, FaGlobeAfrica, FaHistory, FaHome, FaShoppingCart, FaUser } from 'react-icons/fa'

import watchSrc from '../../assets/images/watch.png'
import './Features.scss'

const Features = () => (
  <section id='features' className='section section-2'>
    <Container>
      <Row>
        <div className='heading'>
          <h2>Fonctionnalités</h2>
        </div>
        <div className='mobile-image-container'>
          <img src={watchSrc} alt='watch' />
        </div>
        <Col md={4}>
          <div className='feature-box'>
            <FaHome className='small-icon' />
            <h4>Accueil</h4>
            <p>
              A tout moment de la navigation, le bouton d'accueil vous permet de revenir
              au point de départ : nos enseignes partenaires.
            </p>
          </div>
          <div className='feature-box'>
            <FaGlobeAfrica className='small-icon' />
            <h4>Pays d'accueil</h4>
            <p>Choisissez le pays où se trouve votre proche, vous pourrez voir quels sont les partenaires sur place.</p>
          </div>
          <div className='feature-box'>
            <FaShoppingCart className='small-icon' />
            <h4>Panier</h4>
            <p>Retrouvez vos courses et passez au paiement !</p>
          </div>
        </Col>
        <Col md={4} className='image-container'>
          <img src={watchSrc} alt='watch' />
        </Col>
        <Col md={4}>
          <div className='feature-box'>
            <FaUser className='small-icon' />
            <h4>Profil</h4>
            <p>
              C'est ici que vous trouverez vos informations personnelles.
              De plus, vous verrez le nombre de paniers envoyés.
            </p>
          </div>
          <div className='feature-box'>
            <FaHistory className='small-icon' />
            <h4>Historique</h4>
            <p>
              En cas de listes de courses récurrentes, il vous est possible de les sauvegarder,
              les renommer, ainsi vous êtes sûrs de ne rien oublier !
            </p>
          </div>
          <div className='feature-box'>
            <FaBell className='small-icon' />
            <h4>Notifications</h4>
            <p>Vous serez prévenu lorsque le panier de course aura été retiré par votre proche.</p>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
)

export default Features
