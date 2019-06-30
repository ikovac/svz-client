import React from "react";
import { graphql, Link } from "gatsby";
import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import Image from "../components/Image";
import Masonry from "react-masonry-css";
import Breadcrumbs from "../components/Breadcrumbs";

export default ({ data }) => {
  const podKategorije = data.nodeKategorije.relationships.field_podkategorije;
  const breakpointColumnsObj = {
    default: 3,
    700: 2,
    500: 1,
  };
  return (
    <>
      <Breadcrumbs current={data.nodeKategorije.title} />
      <Container>
        <PageTitle>{data.nodeKategorije.title}</PageTitle>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="kategorije-wrapper"
          columnClassName="kategorije__column"
        >
          {podKategorije.map(podkategorija => (
            <div
              key={podkategorija.field_link_kategorije.title}
              className="kategorija__column-element card"
            >
              <div className="kategorija-element__title">
                {podkategorija.field_link_kategorije.title}
              </div>
              <Link
                to={podkategorija.field_link_kategorije.uri.replace(
                  "internal:",
                  data.nodeKategorije.path.alias
                )}
              >
                <Image
                  source={
                    podkategorija.relationships.field_slika.localFile
                      .childImageSharp.fluid
                  }
                  alt={podkategorija.field_link_kategorije.title}
                />
              </Link>
            </div>
          ))}
        </Masonry>
      </Container>
    </>
  );
};

export const query = graphql`
  query podKategorija($nid: Int!) {
    nodeKategorije(status: { eq: true }, drupal_internal__nid: { eq: $nid }) {
      title
      path {
        alias
      }
      relationships {
        field_podkategorije {
          field_link_kategorije {
            uri
            title
          }
          relationships {
            field_slika {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 600) {
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
