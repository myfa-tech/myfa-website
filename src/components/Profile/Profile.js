import React, { useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';

import defaultBasketSrc from '../../images/default-basket.png';

import './Profile.scss';
import { getBasketsByEmail } from '../../services/orders';

import baskets from '../../assets/baskets';

const basketStatus = {
  'pending': 'Paiement en attente',
  'paid': 'Payé',
  'preparing': 'En cours de préparation',
  'delivered': 'Livré',
};

const Profile = () => {
  const [pendingBaskets, setPendingBaskets] = useState([]);
  const [deliveredBaskets, setDeliveredBaskets] = useState([]);
  const user = (typeof window !== 'undefined') ? JSON.parse(window.localStorage.getItem('user')) : null;

  useEffect(() => {
    const run = async () => {
      const fetchedBaskets = await getBasketsByEmail(user.email);
      const pendingBaskets = fetchedBaskets.filter(b => b.status !== 'delivered');
      const deliveredBaskets = fetchedBaskets.filter(b => b.status === 'delivered');

      setPendingBaskets([...pendingBaskets]);
      setDeliveredBaskets([...deliveredBaskets]);
    };
    run();
  }, []);

  const logout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('userToken');

      window.location.assign('/');
    }
  }

  return user ? (
    <Container id='profile'>
      <Row>
        <Col md='4' className='infos'>
          <h1>{user.firstname} {user.lastname}</h1>
          <p>📧 {user.email}</p>
          <p>📞 {user.phone}</p>

          <button type='button' className='logout-button' onClick={logout}>Déconnexion</button>
        </Col>
        <Col md='8' className='baskets'>
          <h2>Commandes en cours</h2>

          {pendingBaskets.length ?
            <div className='baskets-container'>
              {pendingBaskets.map(basket => (
                <div className='single-basket' key={basket._id}>
                  <Row>
                    <Col xs='3' md='2'>
                      <img src={(baskets.find(b => b.type === basket.type) || {}).img || defaultBasketSrc} />
                    </Col>
                    <Col xs='9' md='10'>
                      <h3>{(baskets.find(b => b.type === basket.type) || {}).label || basket.name}</h3>
                      <p>Dest. : {basket.recipient.firstname} {basket.recipient.lastname}</p>
                      <p>Statut : {basketStatus[basket.status] || 'En cours'}</p>
                    </Col>
                  </Row>
                </div>
              ))}
            </div>
          : null}

          <h2>Commandes traitées</h2>

          {deliveredBaskets.length ?
            <div className='baskets-container'>
              {deliveredBaskets.map(basket => (
                <div className='single-basket' key={basket._id}>
                  <Row>
                    <Col xs='4' md='2'>
                      <img src={(baskets.find(b => b.type === basket.type) || {}).img || defaultBasketSrc} />
                    </Col>
                    <Col xs='8' md='10'>
                      <h3>{(baskets.find(b => b.type === basket.type) || {}).label || basket.name}</h3>
                      <p>Statut: {basketStatus[basket.status] || 'En cours'}</p>
                    </Col>
                  </Row>
                </div>
              ))}
            </div>
          : null}
        </Col>
      </Row>
    </Container>
  ) : null;
};

export default Profile;
