import React, { Component } from "react";
import LokacijaInput from "./LokacijaInput";
import { StaticQuery, graphql } from "gatsby";
import { FaUsers, FaRegCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class UslugeFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datum: null,
      lokacija: null,
      kapacitet: null,
      razglas: null,
      displayDate: null,
    };
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDatumChange = date => {
    if (date) {
      let datum = `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}`;
      this.setState({ datum: datum, displayDate: date });
    } else {
      this.setState({ datum: null, displayDate: date });
    }
  };

  handleLokacijaChange = name => {
    this.setState({ lokacija: name });
  };

  handleFiltersSubmit = e => {
    e.preventDefault();
    this.props.onFilterSubmit(this.state);
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  handleOnSubmitFocus = e => {
    e.preventDefault();
    if (e.keyCode === 13) {
      this.props.onFilterSubmit(this.state);
    }
  };

  render() {
    const { filters } = this.props;
    const { displayDate } = this.state;

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
            <form onKeyDown={this.handleKeyDown} autoComplete="lalala">
              {filters.includes("datum") && (
                <div className="filters__field--datum">
                  <FaRegCalendarAlt />
                  <DatePicker
                    id="filter--datum"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Odaberite datum"
                    selected={displayDate}
                    name="datum"
                    minDate={new Date()}
                    isClearable={true}
                    onChange={this.handleDatumChange}
                    popperPlacement="bottom"
                    popperModifiers={{
                      flip: {
                        behavior: ["bottom"], // don't allow it to flip to be above
                      },
                    }}
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
                  <FaUsers />
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
                  <label htmlFor="filter--razglas">Razglas:</label>
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

              <input
                type="button"
                className="button button-primary"
                value="Primjeni"
                onKeyDown={this.handleOnSubmitFocus}
                onClick={this.handleFiltersSubmit}
              />
            </form>
          </div>
        )}
      />
    );
  }
}

export default UslugeFilters;
