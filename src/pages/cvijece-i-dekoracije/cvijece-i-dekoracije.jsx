import React, { Component } from "react";
import { graphql } from "gatsby";

import PageTitle from "../../components/PageTitle";
import UslugeFilters from "../../components/UslugeFilters";
import ArticleTeaser from "../../components/ArticleTeaser";
import Breadcrumbs from "../../components/Breadcrumbs";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: this.props.data.allNodeCvijeceIDekoracije.edges,
      loading: false,
    };
  }

  onFilterSubmit = async filters => {
    const articles = this.props.data.allNodeCvijeceIDekoracije.edges;
    const { lokacija } = filters;

    this.setState({ loading: true });

    const filteredArticles = articles.filter(({ node }) =>
      lokacija && lokacija.length
        ? node.relationships.field_content_main_info.relationships.field_lokacija.name.toUpperCase() ===
            lokacija.toUpperCase() ||
          node.relationships.field_content_main_info.relationships.field_lokacija.relationships.field_okolna_mjesta.find(
            el => el.name.toUpperCase() === lokacija.toUpperCase()
          )
        : true
    );
    this.setState({ articles: filteredArticles, loading: false });
  };

  render() {
    const { loading, articles } = this.state;
    const breadcrumbItems = [
      {
        label: "Cvijeće i dekoracije",
        link: "/cvijece-i-dekoracije",
      },
    ];
    return (
      <>
        <Breadcrumbs items={breadcrumbItems} current="Cvijeće i dekoracije" />
        <PageTitle>Cvijeće i dekoracije</PageTitle>
        <div className="usluge-all-container">
          <UslugeFilters
            filters={["lokacija"]}
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
    allNodeCvijeceIDekoracije(filter: { status: { eq: true } }) {
      edges {
        node {
          title
          drupal_internal__nid
          path {
            alias
          }
          body {
            processed
          }
          field_adresa
          field_radno_vrijeme
          relationships {
            field_lokacija_na_mapi {
              field_latitude
              field_longitude
            }
            field_paketi {
              field_paket {
                processed
              }
            }
            field_drustvene_mreze {
              field_web {
                uri
              }
              field_facebook {
                uri
              }
              field_instagram {
                uri
              }
              field_youtube {
                uri
              }
            }
            field_posebna_ponuda {
              field_posebna_ponuda
              field_posebna_ponuda_opis
            }
            field_content_main_info {
              field_kontakt
              field_email
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
