import React from "react";
import { graphql } from "gatsby";

export default ({ data }) => {
  return (
    <>
      <h1>{data.nodeKorisneInformacije.title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: data.nodeKorisneInformacije.body.value,
        }}
      />
    </>
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
      relationships {
        field_image {
          uri {
            url
          }
        }
      }
    }
  }
`;
