import React, { Component } from "react";
import { graphql } from "gatsby";

import axios from "axios";

import PageTitle from "../../components/PageTitle";
import UslugeFilters from "../../components/UslugeFilters";
import ArticleTeaser from "../../components/ArticleTeaser";

import shuffle from "../../utils/shuffleArray";

class RestoraniSalePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: shuffle(this.props.data.allNodeRestoraniSale.edges),
      loading: false,
    };
  }

  onFilterSubmit = async filters => {
    const articles = this.props.data.allNodeRestoraniSale.edges;
    const { datum, lokacija, kapacitet } = filters;

    this.setState({ loading: true });

    let unavailable_nids;
    if (datum) {
      unavailable_nids = await axios.get(
        `${process.env.DRUPAL_URI}/api/rezervacije?_format=json&datum=${datum}`
      );
      unavailable_nids = unavailable_nids.data.map(
        rezervacija => rezervacija.field_artikl
      );
    }

    const filteredArticles = articles.filter(
      ({ node }) =>
        (unavailable_nids
          ? !unavailable_nids.includes(node.drupal_internal__nid.toString())
          : true) &&
        (kapacitet ? node.field_kapacitet >= kapacitet : true) &&
        (lokacija && lokacija.length
          ? node.relationships.field_content_main_info.relationships.field_lokacija.name.toUpperCase() ===
              lokacija.toUpperCase() ||
            node.relationships.field_content_main_info.relationships.field_lokacija.relationships.field_okolna_mjesta.find(
              el => el.name.toUpperCase() === lokacija.toUpperCase()
            )
          : true)
    );
    this.setState({ articles: shuffle(filteredArticles), loading: false });
  };

  render() {
    const { loading, articles } = this.state;
    return (
      <>
        <PageTitle>Restorani & Sale</PageTitle>
        <div className="usluge-all-container">
          <UslugeFilters
            filters={["datum", "lokacija", "kapacitet"]}
            onFilterSubmit={this.onFilterSubmit}
          />

          <div className="articles-section">
            {!loading &&
              articles &&
              articles.map(({ node }) => (
                <ArticleTeaser key={node.drupal_internal__nid} article={node} />
              ))}
            {loading && <div className="loader" />}
          </div>
        </div>
      </>
    );
  }
}

export default RestoraniSalePage;

export const query = graphql`
  query allRestoraniSale {
    allNodeRestoraniSale(filter: { status: { eq: true } }) {
      edges {
        node {
          title
          drupal_internal__nid
          field_parking
          path {
            alias
          }
          body {
            processed
          }
          field_kapacitet
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
