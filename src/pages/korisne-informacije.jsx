import React from "react";

import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import { graphql } from "gatsby";
import Image from "../components/Image";

import getTextSummary from "../utils/trimHtmlText";

const KorisneInformacijePage = ({ data }) => {
  const posts = data.allNodeKorisneInformacije.edges;

  return (
    <Container>
      <PageTitle>Korisne informacije</PageTitle>
      <div className="posts-wrapper">
        {posts.map(({ node: post }) => (
          <div>
            <h3>{post.title}</h3>
            {getTextSummary(post.body.value)}
            <Image
              source={
                post.relationships.field_image.localFile.childImageSharp.fluid
              }
            />
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
