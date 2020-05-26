import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { FaFileDownload, FaMapPin } from 'react-icons/fa';
import { Divider } from '@material-ui/core';

import SEO from '../../components/seo';
import Layout from '../../components/layout';

import useTranslate from '../../hooks/useTranslate';
import logoHandsSrc from '../../images/logo-hands.png';

import './jobs.scss';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const JobsPage = () => {
  const [t] = useTranslate();

  const getDate = (rawDate) => {
    let date = new Date(rawDate);
    let months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"];
    let dateDay = date.getUTCDate();
    let dateMonth = months[date.getUTCMonth()];
    let dateYear = date.getUTCFullYear();

    let dateString = `${dateDay} ${dateMonth} ${dateYear}`;

    return dateString;
  };

  const jobs = [
    { title: 'Stage business developer', date: getDate(new Date('2020-05-26')), location: 'Paris, Station F / Remote', file: 'stage_myfa_bizdev.pdf' },
  ];

  return (
    <Layout noBackgroundColor={true} className='jobs'>
      <SEO title='Jobs' />

      <div className='title-container'>
        <h2>{t('jobs.title')} </h2>
      </div>

      <div className='content-container'>
        <h3>Nos offres</h3>

        <Divider />

        {jobs.map(job => (
          <Row className='job-row'>
            <Col sm={1} className='img-container d-none d-sm-block'>
              <img src={logoHandsSrc} />
            </Col>
            <Col xs={10}>
              <h4>{job.title}</h4>
              <div className='sub-info'>{job.date}</div>
              <div className='sub-info'><FaMapPin /> {job.location}</div>
            </Col>
            <Col sm={1} xs={2} className='buttons-container'>
              <Button className='download-btn' as='a' href={`${REACT_APP_BACKEND_URL}/jobs/${job.file}`}><FaFileDownload /></Button>
            </Col>
          </Row>
        ))}
      </div>
    </Layout>
  );
};

export default JobsPage;
