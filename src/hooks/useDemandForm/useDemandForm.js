import { useEffect, useState } from 'react';

const useDemandForm = (submit, initialValues = {}) => {
  const [values, setValues] = useState({ ...initialValues });
  const [errors, setErrors] = useState({});
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  useEffect(() => {
    checkValidity();
  }, [isSubmittingForm]);

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

    if (!values['relative-firstname']) {
      newErrors['relative-firstname'] = true;
    }

    if (!values['relative-lastname']) {
      newErrors['relative-lastname'] = true;
    }

    if (!values['relative-country-code']) {
      newErrors['relative-country-code'] = true;
    }

    if (!values['relative-phone']) {
      newErrors['relative-phone'] = true;
    }

    if (!values['relative-location']) {
      newErrors['relative-location'] = true;
    }

    if (!values['relative-service']) {
      newErrors['relative-service'] = true;
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
