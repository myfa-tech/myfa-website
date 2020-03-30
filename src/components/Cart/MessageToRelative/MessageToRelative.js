import React from 'react';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

import './MessageToRelative.scss';
import useTranslate from '../../../hooks/useTranslate';

const MessageToRelative = ({ message, handleChangeMessage }) => {
  const [t, locale] = useTranslate();

  return (
    <div id='message-to-relative'>
      <h2>{t('cart.message_to_relative_title')}</h2>

      <Divider variant='middle' />

      <form className='personal-form' noValidate>
        <TextField
          className='full-width form-input'
          variant='outlined'
          label='Message'
          multiline
          fullWidth
          name='message'
          value={message}
          onChange={(e) => handleChangeMessage(e.target.value)}
        />
      </form>
    </div>
  );
};

export default MessageToRelative;
