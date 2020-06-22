import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaCheck } from 'react-icons/fa';

import ButtonWithLoader from '../../ButtonWithLoader';

import useTranslate from '../../../hooks/useTranslate';
import { isPromoValid } from '../../../services/promos';

import './PromoCode.scss';

const PromoCode = ({ applyPromo, promoActivated, promoPercentage }) => {
  const [t] = useTranslate();
  const [promoIsLoading, setPromoIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [code, setCode] = useState('');

  const testPromo = async (e) => {
    e.preventDefault();
    setPromoIsLoading(true);
    const result = await isPromoValid(code);
    setError(!result);
    setPromoIsLoading(false);

    if (result) {
      applyPromo(code);
      setCode('');
    }
  };

  const editCode = (e) => {
    setError(false);
    setCode(e.target.value);
  };

  return (
    <div id='promo-code'>
      <h2>{t('cart.promo_code_title')}</h2>

      <Divider variant='middle' />

      <form className='code-form' noValidate onSubmit={testPromo}>
        <div className='promo-code-container'>
          <Row>
            <Col xs={9}>
              <TextField
                className='full-width form-input'
                variant='outlined'
                label='Code promo'
                error={error}
                fullWidth
                name='promo'
                value={code !== ' ' ? code : ''}
                onChange={editCode}
              />
            </Col>
            <Col xs={3}>
              <ButtonWithLoader
                isLoading={promoIsLoading}
                label={
                  <>
                    <span className='validate-promo-big'>{t('cart.promo_validate')}</span>
                    <span className='validate-promo-small'>
                      <FaCheck />
                    </span>
                  </>
                }
                onClick={testPromo}
                className='promo-button'
              />
            </Col>
          </Row>
          {promoActivated ? <p className='promo-activated-text'>Promo activée (-{promoPercentage}%)</p> : null}
        </div>
      </form>
    </div>
  );
};

export default PromoCode;
