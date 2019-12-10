import { useEffect, useState } from 'react'
import { isLoggedIn } from '../../services/auth';
import { navigate } from 'gatsby';

const useAuthentication = ({ redirect }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate(redirect);
    } else {
      setLoading(false);
    }
  }, []);

  return { loading };
};

export default useAuthentication;
