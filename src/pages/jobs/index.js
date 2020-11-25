import React from 'react';
import { FaEye, FaMapPin } from 'react-icons/fa';
import Divider from '../../components/Divider';

import SEO from '../../components/seo';
import Button from '../../components/Button';
import Layout from '../../components/Layout';
import NoJobs from './NoJobs';

import getFormattedDate from '../../utils/getFormattedDate';
import logoHandsSrc from '../../images/logo-hands.png';

import './jobs.scss';

const JobsPage = () => {
  const jobs = [
    { title: 'Stage developer Node/ReactJS', date: new Date('2020-11-24'), location: 'Paris, Station F / Remote', file: 'offre_web_myfa.pdf' },
  ];

  return (
    <Layout className='jobs' color='mix'>
      <SEO title='Jobs' />

      <div className='title-container'>
        <h2>Nous rejoindre </h2>
      </div>

      <div className='content-container'>
        <h3>Nos offres</h3>

        <Divider full />

        {jobs.length ? jobs.map(job => (
          <div className='job-row'>
            <div className='img-container d-none d-sm-block'>
              <img src={logoHandsSrc} />
            </div>
            <div className='description'>
              <h4>{job.title}</h4>
              <div className='sub-info'>Posté le {getFormattedDate(job.date)}</div>
              <div className='sub-info'><FaMapPin /> {job.location}</div>
            </div>
            <div className='buttons-container'>
              <Button label={<FaEye />} className='download-btn' href={`/${job.file}`} target="_blank" />
            </div>
          </div>
        )) : <NoJobs />}
      </div>
    </Layout>
  );
};

export default JobsPage;
