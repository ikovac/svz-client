import React, { Component } from "react";
import { connect } from "react-redux";
import { updateFilters } from "../../redux/actions/filtersActions";

import LokacijaInput from "./LokacijaInput";
import { StaticQuery, graphql } from "gatsby";

import DatumSelect from "./DatumSelect";
import KapacitetInput from "./KapacitetInput";

import { FaTimes } from "react-icons/fa";

class UslugeFilters extends Component {
  constructor(props) {
    super(props);
    const { filtersStore } = this.props;
    this.state = {
      datum: filtersStore.datum,
      lokacija: filtersStore.lokacija,
      kapacitet: filtersStore.kapacitet,
      razglas: null,
      displayDate: filtersStore.datum ? new Date(filtersStore.datum) : null,
      showFilters: false,
    };
    this.initialSubmit();
  }

  handleInputChange = e => {
    const { updateFilters } = this.props;
    this.setState({ kapacitet: e.target.value });
    updateFilters("kapacitet", e.target.value);
  };

  handleDatumChange = date => {
    const { updateFilters } = this.props;
    if (date) {
      let datum = `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}`;
      this.setState({ datum: datum, displayDate: date });
      updateFilters("datum", datum);
    } else {
      this.setState({ datum: null, displayDate: date });
      updateFilters("datum", null);
    }
  };

  handleLokacijaChange = name => {
    const { updateFilters } = this.props;
    this.setState({ lokacija: name });
    updateFilters("lokacija", name);
  };

  handleFiltersSubmit = e => {
    e.preventDefault();
    this.props.onFilterSubmit(this.state);
    this.onFilterClose();
  };

  initialSubmit = () => {
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
      this.onFilterClose();
    }
  };

  onFilterToggle = e => {
    e.preventDefault();
    const {showFilters} = this.state;

    if(showFilters) {
      this.onFilterClose();
    } else {
      this.onFilterOpen();
    }
  };

  onFilterOpen = () => {
    this.setState({ showFilters: true });
    document.getElementsByTagName("body")[0].style.position = "fixed";
  }

  onFilterClose = () => {
    this.setState({ showFilters: false });
    document.getElementsByTagName("body")[0].style.position = "unset";
  }

  componentDidMount() {
    document
      .getElementById("filter--datum")
      .setAttribute("readonly", "readonly");
  }

  render() {
    const { filters } = this.props;
    const { displayDate, lokacija, kapacitet, showFilters } = this.state;

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
            <button
              className="button filter-btn"
              onClick={this.onFilterToggle}
            >
              Filteri
            </button>
            {/* <h4>Filtriraj rezultate</h4> */}
            <form
              onKeyDown={this.handleKeyDown}
              autoComplete="lalala"
              className={showFilters ? null : "close"}
            >
              <div className="form-filters-controls">
                <button onClick={this.onFilterToggle}>
                  <FaTimes />
                </button>
              </div>
              {filters.includes("datum") && (
                <DatumSelect
                  displayDate={displayDate}
                  handleDatumChange={this.handleDatumChange}
                />
              )}
              {filters.includes("lokacija") && (
                <LokacijaInput
                  handleInputChange={this.handleLokacijaChange}
                  lokacije={lokacijaTerms.allTaxonomyTermLokacija.edges}
                  lokacija={lokacija}
                />
              )}
              {filters.includes("kapacitet") && (
                <KapacitetInput
                  handleInputChange={this.handleInputChange}
                  kapacitet={kapacitet}
                />
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

const mapStateToProps = state => ({
  filtersStore: state.filters,
});

export default connect(
  mapStateToProps,
  { updateFilters }
)(UslugeFilters);
