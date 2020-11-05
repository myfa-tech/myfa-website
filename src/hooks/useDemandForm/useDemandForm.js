import { useState } from 'react';

const useDemandForm = (initialValues = {}) => {
  const [values, setValues] = useState({ ...initialValues });

  const changeValue = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const resetValues = setValues({ ...initialValues });

  return { changeValue, resetValues, setValues, values };
};

export default useDemandForm;
