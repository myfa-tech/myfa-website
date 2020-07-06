import React, { useEffect, useState } from 'react';
import { Router } from '@reach/router';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton
} from 'react-share';
import SEO from '../../components/seo';
import Layout from '../../components/layout';

import { fetchSingleArticle } from '../../services/contentful';

import './articles.scss';

import florianSrc from '../../images/florian.png';
import dorisSrc from '../../images/doris.png';
import manuellaSrc from '../../images/manuella.png';
import alexandreSrc from '../../images/alex.png';
import orlaneSrc from '../../images/orlane.png';
import getFormattedDate from '../../utils/getFormattedDate';

const Article = (props) => {
  const [article, setArticle] = useState({});

  useEffect(() => {
    const asyncFunc = async () => {
      if (typeof window !== 'undefined') {
        const articleId = window.location.pathname;
        const fetchedArticle = await fetchSingleArticle(articleId);

        setArticle(fetchedArticle);
      }
    };

    asyncFunc();
  }, []);

  return (
    <Router basepath='/articles'>
      {article.author && <ArticleDisplay path="/:id" article={article} />}
    </Router>
  );
};

const ArticleDisplay = (props) => {
  const [author, setAuthor] = useState({});

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

  const contentfulRenderingOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => `<div class='row'>
        <div class='col-md-3 left-small-img-container'>
          <img class='left-small-img' src='${node.data.target.fields.file.url}' />
        </div>
        <div class='col-md-9'>
          <p>${node.data.target.fields.description.replace('\n', '</p><p>')}</p>
        </div>
      </div>`
    },
  };

  const getComplementaryKeywords = () => {
    let keywords = '';

    if (props.article.keyword1) {
      keywords += `, ${props.article.keyword1}`;
    }

    if (props.article.keyword2) {
      keywords += `, ${props.article.keyword2}`;
    }

    if (props.article.keyword3) {
      keywords += `, ${props.article.keyword3}`;
    }

    return keywords;
  };

  const getHashtags = () => {
    const hashtags = [];

    if (props.article.keyword1) {
      hashtags.push(props.article.keyword1);
    }

    if (props.article.keyword2) {
      hashtags.push(props.article.keyword2);
    }

    if (props.article.keyword3) {
      hashtags.push(props.article.keyword3);
    }

    return hashtags;
  };

  useEffect(() => {
    setAuthor(getAuthor(props.article.author));
  }, [props.article]);

  return (
    <Layout>
      <SEO
        title={props.article.title}
        description={props.article.description}
        type='article'
        url={`https://www.myfa.fr/articles/${props.article.path}`}
        keywords={`panier, courses, diaspora, click, collect, cote, ivoire, cameroun, blog, article, confinement, startup${getComplementaryKeywords()}`}
      />
      <Container className='article-container'>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h1>{props.article.title}</h1>

            <div className='author'>
              <img src={author.img} alt={props.article.author} />
              <div>
                <span>{author.name}</span>
                <span className='date'>{getFormattedDate(props.article.createdAt)}</span>
              </div>
            </div>

            {props.article.cover ? <p>
              <img
                className='cover'
                alt={props.article.cover.fields.title}
                src={props.article.cover.fields.file.url}
              />
            </p> : null}

            <div dangerouslySetInnerHTML={{__html: documentToHtmlString(props.article.body, contentfulRenderingOptions)}} />

            <div>
              <div className='sharing-title'>Partagez</div>
              <FacebookShareButton url={props.location.href} className='sharing-buttons'>
                <FacebookIcon size={32} round={false} borderRadius={6} />
              </FacebookShareButton>
              <TwitterShareButton
                url={props.location.href}
                title={props.article.title}
                via='myfa_fr'
                hashtags={getHashtags()}
                className='sharing-buttons'
              >
                <TwitterIcon size={32} round={false} borderRadius={6} />
              </TwitterShareButton>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Article;
