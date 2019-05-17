import React from "react";
import { StaticQuery, graphql } from "gatsby";
import PartnerElement from "./PartnerElement";
import Masonry from "react-masonry-css";

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
                        ...GatsbyImageSharpFluid_tracedSVG
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
          <h3 className="partneri-block__title">Partneri</h3>
          <Masonry
            className="partner-block__partner-element-wrapper"
            columnClassName="partner-element__column"
            breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
          >
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
          </Masonry>
        </div>
      );
    }}
  />
);

export default PartneriBlock;
