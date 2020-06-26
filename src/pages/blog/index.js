import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SEO from '../../components/seo';
import Layout from '../../components/layout';
import Card from '../../components/Card';

import { fetchArticles } from '../../services/contentful';

import './blog.scss';

const BlogPage = () => {
  const [articles, setArticles] = useState([]);

  const getAuthor = (authorId) => {
    const authors = {
      'florian': {
        name: 'Florian Adonis',
        title: 'CTO, MYFA',
      },
      'doris': {
        name: 'Doris Somon',
        title: 'CEO, MYFA',
      },
      'orlane': {
        name: 'Orlane Kouame',
        title: 'Community Manager Jr',
      },
      'alexandre': {
        name: 'Alexandre Meschberger',
        title: 'CFO, MYFA',
      },
      'manuella': {
        name: 'Manuella Sani',
        title: 'Responsable Opérations CI, MYFA',
      },
    };

    return authors[authorId.toLowerCase()];
  };

  const getDate = (createdAt) => {
    let date = new Date(createdAt);
    let months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"];
    let dateDay = date.getUTCDate();
    let dateMonth = months[date.getUTCMonth()];
    let dateYear = date.getUTCFullYear();

    let dateString = `${dateDay} ${dateMonth} ${dateYear}`;

    return dateString;
  };

  const goTo = (path) => {
    if (typeof window !== 'undefined') {
      window.location.assign(path);
    }
  };

  useEffect(() => {
    const asyncFunc = async () => {
      const articles = await fetchArticles();
      articles.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1);

      setArticles(articles);
    };

    asyncFunc();
  }, []);

  return (
    <Layout className='blog'>
      <SEO title='Blog' />

      <div id='blog'>
        <div className='title-container'>
          <h2>Blog</h2>
        </div>

        <Row>
          {articles.map(article => (
            <Col sm={6} lg={4}>
              <Card
                className='blog-article-card'
                onClick={() => goTo(`/articles/${article.path}`)}
                title={article.title}
                description={article.description}
                imgSrc={article.cover ? article.cover.fields.file.url : article.displayCover ? article.displayCover.fields.file.url : null}
                footerLeft={getAuthor(article.author).name}
                footerRight={getDate(article.createdAt)}
              />
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  );
};

export default BlogPage;
