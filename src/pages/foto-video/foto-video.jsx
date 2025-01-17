import React, { Component } from "react";
import { graphql } from "gatsby";

import axios from "axios";

import PageTitle from "../../components/PageTitle";
import UslugeFilters from "../../components/UslugeFilters";
import ArticleTeaser from "../../components/ArticleTeaser";
import Breadcrumbs from "../../components/Breadcrumbs";
import SEO from "../../components/seo";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: this.props.data.allNodeFotoVideo.edges,
      loading: false,
    };
  }

  onFilterSubmit = async filters => {
    const articles = this.props.data.allNodeFotoVideo.edges;
    const { datum, lokacija } = filters;

    this.setState({ loading: true });

    let unavailable_nids;
    if (datum) {
      try {
        unavailable_nids = await axios.get(
          `${
            process.env.GATSBY_DRUPAL_URI
          }/api/rezervacije?_format=json&datum=${datum}`
        );
        unavailable_nids = unavailable_nids.data.map(
          rezervacija => rezervacija.field_artikl
        );
      } catch (err) {
        console.log(err);
        unavailable_nids = null;
      }
    }

    const filteredArticles = articles.filter(
      ({ node }) =>
        (unavailable_nids
          ? !unavailable_nids.includes(node.drupal_internal__nid.toString())
          : true) &&
        (lokacija && lokacija.length
          ? node.relationships.field_content_main_info.relationships.field_lokacija.name.toUpperCase() ===
              lokacija.toUpperCase() ||
            node.relationships.field_content_main_info.relationships.field_lokacija.relationships.field_okolna_mjesta.find(
              el => el.name.toUpperCase() === lokacija.toUpperCase()
            )
          : true)
    );
    this.setState({ articles: filteredArticles, loading: false });
  };

  render() {
    const { loading, articles } = this.state;
    const breadcrumbItems = [
      {
        label: "Foto & Video",
        link: "/foto-video",
      },
    ];
    return (
      <>
        <SEO title="Foto i video usluge" />
        <Breadcrumbs items={breadcrumbItems} current="Foto & Video" />
        <PageTitle>Foto & Video</PageTitle>
        <div className="usluge-all-container">
          <UslugeFilters
            filters={["datum", "lokacija"]}
            onFilterSubmit={this.onFilterSubmit}
          />

          <div className="articles-section">
            {!loading &&
              articles &&
              articles.map(({ node }) => (
                <ArticleTeaser key={node.drupal_internal__nid} article={node} />
              ))}
            {!loading && articles && !articles.length && (
              <p className="no-result-text">Nema rezultata pretrage.</p>
            )}
            {loading && <div className="loader" />}
          </div>
        </div>
      </>
    );
  }
}

export const query = graphql`
  {
    allNodeFotoVideo(filter: { status: { eq: true } }) {
      edges {
        node {
          title
          body {
            processed
          }
          path {
            alias
          }
          field_foto_usluge
          field_video_usluge
          drupal_internal__nid
          relationships {
            field_posebna_ponuda {
              field_posebna_ponuda
            }
            field_content_main_info {
              relationships {
                field_lokacija {
                  name
                  relationships {
                    field_okolna_mjesta {
                      name
                    }
                  }
                }
                field_galerija {
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 550, maxHeight: 310) {
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
    }
  }
`;
