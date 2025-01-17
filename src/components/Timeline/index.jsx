import React from "react";
import TimelineCard from "./TimelineCard";
import { StaticQuery, graphql } from "gatsby";

import { VerticalTimeline } from "react-vertical-timeline-component";
import PageTitle from "../PageTitle";
import Container from "../Container";

const Timeline = () => (
  <StaticQuery
    query={graphql`
      query koraciQuery {
        allNodeKoraci(
          filter: { status: { eq: true } }
          sort: { fields: field_korak_no, order: ASC }
        ) {
          edges {
            node {
              title
              field_korak_no
              body {
                value
              }
              drupal_internal__nid
              relationships {
                field_image {
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 500) {
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
      return (
        <div className="timeline-wrapper">
          <Container>
            <PageTitle>Dobrodošli na svezavjencanje.hr</PageTitle>
            <p className="timeline__description">
              U samo par koraka, potpuno besplatno, organizirajte Vaš dan iz
              snova.
            </p>
          </Container>
          <VerticalTimeline animate={false}>
            {data.allNodeKoraci.edges.map(({ node }) => {
              const {
                drupal_internal__nid,
                title,
                field_korak_no,
                relationships,
                body,
              } = node;
              const imgSource = relationships.field_image
                ? relationships.field_image.localFile.childImageSharp.fluid
                : null;
              return (
                <TimelineCard
                  key={drupal_internal__nid}
                  step={field_korak_no}
                  title={title}
                  text={body.value}
                  imgSource={imgSource}
                />
              );
            })}
          </VerticalTimeline>
        </div>
      );
    }}
  />
);

export default Timeline;
