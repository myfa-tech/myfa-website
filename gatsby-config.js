module.exports = {
  siteMetadata: {
    title: `Myfa`,
    description: `Dites au revoir à cette frustration de ne pas pouvoir aider concrètement un de vos proches à cause de la distance. Avec Myfa, vous pouvez composer un panier de biens alimentaires, à destination de vos proches en Afrique !`,
    author: `Myfa`,
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
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Josefin Sans`,
            variants: [`300`, `400`, `600`, `700`]
          },
        ],
      },
    },
    `gatsby-plugin-sass`,
  ],
}
