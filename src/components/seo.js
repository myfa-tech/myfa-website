
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import uuid from 'uuid/v4';

function SEO({ description, lang, meta, title, type, url, keywords, img }) {
  const site = {
    title: `MYFA`,
    siteUrl: `https://www.myfa.fr`,
    description: `Le tiers de confiance de la diaspora Ivoirienne. MYFA réalise des prestations dédiées et vous permet de gérer vos dépenses vers le pays, pour vous ou vos proches.`,
    author: `MYFA SAS`,
  };

  const metaDescription = description || site.description;
  const metaAuthor = site.author;

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
          content: img || 'https://www.myfa.fr/social-sharing-img.jpg',
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:image`,
          content: img || 'https://www.myfa.fr/social-sharing-img.jpg',
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
