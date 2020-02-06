import React from 'react';
import { Col, Row } from 'react-bootstrap';

import SEO from '../../components/seo';
import Layout from '../../components/layout';
import ProfileGreeting from '../../components/ProfileGreeting';
import ProfileMenu from '../../components/ProfileMenu';
import ProfileOrders from '../../components/ProfileOrders';

import { useAuthentication } from '../../hooks/useAuthentication';

import './index.scss';

const ProfileOrdersPage = () => {
  const { loading } = useAuthentication({ redirect: '/' });

  return loading ? null : (
    <Layout noBackgroundColor={true} className='profile-background profile'>
      <SEO title='Profil' />

      <ProfileGreeting />

      <Row className='orders-container'>
        <Col sm={4} className='left-column'>
          <ProfileMenu pageName='orders' />
        </Col>
        <Col sm={8} className='right-column'>
          <ProfileOrders />
        </Col>
      </Row>
    </Layout>
  );
};

export default ProfileOrdersPage;
