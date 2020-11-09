import { useEffect, useState } from 'react';

const useSignupForm = (submit) => {
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    country: '+33',
    phone: '',
    password: '',
    newsletter: false,
    cgu: false,
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    firstname: false,
    lastname: false,
    cgu: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeValues = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;

    if (type === 'checkbox') {
      newValue = checked;
    }

    errors[name] = false;

    setErrors({ ...errors });
    setValues({ ...values, [name]: newValue });
  };

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

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstname, lastname, email, cgu, password } = values;

    if (!firstname) {
      errors.firstname = true;
    }

    if (!lastname) {
      errors.lastname = true;
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      errors.email = true;
    }

    if (!cgu) {
      errors.cgu = true;
    }

    if (!(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/.test(password))) {
      errors.password = true;
    }

    setErrors({ ...errors });
    setIsSubmitting(true);
  };

  const areErrors = () => !!Object.values(errors).filter(v => !!v).length;

  return { values, handleChangeValues, handleSubmit, errors, setErrors };
};

export default useSignupForm;
