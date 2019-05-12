/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path");

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const korisneInformacijeTemplate = path.resolve(
    "src/templates/korisneInformacije.jsx"
  );

  const edges = `
    edges {
      node {
        drupal_internal__nid
        path {
          alias
        }
        status
      }
    }
  `;
  
  const korisneInformacijePages = graphql(`
    query nodesQuery {
      allNodeKorisneInformacije(filter: { status: { eq: true } }) {
        ${edges}
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allNodeKorisneInformacije.edges.forEach(({ node }) => {
      createPage({
        path: node.path.alias,
        component: korisneInformacijeTemplate,
        context: {
          alias: node.path.alias,
        },
      });
    });
  });

  return Promise.all([korisneInformacijePages]);
};
