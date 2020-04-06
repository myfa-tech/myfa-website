import React from 'react';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

import './ButtonWithLoader.scss';

const spinnerStyle = css`
  display: block;
  margin: 0 auto;
`;

const ButtonWithLoader = ({ isLoading, label, onClick, className }) => {
  return isLoading ?
    <button className={`${className} button-with-loader`}>
      <ClipLoader
        css={spinnerStyle}
        sizeUnit={'px'}
        size={25}
        color={'#000'}
        loading={true}
      />
    </button> :
    <button className={`${className} button-with-loader`} onClick={onClick}>{label}</button>
};

export default ButtonWithLoader;
