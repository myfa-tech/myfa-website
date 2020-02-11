/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

import fabricSrc from '../images/fabric.png'

function SEO({ description, lang, meta, title, type, url, keywords, img }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const metaAuthor = site.siteMetadata.author

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
          content: img || fabricSrc,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:image`,
          content: img || fabricSrc,
        },
        {
          name: `twitter:site`,
          content: '@myfa_fr',
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
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
