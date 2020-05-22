import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import useTranslate from '../../../../hooks/useTranslate';

import './RelativesList.scss';

const getZone = (code) => {
  const zones = {
    '2PL': '2 Plateaux',
    'AB': 'Abobo',
    'AD': 'Adjamé',
    'AT': 'Attécoubé',
    'CO': 'Cocody',
    'KO': 'Koumassi',
    'MA': 'Marcory',
    'PL': 'Plateau',
    'PB': 'Port-Bouet',
    'RI': 'Riviera',
    'TR': 'Treichville',
    'YO': 'Yopougon',
  };

  return zones[code] || code;
};


const RelativesList = ({ addRelative, relatives, modifyRelativeIndex, deleteRelative }) => {
  const [t] = useTranslate();

  useEffect(() => {
    modifyRelativeIndex(-1);
  }, []);

  return (
    <>
      <div className='relatives-list-title-container'>
        <h2>{t('profile.relatives.headline')}</h2>

        <button type='button' className='add-relative-button' onClick={() => addRelative()}>
          {t('profile.relatives.add_relative')}
        </button>
      </div>
      <div className='relatives-list-container'>
        <h2>{t('profile.relatives.my_relatives')}</h2>

        {relatives && relatives.length ?
          <ul className='relatives-container'>
            {relatives.map((relative, index) => {
              return (
                <li key={`${relative.firstname}-${relative.lastname}`}>
                  <Row>
                    <Col xs={7} sm={9} className='info-container'>
                      <p className='relatives-info'>{relative.firstname} {relative.lastname}</p>
                      {relative.address ? <p className='relatives-info'>{relative.address}</p> : null}
                      <p className='relatives-info'>{relative.country}{relative.phone}</p>
                      <p className='relatives-info'>{getZone(relative.zone)}</p>
                    </Col>
                    <Col xs={5} sm={3} className='edit-container'>
                      <button className='action' onClick={() => modifyRelativeIndex(index)}>
                        {t('profile.relatives.modify')}
                      </button>
                      <button className='action' onClick={() => deleteRelative(index)}>
                        {t('profile.relatives.delete')}
                      </button>
                    </Col>
                  </Row>
                </li>
              );
            })}
          </ul> :
          <p className='no-relatives'>Vous n’avez pas encore enregistré de proche.</p>
        }
      </div>
    </>
  );
};

export default RelativesList;
