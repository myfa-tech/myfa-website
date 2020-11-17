import React from 'react';
import { FaLinkedinIn, FaTwitter } from 'react-icons/fa';

import SEO from '../../components/seo';
import Layout from '../../components/Layout';

import dorisSrc from '../../images/doris-team.jpeg';
import florianSrc from '../../images/florian-team.jpeg';
import alexSrc from '../../images/alex-team.jpeg';

import './team.scss';

const TeamPage = () => {
  return (
    <Layout className='team' color='green'>
      <SEO title="L'équipe" />

      <div className='title-container'>
        <h2>L'équipe</h2>
        <h3>Nous sommes trois têtes pensantes sur le service MYFA. Ensemble, nous coordonnons une équipe opérationnelle à Abidjan pour le bon déroulement des prestations.</h3>
      </div>
      <div className='content-container'>
        <div className='article-block'>
          <div className='author-id'>
            <img src={dorisSrc} className='profile-pic' alt='doris' />

            <h4>Doris Somon | CEO, MYFA</h4>

            <p className='member-description'>
              MYFA est un service adapté à la diaspora, nous voulons faire évoluer nos services en fonction de vos demandes.
            </p>

            <div className='social-links'>
              <a href='https://www.linkedin.com/in/doris-somon/' target="_blank"><FaLinkedinIn /></a>
              <a href='https://twitter.com/DorisSomon' target="_blank"><FaTwitter /></a>
            </div>
          </div>
        </div>
        <div className='article-block'>
          <div className='author-id'>
            <img src={florianSrc} className='profile-pic' alt='florian' />

            <h4>Florian Adonis | CTO, MYFA</h4>

            <p className='member-description'>
              Notre ambition est d'apporter une vraie bonne solution aux problèmes causés par la distance. Nous rapprochons les familles.
            </p>

            <div className='social-links'>
              <a href='https://www.linkedin.com/in/florianadonis' target="_blank"><FaLinkedinIn /></a>
              <a href='https://twitter.com/florian_adonis' target="_blank"><FaTwitter /></a>
            </div>
          </div>
        </div>
        <div className='article-block'>
          <div className='author-id'>
            <img src={alexSrc} className='profile-pic' alt='alex' />

            <h4>Alexandre Meschberger | CFO, MYFA</h4>

            <p className='member-description'>
              Nous vous proposons une expérience nouvelle pour ravir vos proches et entretenir la confiance malgré la distance !
            </p>

            <div className='social-links'>
              <a href='https://www.linkedin.com/in/alexandre-meschberger-97891012a/' target="_blank"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TeamPage;
