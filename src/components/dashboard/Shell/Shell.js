import React from 'react';
import useAuthentication from '../../../hooks/useAuthentication';

import './Shell.scss';

const Shell = ({ children }) => {
  const { loading } = useAuthentication();

  return loading ? null : (
    <div className='dashboard-shell'>
      <div className='sidebar'>

      </div>
      <div className='content'>
        {children}
      </div>
    </div>
  );
};

export default Shell;
