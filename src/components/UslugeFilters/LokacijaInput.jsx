import React, { Component } from "react";
import cn from "classnames";

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
      showInputList: false,
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

  handleOnInputFocus = e => {
    this.setState({ showInputList: true });
  };

  handleOnInputFocusExit = e => {
    this.setState({ showInputList: false });
  };

  render() {
    const { lokacijeFiltered, lokacija, showInputList } = this.state;

    let listClassname = showInputList ? "show" : "";

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
            autoComplete="off"
            onFocus={this.handleOnInputFocus}
            onBlur={this.handleOnInputFocusExit}
          />
          <ul className={cn("searched-lokacija-items", listClassname)}>
            {lokacijeFiltered.map(({ node }) => (
              <li
                key={node.name}
                onClick={() => this.handleLokacijaItemClick(node.name)}
              >
                {node.name}
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}

export default LokacijaInput;
