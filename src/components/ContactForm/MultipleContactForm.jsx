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
      mob: null,
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
    this.setState({ disabled: true });

    const { checkboxItems, ime, email, poruka, mob } = this.state;

    let toArr = [];
    for (let [key, value] of checkboxItems.entries()) {
      if (value) {
        if(!toArr.includes(value)) {
          toArr.push(key);
        }
      }
    }

    if (!toArr.length) {
      this.setState({
        disabled: false,
      });
      Swal.fire({
        title: "Morate odabrati barem jednog oglašivača",
        type: "error",
        confirmButtonColor: "#f37474",
        confirmButtonText: "OK",
      });
      return;
    }

    let formData = {
      webform_id: "multiple_contact_form",
      from_email: email,
      poruka: poruka,
      ime: ime,
      kontakt: mob,
      to_email: toArr.join(", "),
    };

    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            btoa(
              `${process.env.GATSBY_DRUPAL_USERNAME}:${process.env.GATSBY_DRUPAL_PASSWORD}`
            ),
          "x-csrf-token": await getSessionToken(),
        },
      };

      await axios.post(
        `${process.env.GATSBY_DRUPAL_URI}/webform_rest/submit`,
        formData,
        config
      );

      Swal.fire({
        title: "Vaš upit je poslan",
        text: "Hvala Vam na korištenju portala svezavjencanje.hr",
        type: "success",
        confirmButtonColor: "#006950",
        confirmButtonText: "OK",
      }).then(() => {
        this.formRef.reset();
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Došlo je do pogreške",
        text:
          "Molimo Vas pokušajte kasnije ili se obratite na info@svezavjencanje.hr",
        type: "error",
        confirmButtonColor: "#f37474",
        confirmButtonText: "OK",
      });
    }
    this.setState({ disabled: false });
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
          <label>Prima *</label>
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
              Ime *
              <input
                type="text"
                name="ime"
                required
                minLength="2"
                onChange={this.handleInputChange}
                aria-label="Ime"
              />
            </label>
          </div>
          <div className="">
            <label>
              Email *
              <input
                type="email"
                name="email"
                required
                onChange={this.handleInputChange}
                aria-label="Email"
              />
            </label>
          </div>
          <div className="">
            <label>
              Kontakt broj
              <input
                type="text"
                name="mob"
                onChange={this.handleInputChange}
                aria-label="Kontakt broj"
              />
            </label>
          </div>
          <div className="">
            <label>
              Poruka *
              <textarea
                name="poruka"
                cols="30"
                rows="5"
                required
                minLength="10"
                onChange={this.handleInputChange}
                aria-label="Poruka"
              />
            </label>
          </div>
          <div className="input-submit">
            <input
              type="submit"
              className="button button--primary"
              value="Pošalji upit"
              disabled={disabled}
              aria-label="Pošalji upit"
            />
          </div>
        </div>
      </form>
    );
  }
}

export default MultipleContactForm;
