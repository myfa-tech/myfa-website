import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FaEye, FaMapPin } from 'react-icons/fa';
import { Divider } from '@material-ui/core';

import SEO from '../../components/seo';
import Layout from '../../components/layout';
import NoJobs from './NoJobs';

import getFormattedDate from '../../utils/getFormattedDate';
import useTranslate from '../../hooks/useTranslate';
import logoHandsSrc from '../../images/logo-hands.png';

import './jobs.scss';

const JobsPage = () => {
  const [t] = useTranslate();

  const jobs = [
    // { title: 'Stage business developer', date: new Date('2020-05-26'), location: 'Paris, Station F / Remote', file: 'stage_myfa_bizdev.pdf' },
  ];

  return (
    <Layout className='jobs'>
      <SEO title='Jobs' />

      <div className='title-container'>
        <h2>{t('jobs.title')} </h2>
      </div>

      <div className='content-container'>
        <h3>Nos offres</h3>

        <Divider />

        {jobs.length ? jobs.map(job => (
          <Row className='job-row'>
            <Col sm={1} className='img-container d-none d-sm-block'>
              <img src={logoHandsSrc} />
            </Col>
            <Col xs={10}>
              <h4>{job.title}</h4>
              <div className='sub-info'>{getFormattedDate(job.date)}</div>
              <div className='sub-info'><FaMapPin /> {job.location}</div>
            </Col>
            <Col sm={1} xs={2} className='buttons-container'>
              <Button className='download-btn' as='a' href={`/${job.file}`} target="_blank"><FaEye /></Button>
            </Col>
          </Row>
        )) : <NoJobs />}
      </div>
    </Layout>
  );
};

export default JobsPage;
