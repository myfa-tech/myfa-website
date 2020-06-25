import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import TextField from '@material-ui/core/TextField';

import ButtonWithLoader from '../../ButtonWithLoader';

import useRelativeForm from '../../../hooks/useRelativeForm';
import useTranslate from '../../../hooks/useTranslate';
import { updateUser } from '../../../services/users';
import CartStorage from '../../../services/CartStorage';

import './AddRecipientModal.scss';
import UserStorage from '../../../services/UserStorage';

const AddRecipientModal = ({ cart, showModal, toggleModal, basketIndex }) => {
  const [
    form,
    handleChangeFormValue,
    setRelativeFormValues,
    handleSubmitForm,
    errors,
    handleRelativeFormRecipientChange,
    showOtherRelationInput,
  ] = useRelativeForm(submit);
  const [t] = useTranslate();

  async function submit() {
    if (typeof window !== 'undefined') {
      const user = UserStorage.getUser();

      if (!user.recipients) {
        user.recipients = [];
      }

      user.recipients.push(form);

      await updateUser({ recipients: user.recipients });

      const userUpdated = UserStorage.getUser();

      const newRecipient = userUpdated.recipients.find(rec => rec.firstname === form.firstname && rec.lastname === form.lastname && rec.phone === form.phone);

      cart.baskets[basketIndex].recipient = newRecipient;
      CartStorage.editCart({ ...cart });

      window.location.reload();
    }
  };

  return (
    <Modal dialogClassName='modal-90w modal-75w' show={showModal} onHide={toggleModal} id='add-recipient-modal'>
      <Modal.Header closeButton className='header-text'>
        {t('cart.relative_info.modal_title')}
      </Modal.Header>
      <Modal.Body>
        <form className='relative-form' onSubmit={handleSubmitForm}>
          <Row>
            <Col xs='6' className='left-input'>
              <TextField
                type='text'
                required
                error={errors['firstname']}
                label={t('cart.relative_info.firstname')}
                variant='outlined'
                className='full-width form-input'
                name='firstname'
                value={form.firstname}
                onChange={handleChangeFormValue}
              />
            </Col>
            <Col xs='6' className='right-input'>
              <TextField
                type='text'
                required
                variant='outlined'
                className='full-width form-input'
                error={errors['lastname']}
                label={t('cart.relative_info.lastname')}
                name='lastname'
                value={form.lastname}
                onChange={handleChangeFormValue}
              />
            </Col>
          </Row>
          <TextField
            type='email'
            className='full-width form-input'
            variant='outlined'
            error={errors['email']}
            label='Email'
            name='email'
            value={form.email}
            onChange={handleChangeFormValue}
          />
          <TextField
            select
            SelectProps={{
              native: true,
            }}
            label={t('cart.relative_info.relationship')}
            name='relation'
            variant='outlined'
            className='full-width form-input'
            value={form.relation}
            onChange={handleChangeFormValue}
          >
            <option value='AM'>{t('relationship_types.AM')}</option>
            <option value='CO'>{t('relationship_types.CO')}</option>
            <option value='EN'>{t('relationship_types.EN')}</option>
            <option value='FR'>{t('relationship_types.FR')}</option>
            <option value='GM'>{t('relationship_types.GM')}</option>
            <option value='GP'>{t('relationship_types.GP')}</option>
            <option value='ME'>{t('relationship_types.ME')}</option>
            <option value='NE'>{t('relationship_types.NE')}</option>
            <option value='NI'>{t('relationship_types.NI')}</option>
            <option value='ON'>{t('relationship_types.ON')}</option>
            <option value='PE'>{t('relationship_types.PE')}</option>
            <option value='SO'>{t('relationship_types.SO')}</option>
            <option value='TA'>{t('relationship_types.TA')}</option>
            <option value='AU'>{t('relationship_types.AU')}</option>
          </TextField>

          {showOtherRelationInput ?
            <TextField
              type='text'
              className='full-width form-input'
              variant='outlined'
              error={errors['otherRelation']}
              label={t('cart.relative_info.relationship_type')}
              name='otherRelation'
              value={form.otherRelation}
              onChange={handleChangeFormValue}
            /> : null
          }

          <TextField
            select
            label={t('cart.relative_info.delivery_zone')}
            required
            SelectProps={{
              native: true,
            }}
            name='zone'
            error={errors['zone']}
            variant='outlined'
            placeholder={t('cart.relative_info.delivery_zone_placeholder')}
            value={form.zone}
            className='full-width form-input'
            onChange={handleChangeFormValue}
          >
            <option value='2PL'>2 Plateaux</option>
            <option value='AB'>Abobo</option>
            <option value='AD'>Adjamé</option>
            <option value='AT'>Attécoubé</option>
            <option value='CO'>Cocody</option>
            <option value='KO'>Koumassi</option>
            <option value='MA'>Marcory</option>
            <option value='PL'>Plateau</option>
            <option value='PB'>Port-Bouët</option>
            <option value='RI'>Riviera</option>
            <option value='TR'>Treichville</option>
            <option value='YO'>Yopougon</option>
          </TextField>
          <Row>
            <Col xs={4} className='left-input'>
              <TextField
                select
                label={t('cart.relative_info.country_code')}
                name='country'
                SelectProps={{
                  native: true,
                }}
                variant='outlined'
                className='country-code full-width form-input'
                value={form.country}
                onChange={handleChangeFormValue}
              >
                <option value='+225'>🇨🇮 +225</option>
                <option value='+33'>🇫🇷 +33</option>
                <option value='+1'>🇺🇸 +1</option>
              </TextField>
            </Col>
            <Col xs={8} className='right-input'>
              <TextField
                type='tel'
                error={errors['phone']}
                label={t('cart.relative_info.phone')}
                variant='outlined'
                name='phone'
                required
                className='full-width phone-input form-input'
                value={form.phone}
                onChange={handleChangeFormValue}
              />
            </Col>
          </Row>

          <ButtonWithLoader
            isLoading={false}
            label={t('cart.relative_info.button_add')}
            className='full-width'
          />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddRecipientModal;
