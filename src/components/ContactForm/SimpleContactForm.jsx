import React, { Component } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import getSessionToken from "../../utils/restToken";

class SimpleContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ime: null,
      email: null,
      poruka: null,
      disabled: false,
    };
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormSubmit = async e => {
    this.setState({ disabled: true });
    e.preventDefault();
    const { ime, email, poruka } = this.state;
    const { to } = this.props;

    let formData = {
      webform_id: "simple_contact_form",
      from_email: email,
      poruka: poruka,
      ime: ime,
      to_email: to,
    };

    let response;
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            btoa(
              `${process.env.DRUPAL_USERNAME}:${process.env.DRUPAL_PASSWORD}`
            ),
          "x-csrf-token": await getSessionToken(),
        },
      };
      response = await axios.post(
        `${process.env.DRUPAL_URI}/webform_rest/submit`,
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
        text: "Molimo Vas pokušajte kasnije ili se obratite na info@svezavjencanje.hr",
        type: "error",
        confirmButtonColor: "#f37474",
        confirmButtonText: "OK",
      });
    }
    this.setState({ disabled: false });
  };

  render() {
    const {disabled} = this.state;
    return (
      <form onSubmit={this.onFormSubmit} ref={el => (this.formRef = el)}>
        <div className="">
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

export default SimpleContactForm;
