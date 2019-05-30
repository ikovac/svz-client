import React, { Component } from "react";

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
  render() {
    const { filters } = this.props;

    return (
      <div className="filters-container">
        <h4>Filtriraj rezultate</h4>
        <form>
          {filters.includes("datum") && (
            <div className="filters__field--datum">
              <label htmlFor="filter--datum">Datum</label>
              <input type="date" name="datum" id="filter--datum" placeholder="Odaberite datum" />
            </div>
          )}
          {filters.includes("lokacija") && (
            <div className="filters__field--lokacija">
              <label htmlFor="filter--lokacija">Lokacija</label>
              <input type="text" name="lokacija" id="filter--lokacija"/>
            </div>
          )}
          {filters.includes("kapacitet") && (
            <div className="filters__field--kapacitet">
              <label htmlFor="filter--kapacitet">Kapacitet</label>
              <input type="number" name="kapacitet" min="0" id="filter--kapacitet" placeholder="Broj osoba" />
            </div>
          )}
          {filters.includes("razglas") && (
            <div className="filters__field--razglas">
              <label htmlFor="filter--razglas">Razglas</label>
              <select name="razglas" id="filter--razglas">
                <option value="null">- Svi -</option>
                <option value="da">Da</option>
                <option value="ne">Ne</option>
              </select>
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default UslugeFilters;
