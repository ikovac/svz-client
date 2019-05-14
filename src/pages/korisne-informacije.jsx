import React from "react";

import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import { graphql, Link } from "gatsby";
import Image from "../components/Image";

import getTextSummary from "../utils/trimHtmlText";

const KorisneInformacijePage = ({ data }) => {
  const posts = data.allNodeKorisneInformacije.edges;

  return (
    <Container>
      <PageTitle>Korisne informacije</PageTitle>
      <div className="posts-wrapper">
        {posts.map(({ node: post }) => (
          <div className="views-row" key={post.drupal_internal__nid}>
            <article className="row">
              <div className="group-left columns medium-4">
                <Link to={post.path.alias} title={post.title}>
                  <Image
                    source={
                      post.relationships.field_image.localFile.childImageSharp
                        .fluid
                    }
                  />
                </Link>
              </div>
              <div className="group-right columns medium-8">
                <Link to={post.path.alias} title={post.title}>
                  <h3>{post.title}</h3>
                </Link>
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
    allNodeKorisneInformacije(filter: { status: { eq: true } }) {
      edges {
        node {
          title
          drupal_internal__nid
          path {
            alias
          }

          body {
            value
          }
          relationships {
            field_image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 400) {
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
