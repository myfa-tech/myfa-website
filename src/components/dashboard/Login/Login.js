import React, { useState } from 'react';
import { handleLogin, isLoggedIn } from '../../../services/auth';
import { navigate } from 'gatsby';

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleUpdate = (event) => {
    const { name, value } = event.target;

    if (name === 'username') {
      setUsername(value);
    } else {
      setPassword(value);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin({ username, password });
    navigate('/app/profile');
  }

  if (isLoggedIn()) {
    navigate('/dashboard');
  }

  return (
    <>
      <h1>Log in</h1>
      <form method='post' onSubmit={handleSubmit}>
        <label>
          Username
          <input type='text' name='username' onChange={handleUpdate} />
        </label>
        <label>
          Password
          <input type='password' name='password' onChange={handleUpdate} />
        </label>
        <input type='submit' value='Log In' />
      </form>
    </>
  )
}

export default Login;
