import React from "react";

import Container from "../components/Container";
import { graphql } from "gatsby";

import Masonry from "react-masonry-css";
// https://www.npmjs.com/package/react-masonry-css

const KategorijePage = ({ data }) => {
  return (
    <Container>
      {data.allNodeKategorije.edges.map(({ node }) => (
        <p key={node.drupal_internal__nid}>{node.title}</p>
      ))}
    </Container>
  );
};

export default KategorijePage;

export const query = graphql`
  query KategorijePageQuery {
    allNodeKategorije(filter: { status: { eq: true } }) {
      edges {
        node {
          title
          drupal_internal__nid
          path {
            alias
          }
          relationships {
            field_image {
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            field_podkategorije {
              field_link_kategorije {
                uri
                title
              }
            }
          }
        }
      }
    }
  }
`;
