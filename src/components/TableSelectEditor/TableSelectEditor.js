import React from 'react';

import './TableSelectEditor.scss';

const TableSelectEditor = ({ value, options, onUpdate, ...rest }) => {
  let selector = null;

  const getValue = () => {
    return selector.value;
  };

  const update = () => {
    onUpdate(getValue());
  };

  return (
    <select onChange={update} value={value} ref={node => selector = node} className='select-editor'>
      {options.map(op => (
        <option key={op.value} value={op.value}>{op.label}</option>
      ))}
    </select>
  );
};

export default TableSelectEditor;
