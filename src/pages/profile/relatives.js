import React from 'react';
import { Col, Row } from 'react-bootstrap';

import SEO from '../../components/seo';
import Layout from '../../components/layout';
import ProfileGreeting from '../../components/Profile/ProfileGreeting';
import ProfileMenu from '../../components/Profile/ProfileMenu';
import ProfileRelatives from '../../components/Profile/ProfileRelatives';

import { useAuthentication } from '../../hooks/useAuthentication';

import './index.scss';

const ProfileRelativesPage = () => {
  const { loading } = useAuthentication({ redirect: '/' });

  return loading ? null : (
    <Layout noBackgroundColor={true} className='profile-background profile'>
      <SEO title='Profil' />

      <ProfileGreeting />

      <Row className='relatives-container'>
        <Col sm={4} className='left-column'>
          <ProfileMenu pageName='relatives' />
        </Col>
        <Col sm={8} className='right-column'>
          <ProfileRelatives />
        </Col>
      </Row>
    </Layout>
  );
}

export default ProfileRelativesPage;
