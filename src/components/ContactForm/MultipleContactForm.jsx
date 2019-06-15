import React, { Component } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import getSessionToken from "../../utils/restToken";
import Checkbox from "./Checkbox";

class MultipleContactForm extends Component {
  constructor(props) {
    super(props);

    const { checkboxes } = this.props;

    this.state = {
      checkboxItems: new Map(checkboxes.map(item => [item.email, true])),
      ime: null,
      email: null,
      poruka: null,
      disabled: false,
    };
  }

  onCheckboxChange = e => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({
      checkboxItems: prevState.checkboxItems.set(item, isChecked),
    }));
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormSubmit = async e => {
    e.preventDefault();
    console.log(this.state);

    // check if any checkbox is checked.
  };

  componentDidUpdate(prevProps) {
    const checkboxes = this.props.checkboxes;
    const oldCheckboxes = prevProps.checkboxes;

    if (checkboxes.length !== oldCheckboxes.length) {
      const { checkboxItems } = this.state;

      let newCheckboxItems = new Map(
        checkboxes.map(item => [item.email, checkboxItems.get(item.email)])
      );

      this.setState({ checkboxItems: newCheckboxItems });
    }
  }

  render() {
    const { disabled, checkboxItems } = this.state;
    const { checkboxes } = this.props;
    return (
      <form onSubmit={this.onFormSubmit} ref={el => (this.formRef = el)}>
        <div className="">
          <div className="checkboxes">
            {checkboxes.map(item => (
              <div className="checkbox-wrapper" key={item.nid}>
                <Checkbox
                  name={item.email}
                  checked={checkboxItems.get(item.email)}
                  onCheckboxChange={this.onCheckboxChange}
                  id={`${item.nid}-checkbox`}
                />
                <label htmlFor={`${item.nid}-checkbox`}>{item.title}</label>
              </div>
            ))}
          </div>
          <div className="">
            <label>
              Ime
              <input
                type="text"
                name="ime"
                required
                minLength="2"
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div className="">
            <label>
              Email
              <input
                type="email"
                name="email"
                required
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div className="">
            <label>
              Poruka
              <textarea
                name="poruka"
                cols="30"
                rows="5"
                required
                minLength="10"
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div className="input-submit">
            <input
              type="submit"
              className="button button--primary"
              value="Pošalji upit"
              disabled={disabled}
            />
          </div>
        </div>
      </form>
    );
  }
}

export default MultipleContactForm;
