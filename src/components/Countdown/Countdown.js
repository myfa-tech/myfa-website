import React, { useState } from 'react';

import './Countdown.scss';
import useInterval from '../../hooks/useInterval';
import useTranslate from '../../hooks/useTranslate';

const initSeconds = () => {
  const endDate = new Date(2020, 2, 31, 23, 23, 23).getTime();
  const now = new Date().getTime();

  return Math.floor((endDate - now) / 1000);
};

const formatDistance = (seconds, t) => {
  let s = seconds;

  const d = Math.floor(s / (3600*24));
  if (d >= 1) {
    s -= d * (3600*24);
  }

  const h = Math.floor(s / 3600);
  if (h >= 1) {
    s -= h * 3600;
  }

  const mins = Math.floor(s / 60);
  if (mins >= 1) {
    s -= mins * 60;
  }

  return `${d}${t('countdown.d')} ${h}${t('countdown.h')} ${mins}${t('countdown.m')} ${s}${t('countdown.s')}`;
};

const Countdown = () => {
  const [seconds, setSeconds] = useState(initSeconds());
  const [t] = useTranslate();

  useInterval(() => {
    if (seconds > 0) {
      setSeconds(seconds - 1);
    }
  }, 1000);

  return (
    <div id='countdown'>
      <p>{t('countdown.title')}</p>
      <p>{formatDistance(seconds, t)}</p>
    </div>
  );
};

export default Countdown;
