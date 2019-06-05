import React, { Component } from "react";
import cn from "classnames";

import { FaMapMarkerAlt } from "react-icons/fa";

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
    let showInputList = false;

    if (enteredTerm && enteredTerm.length) {
      showInputList = true;
    }
    const newFilteredValues = this.props.lokacije.filter(({ node }) =>
      node.name.toUpperCase().includes(enteredTerm.toUpperCase())
    );
    this.setState({
      lokacijeFiltered: newFilteredValues,
      lokacija: enteredTerm,
      showInputList: showInputList,
    });
    this.props.handleInputChange(enteredTerm);
  };

  handleLokacijaItemClick = name => {
    this.setState({
      lokacija: name,
      lokacijeFiltered: [],
      showInputList: false,
    });
    this.props.handleInputChange(name);
  };

  handleOnInputFocus = e => {
    if (e.target.value && e.target.value.length) {
      this.setState({ showInputList: true });
    }
  };

  handleDocumentClick = e => {
    if (!this.lokacijaInputElement.contains(e.target)) {
      this.setState({ showInputList: false });
    }
  };

  componentDidMount() {
    document.addEventListener("click", this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleDocumentClick);
  }

  render() {
    const { lokacijeFiltered, lokacija, showInputList } = this.state;

    let listClassname = showInputList ? "show" : "";

    return (
      <>
        <div className="filters__field--lokacija">
          {/* <label htmlFor="filter--lokacija">Lokacija</label> */}
          <span className="filter--lokacija_span">
            <FaMapMarkerAlt />
            <input
              type="text"
              name="lokacija"
              id="filter--lokacija"
              ref={node => (this.lokacijaInputElement = node)}
              value={lokacija}
              onChange={this.handleLokacijaInputChange}
              autoComplete="off"
              onFocus={this.handleOnInputFocus}
              placeholder="Lokacija"
            />
          </span>
          <ul className={cn("searched-lokacija-items", listClassname)}>
            {lokacijeFiltered.map(({ node }) => (
              <li
                key={node.name}
                onClick={() => this.handleLokacijaItemClick(node.name)}
              >
                <FaMapMarkerAlt />
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
