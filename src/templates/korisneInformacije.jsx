import React from "react";
import { graphql } from "gatsby";

import Container from "../components/Container";
import Image from "../components/Image";
import returnMonthYearFormat from "../utils/dateUtils";
import Breadcrumbs from "../components/Breadcrumbs";

import SEO from "../components/seo";

import escapeHtml from "../utils/escapeHtml";

export default ({ data }) => {
  const date = new Date(data.nodeKorisneInformacije.created);
  const breadcrumbItems = [
    {
      label: "Korisne Informacije",
      link: "/korisne-informacije/",
    },
  ];
  return (
    <>
      <SEO
        title={data.nodeKorisneInformacije.title}
        description={escapeHtml(data.nodeKorisneInformacije.body.processed)}
      />
      <Breadcrumbs
        items={breadcrumbItems}
        current={data.nodeKorisneInformacije.title}
      />
      <Container>
        <div className="korisne-informacije__page-wrapper">
          <Image
            source={
              data.nodeKorisneInformacije.relationships.field_image.localFile
                .childImageSharp.fluid
            }
          />
          <h4 className="korisne-informacije__title">
            {data.nodeKorisneInformacije.title}
          </h4>
          <p className="korisne-informacije__date">
            {returnMonthYearFormat(date)}
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: data.nodeKorisneInformacije.body.processed,
            }}
            className="korisne-informacije__body"
          />
        </div>
      </Container>
    </>
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
        processed
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
