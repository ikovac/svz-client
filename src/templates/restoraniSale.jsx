import React from "react";
import { graphql } from "gatsby";
import Container from "../components/Container";
import PageTitle from "../components/PageTitle";

export default ({ data }) => {
  const { nodeRestoraniSale } = data;
  return (
    <Container>
      <div className="usluge-wrapper">
        <PageTitle>{nodeRestoraniSale.title}</PageTitle>
        <div
          className="field--opis"
          dangerouslySetInnerHTML={{ __html: nodeRestoraniSale.body.processed }}
        />
      </div>
    </Container>
  );
};

export const query = graphql`
  query restoraniSale($nid: Int!) {
    nodeRestoraniSale(
      status: { eq: true }
      drupal_internal__nid: { eq: $nid }
    ) {
      title
      path {
        alias
      }
      body {
        processed
      }
      relationships {
        field_content_main_info {
          field_kontakt
          field_email
          relationships {
            field_lokacija {
              name
            }
            field_galerija {
              localFile {
                childImageSharp {
                  fluid {
                    src
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
