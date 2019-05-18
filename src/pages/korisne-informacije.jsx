import React from "react";

import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import { graphql, Link } from "gatsby";
import Image from "../components/Image";
import returnMonthYearFormat from "../utils/dateUtils";

import getTextSummary from "../utils/trimHtmlText";

const KorisneInformacijePage = ({ data }) => {
  const posts = data.allNodeKorisneInformacije.edges;

  return (
    <Container>
      <PageTitle>Korisne informacije</PageTitle>
      <div className="posts-wrapper row">
        {posts.map(({ node: post }) => (
          <div
            className="views-row columns medium-6"
            key={post.drupal_internal__nid}
          >
            <article className="card">
              <Link to={post.path.alias} title={post.title}>
                <Image
                  source={
                    post.relationships.field_image.localFile.childImageSharp
                      .fluid
                  }
                  alt={post.title}
                />
              </Link>
              <div className="card-divider">
                <Link to={post.path.alias} title={post.title}>
                  <h3>{post.title}</h3>
                </Link>
                <p>{returnMonthYearFormat(new Date(post.created))}</p>
              </div>
              <div className="card-section">
                {getTextSummary(post.body.value)}
              </div>
            </article>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default KorisneInformacijePage;

export const query = graphql`
  query KorisneInformacijePage {
    allNodeKorisneInformacije(
      filter: { status: { eq: true } }
      sort: { fields: created, order: DESC }
    ) {
      edges {
        node {
          title
          drupal_internal__nid
          path {
            alias
          }
          created
          body {
            value
          }
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
`;
