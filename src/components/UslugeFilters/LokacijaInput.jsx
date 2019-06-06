import React, { Component } from "react";
import cn from "classnames";

import { FaMapMarkerAlt } from "react-icons/fa";

class LokacijaInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lokacijeFiltered: this.props.lokacije,
      lokacija: this.props.lokacija ? this.props.lokacija : "",
      showInputList: false,
      activeInputListElement: 0,
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
      activeInputListElement: 0,
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

  handleKeyDown = e => {
    const { lokacijeFiltered, activeInputListElement } = this.state;
    switch (e.keyCode) {
      // Arrow down
      case 40:
        e.preventDefault();
        if (activeInputListElement < lokacijeFiltered.length - 1) {
          this.setState({
            activeInputListElement: activeInputListElement + 1,
          });
        } else {
          this.setState({ activeInputListElement: 0 });
        }
        break;
      // Arrow up
      case 38:
        e.preventDefault();
        if (activeInputListElement > 0) {
          this.setState({
            activeInputListElement: activeInputListElement - 1,
          });
        } else {
          this.setState({
            activeInputListElement: lokacijeFiltered.length - 1,
          });
        }
        break;
      // Enter
      case 13:
        e.preventDefault();
        this.setState({
          lokacija: lokacijeFiltered[activeInputListElement].node.name,
          showInputList: false,
        });
        this.props.handleInputChange(
          lokacijeFiltered[activeInputListElement].node.name
        );
        break;
      default:
        break;
    }
  };

  handleOnMouseEnter = index => {
    this.setState({ activeInputListElement: index });
  };

  handleOnBlur = e => {
    setTimeout(() => {
      this.setState({ showInputList: false });
    }, 100);
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
    const {
      lokacijeFiltered,
      lokacija,
      showInputList,
      activeInputListElement,
    } = this.state;

    let listClassname = showInputList ? "show" : "";

    return (
      <>
        <div className="filters__field--lokacija">
          <span className="filter--lokacija_span">
            <FaMapMarkerAlt />
            <input
              type="text"
              id="filter--lokacija"
              ref={node => (this.lokacijaInputElement = node)}
              value={lokacija}
              onChange={this.handleLokacijaInputChange}
              autoComplete="off"
              onFocus={this.handleOnInputFocus}
              onKeyDown={this.handleKeyDown}
              placeholder="Lokacija"
              onBlur={this.handleOnBlur}
            />
          </span>
          <ul className={cn("searched-lokacija-items", listClassname)}>
            {lokacijeFiltered.map(({ node }, index) => (
              <li
                key={node.name}
                onClick={() => this.handleLokacijaItemClick(node.name)}
                onMouseEnter={() => this.handleOnMouseEnter(index)}
                className={index === activeInputListElement ? "is-active" : ""}
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
