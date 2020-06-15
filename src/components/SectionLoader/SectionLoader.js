import React from 'react';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

import './SectionLoader.scss';

const spinnerStyle = css`
  display: block;
  margin: 0 auto;
`;

const SectionLoader = () => {
  return (
    <div id='section-loader'>
      <div>
        <ClipLoader
          css={spinnerStyle}
          sizeUnit={'px'}
          size={25}
          color={'#000'}
          loading={true}
        />
      </div>
    </div>
  );
};

export default SectionLoader;
