import React, { useEffect, useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import StepLabel from '@material-ui/core/StepLabel';
import { createMuiTheme } from '@material-ui/core/styles';
import { getBasketsByEmail } from '../../services/orders';

import defaultBasketSrc from '../../images/default-basket.png';

import './ProfileOrders.scss';

import baskets from '../../assets/baskets';
import { customBasketDetails } from '../../assets/customBasket';

import { Row, Col } from 'react-bootstrap';

const basketsDetails = [ ...baskets, customBasketDetails ];

const basketStatus = {
  'pending': 'Commandé',
  'paid': 'Payé',
  'preparing': 'Préparé',
  'delivered': 'Livré',
};

const useStyles = makeStyles({
  stepperRroot: {
    background: 'transparent',
    padding: 0,
    width: '100%',
  },
  stepRoot: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  labelContainer: {
    fontSize: '15px',
  }
});

const monthDisplayingOptions = { month: 'long'};

const ProfileOrders = () => {
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

  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#000',
      }
    },
  });

  return (
    <div id='profile-orders'>
      <div className='pending-orders-container'>
        <h2>Commandes en cours</h2>

        {pendingBaskets.length ?
          <ul className='baskets-container'>
            {pendingBaskets.map((basket, index) => (
              <li key={index}>
                <Row>
                  <Col md={3} xs={0} className='image-container d-none d-sm-block'>
                    <img src={(basketsDetails.find(b => b.type === basket.type) || {}).img || defaultBasketSrc} />
                  </Col>
                  <Col md={9} xs={12} className='stepper-container'>
                    <div className='title-container'>
                      <h3>{basketsDetails.find(b => b.type === basket.type).label}</h3>
                      <h3>Commande {basket.orderRef}</h3>
                    </div>
                    <div className='content-container'>
                    <ThemeProvider theme={theme}>
                      <Stepper activeStep={Object.keys(basketStatus).indexOf(basket.status)} alternativeLabel classes={{ root: classes.stepperRroot }}>
                        {Object.values(basketStatus).map(status => (
                          <Step key={status} classes={{ root: classes.stepRoot }}>
                            <StepLabel>{status}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </ThemeProvider>
                    </div>
                  </Col>
                </Row>
              </li>
            ))}
          </ul> :
          <p>Vous n’avez aucune commande en cours.</p>
        }
      </div>
      <div className='treated-orders-container'>
        <h2>Commandes traitées </h2>

        {deliveredBaskets.length ?
          <ul className='baskets-container'>
            {deliveredBaskets.map((basket, index) => {
              let deliveredAt = new Date(basket.deliveredAt);

              return (
                <li key={index}>
                  <Row>
                    <Col md={3} xs={2} className='image-container'>
                      <img src={(basketsDetails.find(b => b.type === basket.type) || {}).img || defaultBasketSrc} />
                    </Col>
                    <Col md={9} xs={10} className='info-container'>
                      <Row>
                        <Col sm={5} className='basket-name-container'>
                          <h3>{(basketsDetails.find(b => b.type === basket.type) || {}).label}</h3>
                        </Col>
                        <Col sm={7} className='delivery-info-container'>
                          <h3>Commande {basket.orderRef}</h3>
                          <h3>Livrée : {deliveredAt.getDate()} {new Intl.DateTimeFormat('fr-FR', monthDisplayingOptions).format(deliveredAt)} {deliveredAt.getFullYear()}</h3>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </li>
              );
            })}
          </ul> :
          <p>Vous n’avez aucune commande traitée.</p>
        }
      </div>
    </div>
  )
}

export default ProfileOrders;
