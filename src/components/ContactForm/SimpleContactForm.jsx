import React, { Component } from "react";

class SimpleContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      text: null,
    };
  }
  render() {
    return (
      <form>
        <div className="">
          <div className="">
            <label>
              Ime
              <input type="text" name="ime" required minLength="2"/>
            </label>
          </div>
          <div className="">
            <label>
              Email
              <input type="email" name="email" required/>
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
              />
            </label>
          </div>
          <div className="input-submit">
            <input type="submit" className="button button--primary" value="Pošalji upit" />
          </div>
        </div>
      </form>
    );
  }
}

export default SimpleContactForm;
