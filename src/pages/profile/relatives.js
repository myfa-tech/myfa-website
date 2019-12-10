import React from 'react';
import { Col, Row } from 'react-bootstrap';

import SEO from '../../components/seo';
import Layout from '../../components/layout';
import ProfileGreeting from '../../components/ProfileGreeting';
import ProfileMenu from '../../components/ProfileMenu';
import ProfileRelatives from '../../components/ProfileRelatives';

import useAuthentication from '../../hooks/useAuthentication';

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
