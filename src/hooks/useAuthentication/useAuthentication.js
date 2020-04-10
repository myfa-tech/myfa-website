import { useEffect, useState } from 'react'
import { isAdminLoggedIn, isUserLoggedIn } from '../../services/auth';
import { navigate } from 'gatsby';

const useAuthentication = ({ redirect }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isUserLoggedIn()) {
      navigate(redirect);
    } else {
      setLoading(false);
    }
  }, []);

  return { loading };
};

const useAdminAuthentication = ({ redirect }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate(redirect);
    } else {
      setLoading(false);
    }
  }, []);

  return { loading };
};

export { useAuthentication, useAdminAuthentication };
