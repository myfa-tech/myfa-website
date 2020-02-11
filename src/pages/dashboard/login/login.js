import React, { useState } from 'react';
import DashboardLayout from '../../../components/dashboard/Layout';
import { handleLogin, isAdminLoggedIn } from '../../../services/auth';
import { navigate } from 'gatsby';

import './login.scss';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleUpdate = (event) => {
    const { name, value } = event.target;

    if (name === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleLogin({ email, password });

    navigate('/dashboard');
  }

  if (isAdminLoggedIn()) {
    navigate('/dashboard');
  }

  return (
    <DashboardLayout>
      <div className='login'>
        <h1>Connexion</h1>
        <form method='post' onSubmit={handleSubmit}>
          <label>
            Email
            <input type='text' name='email' onChange={handleUpdate} />
          </label>
          <label>
            Mot de passe
            <input type='password' name='password' onChange={handleUpdate} />
          </label>
          <input type='submit' value='Connexion' />
        </form>
      </div>
    </DashboardLayout>
  );
}

export default Login;
