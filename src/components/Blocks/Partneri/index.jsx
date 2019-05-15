import React from "react";
import { StaticQuery, graphql } from "gatsby";
import PartnerElement from "./PartnerElement";

const PartneriBlock = () => (
  <StaticQuery
    query={graphql`
      query Partneri {
        allNodePartneri(filter: { status: { eq: true } }) {
          edges {
            node {
              drupal_internal__nid
              title
              field_web_adresa_partnera {
                uri
              }
              relationships {
                field_image {
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 250) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const { edges: partneri } = data.allNodePartneri;
      return (
        <div className="partneri-block">
          <h3>Partneri</h3>
          <div className="partner-block__partner-element-wrapper">
            {partneri.map(({ node }) => (
              <PartnerElement
                key={node.drupal_internal__nid}
                imageSrc={
                  node.relationships.field_image.localFile.childImageSharp.fluid
                }
                title={node.title}
                link={node.field_web_adresa_partnera.uri}
              />
            ))}
          </div>
        </div>
      );
    }}
  />
);

export default PartneriBlock;
