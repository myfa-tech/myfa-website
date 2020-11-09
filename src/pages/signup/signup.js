import React, { useState } from 'react'

import Divider from '../../components/Divider';
import TextInput from '../../components/TextInput';
import CheckboxInput from '../../components/CheckboxInput';
import Button from '../../components/Button';

import myfaLogoSrc from '../../images/logo-1.png';
import useSignupForm from '../../hooks/useSignupForm';
import saveUser from '../../services/users/saveUser';

import './signup.scss';

const SignupPage = () => {
  const { values: formValues, handleChangeValues: handleChangeFormValues, handleSubmit, errors } = useSignupForm(submit);
  const [userAlreadyExistsError, setUserAlreadyExistsError] = useState(false);

  async function submit() {
    try {
      await saveUser({ ...formValues });
      // @TODO: redirect to right page
      console.log('SAVED USER');
    } catch (e) {
      console.log(e);
      setUserAlreadyExistsError(true);
    }
  };

  return (
    <div id='signup-page'>
      <div id='left-column'>
        <img src={myfaLogoSrc} />

        <div className='description-container'>
          <ul>
            <li>✅ Un service rapide</li>
            <li>✅ 100% de transparence</li>
            <li>✅ Gestion des dépenses</li>
            <li>✅ Un service personnalisé</li>
          </ul>
        </div>
      </div>
      <div id='right-column'>
        <h1>Créez votre compte MYFA</h1>

        <Divider />

        <form onSubmit={handleSubmit}>
          <div className='half-inputs-container'>
            <TextInput className={`${errors['firstname'] ? 'error' : ''}`} value={formValues['firstname']} onChange={handleChangeFormValues} name='firstname' placeholder='Prénom' />
            <TextInput className={`${errors['lastname'] ? 'error' : ''}`} value={formValues['lastname']} onChange={handleChangeFormValues} name='lastname' placeholder='Nom' />
          </div>

          <TextInput className={`${errors['email'] ? 'error' : ''}`} value={formValues['email']} onChange={handleChangeFormValues} name='email' placeholder='Email' />

          <div className='half-inputs-container'>
            <TextInput className={`${errors['country-code'] ? 'error' : ''}`} value={formValues['country-code']} onChange={handleChangeFormValues} name='country-code' placeholder='Indicatif' />
            <TextInput className={`${errors['phone'] ? 'error' : ''}`} value={formValues['phone']} onChange={handleChangeFormValues} name='phone' placeholder='Numéro de téléphone' />
          </div>

          <TextInput
            className={`${errors['password'] ? 'error' : ''}`}
            value={formValues['password']}
            onChange={handleChangeFormValues}
            name='password'
            helpText='8 caractères, 1 minuscule, 1 majuscule, 1 chiffre'
            placeholder='Mot de passe'
          />

          <TextInput className={`${errors['password-confirmation'] ? 'error' : ''}`} value={formValues['password-confirmation']} onChange={handleChangeFormValues} name='password-confirmation' placeholder='Confirmer le mot de passe' />

          <CheckboxInput className={`${errors['newsletter'] ? 'error' : ''}`} value={formValues['newsletter']} onChange={handleChangeFormValues} name='newsletter' label='Je souhaite recevoir la newsletter' />

          <CheckboxInput className={`${errors['cgu'] ? 'error' : ''}`} value={formValues['cgu']} onChange={handleChangeFormValues} name='cgu' label={<span>J'accepte les <a href='/cgv'>CGV</a> et <a href='/cgu'>CGU</a></span>} />

          {userAlreadyExistsError ? <p className='user-already-exists-error'>L'utilisateur existe déja.</p> : null}

          <Button type='submit' className='singup-btn' label='Créer mon compte' />

          <p className='login-text'>Vous avez un compte ? <a href='/login'>Connexion</a>.</p>
        </form>
      </div>
    </div>
  )
}

export default SignupPage;
