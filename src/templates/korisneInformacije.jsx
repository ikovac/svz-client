import React from "react";
import { graphql } from "gatsby";

import Container from "../components/Container";
import Image from "../components/Image";
import returnMonthYearFormat from "../utils/dateUtils";

export default ({ data }) => {
  const date = new Date(data.nodeKorisneInformacije.created);
  return (
    <Container>
      <div className="korisne-informacije__page-wrapper">
        <Image
          source={
            data.nodeKorisneInformacije.relationships.field_image.localFile
              .childImageSharp.fluid
          }
        />
        <h4 className="korisne-informacije__title">{data.nodeKorisneInformacije.title}</h4>
        <p className="korisne-informacije__date">{returnMonthYearFormat(date)}</p>
        <div
          dangerouslySetInnerHTML={{
            __html: data.nodeKorisneInformacije.body.value,
          }}
          className="korisne-informacije__body"
        />
      </div>
    </Container>
  );
};

export const query = graphql`
  query nodeKorisneInformacije($nid: Int!) {
    nodeKorisneInformacije(
      status: { eq: true }
      drupal_internal__nid: { eq: $nid }
    ) {
      title
      body {
        value
      }
      created
      relationships {
        field_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
