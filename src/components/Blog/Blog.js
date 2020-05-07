import React, { useEffect, useState  } from 'react';
import Slider from 'react-slick';
import { FaQuoteLeft } from 'react-icons/fa';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';

import useTranslate from '../../hooks/useTranslate';

import florianSrc from '../../images/florian.png';
import dorisSrc from '../../images/doris.png';
import manuellaSrc from '../../images/manuella.png';
import alexandreSrc from '../../images/alex.png';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Blog.scss';
import { fetchArticles } from '../../services/contentful';

const Blog = () => {
  const [t] = useTranslate();
  const [articles, setArticles] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    initialSlide: 0,
    nextArrow: <IoMdArrowDropright />,
    prevArrow: <IoMdArrowDropleft />,
  };

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

    return authors[authorId];
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

      <Slider {...settings} className='custom-slider'>
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
      </Slider>
    </section>
  );
};

export default Blog;
