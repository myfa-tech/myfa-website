import React, { useEffect, useState  } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';

import useTranslate from '../../../hooks/useTranslate';
import { fetchArticles } from '../../../services/contentful';

import florianSrc from '../../../images/florian.png';
import dorisSrc from '../../../images/doris.png';
import manuellaSrc from '../../../images/manuella.png';
import alexandreSrc from '../../../images/alex.png';
import orlaneSrc from '../../../images/orlane.png';

import './Blog.scss';

const Blog = () => {
  const [t] = useTranslate();
  const [articles, setArticles] = useState([]);

  const getAuthor = (authorId) => {
    const authors = {
      'florian': {
        name: 'Florian Adonis',
        title: 'CTO, MYFA',
        img: florianSrc,
      },
      'doris': {
        name: 'Doris Somon',
        title: 'CEO, MYFA',
        img: dorisSrc,
      },
      'orlane': {
        name: 'Orlane Kouame',
        title: 'Community Manager Jr',
        img: orlaneSrc,
      },
      'alexandre': {
        name: 'Alexandre Meschberger',
        title: 'CFO, MYFA',
        img: alexandreSrc,
      },
      'manuella': {
        name: 'Manuella Sani',
        title: 'Responsable Opérations CI, MYFA',
        img: manuellaSrc,
      },
    };

    return authors[authorId.toLowerCase()];
  };

  useEffect(() => {
    const asyncFunc = async () => {
      const articles = await fetchArticles();
      setArticles(articles);
    };

    asyncFunc();
  }, []);

  return (
    <section id='blog'>
      <div className='heading'>
        <h2>{t('home_page.blog.title')} 📰</h2>
      </div>

      <Carousel centerMode centerSlidePercentage={100} className='custom-slider'>
        {articles.map((article) => {
          const author = getAuthor(article.author);

          return (
            <div key={article.path}>
              <div className='article-block'>
                <FaQuoteLeft size='2em' className='quote-icon' />
                <p className='article-title'>
                  {article.title}
                </p>
                <a href={`/articles/${article.path}`} className='btn-blog'>{t('home_page.blog.read_more_button')}</a>
                <div className='author-id'>
                  <img src={author.img} className='profile-pic' alt={article.author} />
                  <h4>{author.name}</h4>
                  <span>{author.title}</span>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </section>
  );
};

export default Blog;
