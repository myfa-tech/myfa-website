import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

import { deleteAccount } from '../../services/users';
import useTranslate from '../../hooks/useTranslate';

import './ProfileMenu.scss';

import logoHandsSrc from '../../images/logo-1.png';

const ProfileMenu = ({ pageName }) => {
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [t] = useTranslate();

  const toggleDeleteAccountModal = () => {
    setShowDeleteAccountModal(!showDeleteAccountModal);
  };

  const confirmDeleteAccount = async () => {
    setIsLoading(true);
    await deleteAccount();
    setIsLoading(false);

    if (typeof window !== 'undefined') {
      window.location.assign('/logout');
    }
  };

  const listItems = [
    { label: t('profile.menu.my_info'), link: '/profile/information' },
    { label: t('profile.menu.my_orders'), link: '/profile/orders' },
    { label: t('profile.menu.password'), link: '/profile/password' },
    { label: t('profile.menu.relatives'), link: '/profile/relatives' },
    { label: t('profile.menu.logout'), link: '/logout' },
  ];

  const spinnerStyle = css`
    display: block;
    margin: 0 auto;
  `;

  return (
    <div id='profile-menu'>
      <ul className='list-container'>
        {listItems.map(item => (
          <li key={item.link} className={item.link.includes(pageName) ? 'active' : ''}><a href={item.link}>{item.label}</a></li>
        ))}

        <li key='/signout'><a href='#' onClick={toggleDeleteAccountModal}>{t('profile.menu.delete_account')}</a></li>
      </ul>

      {showDeleteAccountModal &&
        <Modal show={showDeleteAccountModal} onHide={toggleDeleteAccountModal} id='delete-account-modal'>
          <Modal.Body>
            <div>
              <img src={logoHandsSrc} alt='logo' className='logo-big' />

              <p>Etes-vous sûr(e) de vouloir supprimer votre compte ?</p>

              <Row>
                <Col xs={6}>
                  <button type='button' className='cancel-button' onClick={toggleDeleteAccountModal}>Annuler</button>
                </Col>
                <Col xs={6}>
                  {isLoading ?
                    <button className='confirm-button'>
                      <ClipLoader
                        css={spinnerStyle}
                        sizeUnit={'px'}
                        size={25}
                        color={'#000'}
                        loading={true}
                      />
                    </button> :
                    <button type='button' className='confirm-button' onClick={confirmDeleteAccount}>Confirmer</button>
                  }
                </Col>
              </Row>
            </div>
          </Modal.Body>
        </Modal>
      }
    </div>
  );
};

export default ProfileMenu;
