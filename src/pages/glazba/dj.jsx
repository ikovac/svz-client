import React, { Component } from "react";
import { graphql } from "gatsby";

import axios from "axios";

import PageTitle from "../../components/PageTitle";
import UslugeFilters from "../../components/UslugeFilters";
import ArticleTeaser from "../../components/ArticleTeaser";
import Breadcrumbs from "../../components/Breadcrumbs";

class DJPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: this.props.data.allNodeGlazba.edges,
      loading: false,
    };
  }

  onFilterSubmit = async filters => {
    const articles = this.props.data.allNodeGlazba.edges;
    const { datum, lokacija, razglas } = filters;

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
        (razglas !== null ? node.field_razglas === Boolean(razglas) : true) &&
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
        label: "Glazba",
        link: "/glazba",
      },
    ];
    return (
      <>
        <Breadcrumbs items={breadcrumbItems} current="DJ" />
        <PageTitle>DJ</PageTitle>
        <div className="usluge-all-container">
          <UslugeFilters
            filters={["datum", "lokacija", "razglas"]}
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

export default DJPage;

export const query = graphql`
  {
    allNodeGlazba(
      filter: {
        relationships: { field_vrsta_glazbe: { name: { eq: "dj" } } }
        status: { eq: true }
      }
    ) {
      edges {
        node {
          title
          field_razglas
          field_broj_clanova
          body {
            processed
          }
          path {
            alias
          }
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
