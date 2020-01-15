import { useEffect, useState } from 'react'
import { isLoggedIn } from '../../services/auth';
import { navigate } from 'gatsby';

const useAuthentication = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/dashboard/login');
    } else {
      setLoading(false);
    }
  }, []);

  return { loading };
};

export default useAuthentication;
