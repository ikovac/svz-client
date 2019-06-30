import React from "react";

import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import Kategorije from "../components/Kategorije";
import { graphql } from "gatsby";
import Breadcrumbs from "../components/Breadcrumbs";

const KategorijePage = ({ data }) => {
  return (
    <>
      <Breadcrumbs current="Kategorije" />
      <Container>
        <PageTitle>Kategorije</PageTitle>
        <Kategorije kategorije={data.allNodeKategorije.edges} />
      </Container>
    </>
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
                  fluid(maxWidth: 450) {
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
