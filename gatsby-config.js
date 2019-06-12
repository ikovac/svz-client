require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Sve za Vjenčanje`,
    description: `Isplanirajte vaše vjenčanje jednostavno, u samo par koraka. Portal Sve za Vjenčanja sadrži oglašivače iz cijele Hrvatske`,
    author: `@vetus-itinera`,
    menuLinks: [
      { name: "Početna", path: "/" },
      { name: "Kategorije", path: "/kategorije/" },
      { name: "Korisne informacije", path: "/korisne-informacije/" },
      { name: "O nama", path: "/o-nama/" },
      { name: "Kontakt", path: "/kontakt/" },
    ],
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
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sve za Vjenčanje`,
        short_name: `SZV`,
        start_url: `/`,
        background_color: `#faeccf`,
        theme_color: `#006955`,
        display: `standalone`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: `${process.env.DRUPAL_URI}`,
        apiBase: `jsonapi`, // optional, defaults to `jsonapi`
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout/index.jsx`),
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
