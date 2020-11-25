import { useEffect, useState } from 'react';

const useDemandForm = (submit, initialValues = {}) => {
  const [values, setValues] = useState({ ...initialValues });
  const [errors, setErrors] = useState({});

  const changeValue = (e) => {
    setErrors({
      ...errors,
      [e.target.name]: false,
    });
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitForm = () => {
    const isValid = checkValidity();

    if (isValid) {
      submit();
    }
  };

  const checkValidity = () => {
    const newErrors = {};

    if (!values['self-firstname']) {
      newErrors['self-firstname'] = true;
    }

    if (!values['self-lastname']) {
      newErrors['self-lastname'] = true;
    }

    if (!values['self-email']) {
      newErrors['self-email'] = true;
    }

    if (!values['other-firstname']) {
      newErrors['other-firstname'] = true;
    }

    if (!values['other-lastname']) {
      newErrors['other-lastname'] = true;
    }

    if (!values['other-country-code']) {
      newErrors['other-country-code'] = true;
    }

    if (!values['other-phone']) {
      newErrors['other-phone'] = true;
    }

    if (!values['other-location']) {
      newErrors['other-location'] = true;
    }

    if (!values['other-service']) {
      newErrors['other-service'] = true;
    }

    if (!values['budget']) {
      newErrors['budget'] = true;
    }

    setErrors({ ...errors, ...newErrors });

    return !Object.values(newErrors).includes(true);
  };

  const resetValues = () => setValues({ ...initialValues });

  return { changeValue, handleSubmitForm, errors, resetValues, setValues, values };
};

export default useDemandForm;
