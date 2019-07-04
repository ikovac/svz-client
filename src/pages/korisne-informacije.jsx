import React from "react";

import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import { graphql, Link } from "gatsby";
import Image from "../components/Image";
import returnMonthYearFormat from "../utils/dateUtils";

import getTextSummary from "../utils/trimHtmlText";
import Breadcrumbs from "../components/Breadcrumbs";
import SEO from "../components/seo";

const KorisneInformacijePage = ({ data }) => {
  const posts = data.allNodeKorisneInformacije.edges;

  return (
    <>
      <SEO
        title="Korisne informacije"
        description="Korisne informacije, trendovi, savjeti stručnjaka, razne ideje kao i iskustva klijenata. Pronađite odgovore na sva Vaša pitanja za savršeno vjenčanje na jednom mjestu."
      />
      <Breadcrumbs current="Korisne informacije" />
      <Container>
        <PageTitle>Korisne informacije</PageTitle>
        <div className="posts-wrapper">
          {posts.map(({ node: post }) => (
            <div className="views-row" key={post.drupal_internal__nid}>
              <article className="row">
                <div className="columns medium-4 group-left">
                  <Link to={post.path.alias} title={post.title}>
                    <Image
                      source={
                        post.relationships.field_image.localFile.childImageSharp
                          .fluid
                      }
                      alt={post.title}
                    />
                  </Link>
                </div>
                <div className="columns medium-8 right-section">
                  <div className="right-section__group-header">
                    <div className="group-header__title">
                      <Link to={post.path.alias} title={post.title}>
                        <h3>{post.title}</h3>
                      </Link>
                    </div>
                  </div>
                  <div className="right-section__group-body">
                    <p className="group-body__date">
                      {returnMonthYearFormat(new Date(post.created))}
                    </p>
                    <div
                      className="group-body__text"
                      dangerouslySetInnerHTML={{
                        __html: getTextSummary(post.body.processed, 200),
                      }}
                    />
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </Container>
    </>
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
            processed
          }
          relationships {
            field_image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 550) {
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
