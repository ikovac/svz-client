import React, { Component } from "react";
import { Link, graphql } from "gatsby";

import Container from "../../components/Container";
import PageTitle from "../../components/PageTitle";
import UslugeFilters from "../../components/UslugeFilters";

class RestoraniSalePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: this.props.data.allNodeRestoraniSale.edges,
    };
  }

  onFilterSubmit = filters => {
    const articles = this.props.data.allNodeRestoraniSale.edges;
    const { datum, lokacija, kapacitet } = filters;

    if(datum) {
      // Make API fetch...
    }

    const filteredArticles = articles.filter(
      ({ node }) =>
        (kapacitet ? node.field_kapacitet >= kapacitet : true) &&
        ((lokacija && lokacija.length)
          ? node.relationships.field_content_main_info.relationships
              .field_lokacija.name === lokacija
          : true)
    );
    this.setState({ articles: filteredArticles });
  };

  render() {
    return (
      <Container>
        <PageTitle>Restorani & Sale</PageTitle>
        <UslugeFilters
          filters={["datum", "lokacija", "kapacitet"]}
          onFilterSubmit={this.onFilterSubmit}
        />

        <div className="articles-section">
          <p>test</p>
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
