import { useEffect, useState } from 'react'
import { navigate } from '@reach/router';
import { isAdminLoggedIn, isUserLoggedIn } from '../../services/auth';

const useAuthentication = ({ redirect }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isUserLoggedIn() && typeof window !== 'undefined') {
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
    if (!isAdminLoggedIn() && typeof window !== 'undefined') {
      navigate(redirect);
    } else {
      setLoading(false);
    }
  }, []);

  return { loading };
};

export { useAuthentication, useAdminAuthentication };
