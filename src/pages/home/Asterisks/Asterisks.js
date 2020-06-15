import React from 'react';
import Container from 'react-bootstrap/Container';
import useTranslate from '../../../hooks/useTranslate';

import './Asterisks.scss';

const Asterisks = () => {
  const [t] = useTranslate();

  return (
    <section id='asterisks'>
      <Container>
        <p>*{t('asterisks.working_days')}</p>
      </Container>
    </section>
  );
};

export default Asterisks;
