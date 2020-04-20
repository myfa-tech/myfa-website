import React from 'react';
import { Col, Row } from 'react-bootstrap';

import SEO from '../../components/seo';
import Layout from '../../components/layout';
import ProfileGreeting from '../../components/Profile/ProfileGreeting';
import ProfileMenu from '../../components/Profile/ProfileMenu';
import ProfilePassword from '../../components/Profile/ProfilePassword';

import { useAuthentication } from '../../hooks/useAuthentication';

import './index.scss';

const ProfilePasswordPage = () => {
  const { loading } = useAuthentication({ redirect: '/' });

  return loading ? null : (
    <Layout noBackgroundColor={true} className='profile-background profile'>
      <SEO title='Profil' />

      <ProfileGreeting />

      <Row className='password-container'>
        <Col sm={4} className='left-column'>
          <ProfileMenu pageName='password' />
        </Col>
        <Col sm={8} className='right-column'>
          <ProfilePassword />
        </Col>
      </Row>
    </Layout>
  );
}

export default ProfilePasswordPage;
