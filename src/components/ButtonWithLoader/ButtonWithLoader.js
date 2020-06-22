import React from 'react';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

import './ButtonWithLoader.scss';

const spinnerStyle = css`
  display: block;
  margin: 0 auto;
`;

const ButtonWithLoader = ({ isLoading, label, onClick, className, type, disabled }) => {
  return isLoading ?
    <button className={`${className} button-with-loader`} type={type ? type : 'submit'}>
      <ClipLoader
        css={spinnerStyle}
        sizeUnit={'px'}
        size={25}
        color={'#000'}
        loading={true}
      />
    </button> :
    <button className={`${className} button-with-loader`} disabled={disabled} type={type ? type : 'submit'} onClick={onClick ? onClick : () => {}}>{label}</button>
};

export default ButtonWithLoader;
