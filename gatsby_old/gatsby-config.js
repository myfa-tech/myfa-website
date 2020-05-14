module.exports = {
  siteMetadata: {
    title: `MYFA`,
    siteUrl: `https://www.myfa.fr`,
    description: `MYFA vous permet de composer un panier de biens alimentaires, à destination de vos proches en Côte d'Ivoire !`,
    author: `MYFA SAS`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        // language JSON resource path
        path: `${__dirname}/src/intl`,
        // supported language
        languages: ['fr', 'en'],
        // language file path
        defaultLanguage: 'fr'
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo-1.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Josefin sans\:300,400,500,600,700`,
          `source sans pro\:300,400,400i,700`
        ],
        display: 'swap'
      }
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.myfa.fr',
        sitemap: 'https://www.myfa.fr/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    `gatsby-plugin-sass`,
  ],
}
