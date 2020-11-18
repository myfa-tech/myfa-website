import { useState } from 'react';

const useStep1Form = (submit, initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const changeFormValues = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: false,
      });
    }
  };

  const handleSubmitForm = () => {
    const isValid = checkValidity();

    if (isValid) {
      submit();
    }
  };

  const checkValidity = () => {
    const newErrors = {};

    if (!values['firstname']) {
      newErrors['firstname'] = true;
    }

    if (!values['lastname']) {
      newErrors['lastname'] = true;
    }

    if (!values['phone']) {
      newErrors['phone'] = true;
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values['email']))) {
      newErrors['email'] = true;
    }

    setErrors({ ...errors, ...newErrors });

    return !Object.values(newErrors).includes(true);
  };

  const resetValues = () => setValues({ ...initialValues });

  return { changeFormValues, handleSubmitForm, errors, resetValues, setValues, values };
};

export default useStep1Form;
