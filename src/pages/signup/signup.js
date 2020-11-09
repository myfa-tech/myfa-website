import React from 'react'

import Divider from '../../components/Divider';
import TextInput from '../../components/TextInput';
import CheckboxInput from '../../components/CheckboxInput';

import './signup.scss';

import myfaLogoSrc from '../../images/logo-1.png';
import Button from '../../components/Button';

const SignupPage = () => {
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

        <form>
          <div className='half-inputs-container'>
            <TextInput name='firstname' placeholder='Prénom' />
            <TextInput name='lastname' placeholder='Nom' />
          </div>

          <TextInput name='email' placeholder='Email' />

          <div className='half-inputs-container'>
            <TextInput name='country-code' placeholder='Indicatif' />
            <TextInput name='phone' placeholder='Numéro de téléphone' />
          </div>

          <TextInput name='password' placeholder='Mot de passe' />
          <span className='password-info'>8 caractères, 1 minuscule, 1 majuscule, 1 chiffre</span>

          <TextInput name='password-confirmation' placeholder='Confirmer le mot de passe' />

          <CheckboxInput name='newsletter' label='Je souhaite recevoir la newsletter' />

          <CheckboxInput name='cgv-cgu' label={<span>J'accepte les <a href='/cgv'>CGV</a> et <a href='/cgu'>CGU</a></span>} />

          <Button className='singup-btn' label='Créer mon compte' />

          <p className='login-text'>Vous avez un compte ? <a href='/login'>Connexion</a>.</p>
        </form>
      </div>
    </div>
  )
}

export default SignupPage;
