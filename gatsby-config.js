require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Sve za Vjenčanje`,
    description: `Portal za potpuno besplatno organiziranje kompletnog vjenčanja u cijeloj Hrvatskoj. U samo par klikova odaberite i rezervirajte sve potrebno za Vaše vjenčanje iz snova.`,
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
        theme_color: `#faeccf`,
        display: `standalone`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: `${process.env.GATSBY_DRUPAL_URI}`,
        apiBase: `jsonapi`, // optional, defaults to `jsonapi`
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout/index.jsx`),
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-143259273-1",
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
