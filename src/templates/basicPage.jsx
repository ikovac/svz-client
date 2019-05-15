import React from "react";
import { graphql } from "gatsby";

import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import PartneriBlock from "../components/Blocks/Partneri";

export default ({ data }) => {
  return (
    <Container>
      <PageTitle>{data.nodePage.title}</PageTitle>
      <div
        dangerouslySetInnerHTML={{
          __html: data.nodePage.body.value,
        }}
      />
      {data.nodePage.path.alias === "/o-nama" ? <PartneriBlock /> : ""}
    </Container>
  );
};

export const query = graphql`
  query nodeBasicPage($nid: Int!) {
    nodePage(status: { eq: true }, drupal_internal__nid: { eq: $nid }) {
      title
      body {
        value
      }
      path {
        alias
      }
    }
  }
`;
