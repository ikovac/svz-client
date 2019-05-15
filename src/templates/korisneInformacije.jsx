import React from "react";
import { graphql } from "gatsby";

import Container from "../components/Container";
import PageTitle from "../components/PageTitle";

export default ({ data }) => {
  return (
    <Container>
      <PageTitle>{data.nodeKorisneInformacije.title}</PageTitle>
      <div
        dangerouslySetInnerHTML={{
          __html: data.nodeKorisneInformacije.body.value,
        }}
      />
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
    }
  }
`;
