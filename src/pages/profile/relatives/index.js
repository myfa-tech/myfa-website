import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SEO from '../../../components/seo';
import Layout from '../../../components/layout';
import ProfileGreeting from '../../../components/Profile/ProfileGreeting';
import ProfileMenu from '../../../components/Profile/ProfileMenu';
import RelativesList from './RelativesList';
import ModifyRelativeForm from './ModifyRelativeForm';

import useTranslate from '../../../hooks/useTranslate';
import UserStorage from '../../../services/UserStorage';
import { useAuthentication } from '../../../hooks/useAuthentication';

import './relatives.scss';

const ProfileRelativesPage = () => {
  const user = UserStorage.getUser();
  const [relatives, setRelatives] = useState(user.recipients);
  const [relativeIndex, setRelativeIndex] = useState(-1);
  const [modifying, setModifying] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [t] = useTranslate();
  const { loading } = useAuthentication({ redirect: '/' });

  const modifyRelativeIndex = (index) => {
    if (index > -1) {
      setRelativeIndex(index);
    }

    if (index !== -1) {
      setModifying(true);
    }
  };

  const deleteRelative = (index) => {
    setRelativeIndex(index);
    setDeleting(true);
  };

  const closeDeletingModal = () => {
    setRelativeIndex(-1);
    setDeleting(false);
  };

  const confirmDelete = async () => {
    setIsLoading(true);
    relatives.splice(relativeIndex, 1);

    await updateUser({ recipients: relatives });
    setIsLoading(false);

    window.location.assign('/profile/relatives');
  };

  return loading ? null : (
    <Layout noBackgroundColor={true} className='profile-background profile'>
      <SEO title='Profil' />

      <ProfileGreeting />

      <Row className='relatives-container'>
        <Col sm={4} className='left-column'>
          <ProfileMenu pageName='relatives' />
        </Col>
        <Col sm={8} className='right-column'>
          <div id='profile-relatives'>
            {modifying ?
              <ModifyRelativeForm
                relatives={relatives}
                relative={relatives[relativeIndex]}
                relativeIndex={relativeIndex}
              /> :
              <RelativesList
                relatives={relatives}
                modifyRelativeIndex={modifyRelativeIndex}
                deleteRelative={deleteRelative}
                addRelative={modifyRelativeIndex}
              />
            }
            {deleting &&
              <Modal show={deleting} onHide={closeDeletingModal} id='deleting-modal'>
                <Modal.Body>
                  <div>
                    <img src={logoHandsSrc} alt='logo' className='logo-big' />

                    <p>{t('profile.relatives.verify_delete_relative_part_1')} {relatives[relativeIndex].firstname} {t('profile.relatives.verify_delete_relative_part_2')}</p>

                    <Row>
                      <Col xs={6}>
                        <button type='button' className='cancel-button' onClick={closeDeletingModal}>
                          {t('profile.relatives.cancel')}
                        </button>
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
                          <button type='button' className='confirm-button' onClick={confirmDelete}>
                            {t('profile.relatives.confirm')}
                          </button>
                        }
                      </Col>
                    </Row>
                  </div>
                </Modal.Body>
              </Modal>
            }
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default ProfileRelativesPage;
