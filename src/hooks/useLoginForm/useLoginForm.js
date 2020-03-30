import { useEffect, useState } from 'react';

const useLoginForm = (submit, setResponseStatus) => {
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeValues = (e) => {
    const { name, value } = e.target;

    errors[name] = false;

    setResponseStatus(null);
    setErrors({ ...errors });
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    const asyncFunc = async () => {
      if (isSubmitting) {
        if (areErrors()) {
          scrollToTop();
        } else if (!!isSubmitting) {
          await submit();
        }

        setIsSubmitting(false);
      }
    }

    asyncFunc();
  }, [isSubmitting]);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = values;

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      errors.email = true;
    }

    if (!(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/.test(password))) {
      errors.password = true;
    }

    setErrors({ ...errors });
    setIsSubmitting(true);
  };

  const areErrors = () => !!Object.values(errors).filter(v => !!v).length;

  return [values, handleChangeValues, handleSubmit, errors, setErrors];
};

export default useLoginForm;
