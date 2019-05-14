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
  query nodeBasicPage($alias: String!) {
    nodePage(status: { eq: true }, path: { alias: { eq: $alias } }) {
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
