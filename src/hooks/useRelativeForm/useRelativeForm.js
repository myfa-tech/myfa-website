import { useState, useEffect } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const INITIAL_VALUES = {
  firstname: '',
  lastname: '',
  relation: '',
  email: '',
  country: '+225',
  zone: '',
  phone: '',
};

const useRelativeForm = (submit, initialValues = INITIAL_VALUES) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({
    firstname: false,
    lastname: false,
    phone: false,
    zone: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtherRelationInput, setShowOtherRelationInput] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      if (areErrors()) {
        scrollToTop();
      } else if (!!isSubmitting) {
        submit();
      }

      setIsSubmitting(false);
    }
  }, [isSubmitting]);

  useEffect(() => {
    if (values.relation === 'AU') {
      setShowOtherRelationInput(true);
    } else {
      setShowOtherRelationInput(false);
    }
  }, [values]);

  const handleChangeValues = (e) => {
    const { name, value } = e.target;

    errors[name] = false;

    setErrors({ ...errors });
    setValues({ ...values, [name]: value });
  };

  const handleRecipientChange = (e) => {
    setValues({
      firstname: '',
      lastname: '',
      relation: '',
      email: '',
      country: '+225',
      zone: '',
      phone: '',
    });

    setErrors({
      firstname: false,
      lastname: false,
      phone: false,
      zone: false,
    });
  };

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }

    const { country, firstname, lastname, phone, zone } = values;
    const countryCodes = { '+225': 'CI', '+33': 'FR', '+1': 'US' };
    const phoneNumber = parsePhoneNumberFromString(phone, countryCodes[country]);

    if (!firstname) {
      errors.firstname = true;
    }

    if (!lastname) {
      errors.lastname = true;
    }

		if (!phoneNumber || !phoneNumber.isValid()) {
      errors.phone = true;
    }

    if (!zone) {
      errors.zone = true;
    }

    setErrors({ ...errors });
    setIsSubmitting(true);
  };

  const areErrors = () => !!Object.values(errors).filter(v => !!v).length;

  return [
    values,
    handleChangeValues,
    setValues,
    handleSubmit,
    errors,
    handleRecipientChange,
    showOtherRelationInput,
  ];
};

export default useRelativeForm;
