import { useState, useEffect } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { isEqual } from 'lodash';

const useRelativeForm = (submit) => {
  const user = JSON.parse(window.localStorage.getItem('user'));

  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    relation: '',
    email: '',
    country: '+225',
    zone: '',
    phone: '',
  });
  const [errors, setErrors] = useState({
    firstname: false,
    lastname: false,
    phone: false,
    zone: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recipientIndex, setRecipientIndex] = useState(0);
  const [isFirstUpdate, setIsFirstUpdate] = useState(true);

  useEffect(() => {
    setIsFirstUpdate(false);
  }, []);

  useEffect(() => {
    if (recipientIndex !== -1 && !!user.recipients.length) {
      const newFormValues = user.recipients[recipientIndex];
      setValues({ ...newFormValues });
    }
  }, [recipientIndex]);

  useEffect(() => {
    if (recipientIndex !== -1 && !isEqual(user.recipients[recipientIndex], values) && !isFirstUpdate) {
      setRecipientIndex(-1);
    }
  }, [values]);

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
    setRecipientIndex(Number(e.target.value));
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleSubmit = () => {
    const { country, firstname, lastname, phone, zone } = values;
    const countryCodes = { '+225': 'CI', '+33': 'FR' };
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
    handleSubmit,
    errors,
    recipientIndex,
    handleRecipientChange
  ];
};

export default useRelativeForm;
