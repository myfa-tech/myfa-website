import React from 'react';
import { Col, Row } from 'react-bootstrap';

import SEO from '../../components/seo';
import Layout from '../../components/layout';
import ProfileGreeting from '../../components/ProfileGreeting';
import ProfileMenu from '../../components/ProfileMenu';
import ProfileInformation from '../../components/ProfileInformation';

import { useAuthentication } from '../../hooks/useAuthentication';

import './index.scss';

const ProfileInformationPage = () => {
  const { loading } = useAuthentication({ redirect: '/' });

  return loading ? null : (
    <Layout noBackgroundColor={true} className='profile-background profile'>
      <SEO title='Profil' />

      <ProfileGreeting />

      <Row className='information-container'>
        <Col sm={4} className='left-column'>
          <ProfileMenu pageName='information' />
        </Col>
        <Col sm={8} className='right-column'>
          <ProfileInformation />
        </Col>
      </Row>
    </Layout>
  );
};

export default ProfileInformationPage;
