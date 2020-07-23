
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import uuid from 'uuid/v4';

import useTranslate from '../hooks/useTranslate';

import socialSharingImgSrc from '../images/social-sharing-img.jpg';

function SEO({ description, lang, meta, title, type, url, keywords, img }) {
  const [t] = useTranslate();
  const [uniqueId, setUniqueId] = useState('');
  const site = {
    title: `MYFA`,
    siteUrl: `https://www.myfa.fr`,
    description: `MYFA vous permet de composer un panier de biens alimentaires, à destination de vos proches en Côte d'Ivoire !`,
    author: `MYFA SAS`,
  };

  const metaDescription = description || t('site_seo.description');
  const metaAuthor = site.author;

  useEffect(() => {
    const id = uuid().substr(0, 8);
    setUniqueId(id);
  }, []);

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `keywords`,
          content: keywords,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: type || `website`,
        },
        {
          property: `og:url`,
          content: url || 'https://www.myfa.fr',
        },
        {
          property: `og:site_name`,
          content: 'MYFA',
        },
        {
          property: `og:image`,
          content: img || socialSharingImgSrc,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:image`,
          content: img || `https://www.myfa.fr/${socialSharingImgSrc}`,
        },
        {
          name: `twitter:site`,
          content: '@myfa_fr',
        },
        {
          name: `twitter:creator`,
          content: site.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `author`,
          content: metaAuthor,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  keywords: PropTypes.string,
  type: PropTypes.string,
  url: PropTypes.string,
  img: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
