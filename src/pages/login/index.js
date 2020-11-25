import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { FaFacebook } from 'react-icons/fa';
import GoogleLogin from 'react-google-login';

import ButtonWithLoader from '../../components/ButtonWithLoader';
import TextInput from '../../components/TextInput';

import loginUser from '../../services/users/loginUser';

import googleLogoSrc from '../../images/google_logo.svg';
import myfaLogoSrc from '../../images/logo-1.png';
import leftPeopleSrc from '../../images/login-left-people.png';
import rightPeopleSrc from '../../images/old-guy.png';

import './login.scss';

const REACT_APP_FB_APP_ID = process.env.REACT_APP_FB_APP_ID;
const REACT_APP_GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const loginPage = () => {
  const [formValues, setFormValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFBLoading, setIsFBLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [wrongCreds, setWrongCreds] = useState(false);

  const editFormValues = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    })
  };

  const onLogin = () => {
    console.log('is logged in');
    // @TODO: redirect to right page and set cookie
  };

  async function login() {
    try {
      setIsLoading(true);
      await loginUser(formValues);
      onLogin();
    } catch(e) {
      console.log(e);
      setWrongCreds(true);
    } finally {
      setIsLoading(false);
    }
  };

  const responseFacebook = async (response) => {
    const { name, email } = response;

    try {
      if (!!name) {
        let user = {
          firstname: name.split(' ')[0],
          lastname: name.split(' ')[1],
          email,
          cgu: true,
          emailConfirmed: true,
          fbToken: response.accessToken,
        };

        setIsFBLoading(true);
        await loginFBUser(user);
        onLogin();
      } else {
        // @TODO: deal with error
        console.log(response);
      }
    } catch(e) {
      console.log(e);
    } finally {
      setIsFBLoading(false);
    }
  };

  const responseGoogle = async (response) => {
    try {
      const { givenName, familyName, email } = response.profileObj;

      if (!!email) {
        let user = {
          firstname: givenName,
          lastname: familyName,
          email,
          cgu: true,
          emailConfirmed: true,
          googleToken: response.accessToken,
        };

        setIsGoogleLoading(true);
        await loginGoogleUser(user);
        onLogin();
      } else {
        // @TODO: deal with error
        console.log(response);
      }
    } catch(e) {
      console.log(e);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const componentClicked = () => {};

  return (
    <div id='login-page'>
      <img src={leftPeopleSrc} id='left-people-img' />

      <div className='middle-column'>
        <a href='/'><img id='myfa-logo' src={myfaLogoSrc} /></a>

        <div id='form-container'>
          <h2>Connectez-vous à votre compte</h2>

          <TextInput className={`email-input ${wrongCreds ? 'error' : ''}`} value={formValues.email} name='email' onChange={editFormValues} placeholder='Email' />

          <TextInput type='password' className={`password-input ${wrongCreds ? 'error' : ''}`} value={formValues.password} name='password' onChange={editFormValues} placeholder='Mot de passe' />

          <div className='password-bottom-container'>
            <span className='password-info'>8 caractères, 1 minuscule, 1 majuscule, 1 chiffre</span>
            <a className='password-forgotten' href='/forget-pwd'>Mot de passe oublié ?</a>
          </div>

          {wrongCreds ? <p className='wrong-creds-message'>L'email ou le mot de passe est inccorect.</p> : null}

          <div className='btns-container'>
            <ButtonWithLoader onClick={login} isLoading={isLoading} className='login-button' label='Se connecter' />

            <FacebookLogin
              appId={REACT_APP_FB_APP_ID}
              autoLoad={false}
              fields='name, email'
              callback={responseFacebook}
              onClick={componentClicked}
              render={renderProps => (
                <button type='button' className='facebook-button' onClick={renderProps.onClick}>
                  {isFBLoading ?
                    <ClipLoader
                      css={spinnerStyle}
                      sizeUnit={'px'}
                      size={25}
                      color={'#fff'}
                      loading={true}
                    /> :
                    <>
                      <FaFacebook />
                    <span>Continuer avec Facebook</span>
                    </>
                  }
                </button>
              )}
            />

            <GoogleLogin
              clientId={`${REACT_APP_GOOGLE_CLIENT_ID}.apps.googleusercontent.com`}
              buttonText='Login'
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              render={renderProps => (
                <button type='button' className='google-button' onClick={renderProps.onClick}>
                  {isGoogleLoading ?
                    <ClipLoader
                      css={spinnerStyle}
                      sizeUnit={'px'}
                      size={25}
                      color={'#fff'}
                      loading={true}
                    /> :
                    <>
                      <img src={googleLogoSrc} />
                      <span>Continuer avec Google</span>
                    </>
                  }
                </button>
              )}
            />
          </div>

          <p className='cgu-cgv-disclaimer'>
            En vous connectant, vous acceptez nos <a href='/cgv'>CGV</a> et <a href='/cgu'>CGU</a>.
          </p>
        </div>

        <p className='bottom-signup'>Vous n’avez pas de  compte ? <a href='/signup'>S’inscrire.</a></p>
      </div>

      <img src={rightPeopleSrc} id='right-people-img' />
    </div>
  );
};

export default loginPage;
