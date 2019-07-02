import React, { Component } from "react";
import { connect } from "react-redux";
import { updateFilters } from "../../redux/actions/filtersActions";

import { StaticQuery, graphql, navigate } from "gatsby";

import DatumSelect from "../UslugeFilters/DatumSelect";
import LokacijaInput from "../UslugeFilters/LokacijaInput";
import KapacitetInput from "../UslugeFilters/KapacitetInput";

class FrontPageFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datum: null,
      lokacija: null,
      kapacitet: "",
      displayDate: null,
    };
  }

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

  handleInputChange = e => {
    const { updateFilters } = this.props;
    this.setState({ [e.target.name]: e.target.value });
    updateFilters(e.target.name, e.target.value);
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  preSubmit = () => {
    const { datum, lokacija, kapacitet } = this.state;
    const { updateFilters } = this.props;
    if (!datum) {
      updateFilters("datum", null);
    }
    if (!lokacija) {
      updateFilters("lokacija", null);
    }
    if (!kapacitet) {
      updateFilters("kapacitet", "");
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.preSubmit();
    navigate("/svadbene-vecere/restorani-sale");
  };

  handleOnSubmitFocus = e => {
    e.preventDefault();
    if (e.keyCode === 13) {
      this.preSubmit();
      navigate("/svadbene-vecere/restorani-sale");
    }
  };

  componentDidMount() {
    const element = document.getElementById("filter--datum");

    element.setAttribute("readonly", "readonly");
    element.setAttribute("aria-label", "Odaberite datum");
  }

  render() {
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
          <div className="front-page-filters">
            <form onKeyDown={this.handleKeyDown} autoComplete="lalalal">
              <DatumSelect
                displayDate={displayDate}
                handleDatumChange={this.handleDatumChange}
              />
              <LokacijaInput
                handleInputChange={this.handleLokacijaChange}
                lokacije={lokacijaTerms.allTaxonomyTermLokacija.edges}
              />
              <KapacitetInput handleInputChange={this.handleInputChange} />
              <input
                type="button"
                className="button button-primary"
                value="Pretraži"
                onKeyDown={this.handleOnSubmitFocus}
                onClick={this.handleSubmit}
                aria-label="Pretraži"
              />
            </form>
          </div>
        )}
      />
    );
  }
}

export default connect(
  null,
  { updateFilters }
)(FrontPageFilters);
