import React from "react";
import { StaticQuery, graphql } from "gatsby";

const PartneriBlock = () => (
  <StaticQuery
    query={graphql`
      query Partneri {
        allNodePartneri(filter: { status: { eq: true } }) {
          edges {
            node {
              title
              field_web_adresa_partnera {
                uri
              }
              relationships {
                field_image {
                  localFile {
                    relativePath
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      console.log("DATA: ", data);
      return <p>Test</p>;
    }}
  />
);

export default PartneriBlock;
