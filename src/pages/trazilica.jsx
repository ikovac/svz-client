import React, { Component } from "react";
import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";
import { Link } from "gatsby";
import Breadcrumbs from "../components/Breadcrumbs";
import SEO from "../components/seo";

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
        `${process.env.GATSBY_DRUPAL_URI}/api/search?_format=json&search=${
          e.target.value
        }`
      );
      this.setState({ results: results.data, loading: false });
    } catch (err) {
      console.log("Došlo je do pogreške, molimo Vas pokušajte kasnije");
    }
  };

  componentDidMount() {
    document.getElementById("search-input").focus();
  }

  render() {
    const { results, loading } = this.state;
    return (
      <>
        <SEO title="Pretraži stranicu" />
        <Breadcrumbs current="Tražilica" />
        <Container>
          <PageTitle>Pretraži stranicu</PageTitle>
          <div className="search-page-container">
            <DebounceInput
              minLength={2}
              debounceTimeout={300}
              onChange={this.onSearchInputChange}
              placeholder="Upišite pojam za pretraživanje"
              id="search-input"
              autoComplete="off"
              aria-label="Tražilica"
            />
            {!loading && results && (
              <div className="search-results">
                {!results.length && (
                  <p className="no-result-text">
                    Nema rezultat za upisani pojam
                  </p>
                )}
                {results.length ? (
                  <p className="result-text">
                    Rezultata: <strong>{results.length}</strong>
                  </p>
                ) : null}
                <ul>
                  {results.map(result => (
                    <li key={result.nid}>
                      <Link to={result.view_node}>
                        <span>{result.title}</span>
                        <p className="label">
                          {result.type.replace("amp;", "")}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {loading && <div className="loader" />}
          </div>
        </Container>
      </>
    );
  }
}

export default Tražilica;
