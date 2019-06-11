import React, { Component } from "react";
import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";
import { Link } from "gatsby";

class Tražilica extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      loading: false,
    };
  }

  onSearchInputChange = async e => {
    let results;
    if (!e.target.value || !e.target.value.length) {
      this.setState({ results: null });
      return;
    }

    this.setState({ loading: true });
    try {
      results = await axios.get(
        `${process.env.DRUPAL_URI}/api/search?_format=json&search=${
          e.target.value
        }`
      );
      this.setState({ results: results.data, loading: false });
    } catch (err) {
      console.log("Došlo je do pogreške, molimo Vas pokušajte kasnije");
    }
  };

  render() {
    const { results, loading } = this.state;
    return (
      <Container>
        <PageTitle>Pretraži stranicu</PageTitle>
        <div className="search-page-container">
          <DebounceInput
            minLength={2}
            debounceTimeout={300}
            onChange={this.onSearchInputChange}
            placeholder="Upišite pojam za pretraživanje"
          />
          {!loading && results && (
            <div className="search-results">
              <ul>
                {results.map(result => (
                  <li key={result.nid}>
                    <Link to={result.view_node}>{result.title}</Link>
                    <p>{result.type.replace("amp;", "")}</p>
                    <p>{result.body.replace(/<[^>]*>/g, "")}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {loading && <div className="loader" />}
        </div>
      </Container>
    );
  }
}

export default Tražilica;
