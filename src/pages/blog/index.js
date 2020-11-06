import React, { useEffect, useState } from 'react';

import SEO from '../../components/seo';
import Layout from '../../components/Layout';
import Card from '../../components/Card';

import { fetchArticles } from '../../services/contentful';
import getFormattedDate from '../../utils/getFormattedDate';
import useTranslate from '../../hooks/useTranslate';

import './blog.scss';

const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const [t] = useTranslate();

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
      'chris': {
        name: 'Chris Nkombo',
        title: 'Stagiaire logistique',
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
    <Layout className='blog' color='mix'>
      <SEO title='Blog' />

      <div id='blog'>
        <div className='title-container'>
          <h2>Blog</h2>
          <h3>A tour de rôle, nous prenons la plume pour vous faire part des nouveautés concernant la diaspora africaine ou encore le service MYFA.</h3>
        </div>

        <div className='blog-cards-container'>
          {articles.map(article => (
            <Card
              className='blog-article-card'
              onClick={() => goTo(`/articles/${article.path}`)}
              title={article.title}
              description={article.description}
              imgSrc={article.cover ? article.cover.fields.file.url : article.displayCover ? article.displayCover.fields.file.url : null}
              footerLeft={getAuthor(article.author).name}
              footerRight={getFormattedDate(article.createdAt)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
