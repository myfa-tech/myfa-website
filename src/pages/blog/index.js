import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SEO from '../../components/seo';
import Layout from '../../components/layout';
import Card from '../../components/Card';

import useTranslate from '../../hooks/useTranslate';

import './blog.scss';

const BlogPage = () => {
  const [t] = useTranslate();

  const articles = [
    { title: 'testTitle', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.', author: 'Florian Adonis', date: '21 Nov 2019' },
  ];

  return (
    <Layout noBackgroundColor={true} className='blog'>
      <SEO title='Blog' />

      <div id='blog'>
        <div className='title-container'>
          <h2>{t('blog.title')} </h2>
        </div>

        <Row>
          {articles.map(article => (
            <Col sm={4}>
              <Card
                title={article.title}
                description={article.description}
                footerLeft={article.author}
                footerRight={article.date}
              />
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  );
};

export default BlogPage;
