import React from "react";
import { graphql } from "gatsby";

import Container from '../components/Container';
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
  query nodeKorisneInformacije($alias: String!) {
    nodeKorisneInformacije(
      status: { eq: true }
      path: { alias: { eq: $alias } }
    ) {
      title
      body {
        value
      }
    }
  }
`;
