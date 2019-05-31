import React, { Component } from "react";
import LokacijaInput from "./LokacijaInput";
import { StaticQuery, graphql } from "gatsby";

class UslugeFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datum: null,
      lokacija: null,
      kapacitet: null,
      razglas: null,
    };
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLokacijaChange = name => {
    this.setState({ lokacija: name });
  }

  render() {
    const { filters } = this.props;
    console.log("State: ", this.state);

    return (
      <StaticQuery
        query={graphql`
          {
            allTaxonomyTermLokacija {
              edges {
                node {
                  name
                  relationships {
                    field_okolna_mjesta {
                      name
                    }
                  }
                }
              }
            }
          }
        `}
        render={lokacijaTerms => (
          <div className="filters-container">
            <h4>Filtriraj rezultate</h4>
            <form>
              {filters.includes("datum") && (
                <div className="filters__field--datum">
                  <label htmlFor="filter--datum">Datum</label>
                  <input
                    type="date"
                    name="datum"
                    id="filter--datum"
                    placeholder="Odaberite datum"
                    onChange={this.handleInputChange}
                  />
                </div>
              )}
              {filters.includes("lokacija") && (
                <LokacijaInput
                  handleInputChange={this.handleLokacijaChange}
                  lokacije={lokacijaTerms.allTaxonomyTermLokacija.edges}
                />
              )}
              {filters.includes("kapacitet") && (
                <div className="filters__field--kapacitet">
                  <label htmlFor="filter--kapacitet">Kapacitet</label>
                  <input
                    type="number"
                    name="kapacitet"
                    min="0"
                    id="filter--kapacitet"
                    placeholder="Broj osoba"
                    onChange={this.handleInputChange}
                  />
                </div>
              )}
              {filters.includes("razglas") && (
                <div className="filters__field--razglas">
                  <label htmlFor="filter--razglas">Razglas</label>
                  <select
                    name="razglas"
                    id="filter--razglas"
                    onChange={this.handleInputChange}
                  >
                    <option value="null">- Svi -</option>
                    <option value="da">Da</option>
                    <option value="ne">Ne</option>
                  </select>
                </div>
              )}
            </form>
          </div>
        )}
      />
    );
  }
}

export default UslugeFilters;
