import React, { Component } from "react";
import { Link, graphql } from "gatsby";

// import { exists, window } from "browser-monads";
import axios from "axios";

import Container from "../../components/Container";
import PageTitle from "../../components/PageTitle";
import UslugeFilters from "../../components/UslugeFilters";
import ArticleTeaser from "../../components/ArticleTeaser";

class RestoraniSalePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: this.props.data.allNodeRestoraniSale.edges,
    };
  }

  onFilterSubmit = async filters => {
    const articles = this.props.data.allNodeRestoraniSale.edges;
    const { datum, lokacija, kapacitet } = filters;

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
          ? node.relationships.field_content_main_info.relationships
              .field_lokacija.name === lokacija
          : true)
    );
    this.setState({ articles: filteredArticles });
  };

  render() {
    const { articles } = this.state;
    return (
      <Container>
        <PageTitle>Restorani & Sale</PageTitle>
        <UslugeFilters
          filters={["datum", "lokacija", "kapacitet"]}
          onFilterSubmit={this.onFilterSubmit}
        />

        <div className="articles-section">
          {articles &&
            articles.map(({ node }) => (
              <ArticleTeaser key={node.drupal_internal__nid} article={node} />
            ))}
        </div>
      </Container>
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
                      fluid {
                        src
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
