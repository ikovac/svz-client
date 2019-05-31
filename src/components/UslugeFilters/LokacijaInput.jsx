import React, { Component } from "react";

class LokacijaInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lokacijeFiltered: this.props.lokacije,
      lokacija: "",
    };
  }

  handleLokacijaInputChange = e => {
    const enteredTerm = e.target.value;
    const newFilteredValues = this.props.lokacije.filter(({ node }) =>
      node.name.toUpperCase().includes(enteredTerm.toUpperCase())
    );
    this.setState({
      lokacijeFiltered: newFilteredValues,
      lokacija: enteredTerm,
    });
    this.props.handleInputChange(enteredTerm);
  };

  handleLokacijaItemClick = name => {
    this.setState({
      lokacija: name,
      lokacijeFiltered: [],
    });
    this.props.handleInputChange(name);
  };

  render() {
    const { lokacijeFiltered, lokacija } = this.state;
    console.log("FILTERED: ", lokacijeFiltered);
    return (
      <>
        <div className="filters__field--lokacija">
          <label htmlFor="filter--lokacija">Lokacija</label>
          <input
            type="text"
            name="lokacija"
            id="filter--lokacija"
            value={lokacija}
            onChange={this.handleLokacijaInputChange}
          />
        </div>
        <ul className="searched-lokacija-items">
          {lokacijeFiltered.map(({ node }) => (
            <li
              key={node.name}
              onClick={() => this.handleLokacijaItemClick(node.name)}
            >
              {node.name}
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default LokacijaInput;
