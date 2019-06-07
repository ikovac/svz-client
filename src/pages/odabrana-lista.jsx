import React, { Component } from "react";

import { connect } from "react-redux";
import { makeWishlistValid } from "../redux/actions/wishlistStoreActions";

import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import { getWishlistCookieItems } from "../utils/wishlistCookieUtils";
import axios from "axios";
import Wishlist from "../components/Wishlist";

class OdabranaLista extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      empty: false,
      wishlistItems: [],
      err: null,
    };
  }

  loadWishlist = async () => {
    const nids = getWishlistCookieItems();
    const { wishlistStore, makeWishlistValid } = this.props;

    if (!nids || !nids.length) {
      this.setState({ loading: false, empty: true });
      return;
    }

    if (wishlistStore.valid) {
      this.setState({ loading: false, wishlistItems: wishlistStore.items });
      return;
    }

    // wishlist is not empty
    // wishlit doesn't exist in wishlistStore
    let queryParamsNids = nids.join(",");

    let result;
    try {
      result = await axios.get(
        `${
          process.env.DRUPAL_URI
        }/api/wishlist?_format=json&nids=${queryParamsNids}`
      );

      makeWishlistValid(result.data);
      this.setState({ loading: false, wishlistItems: result.data });
    } catch (err) {
      this.setState({
        loading: false,
        err:
          "Dogodila se pogreška prilikom učitavanja odabrane liste. Molimo Vas provjerite Vašu internet vezu ili pokušajte kasnije.",
      });
    }
  };

  componentDidMount() {
    this.loadWishlist();
  }

  render() {
    const { loading, empty, wishlistItems, err } = this.state;
    return (
      <Container>
        <PageTitle>Odabrana lista</PageTitle>

        <div className="wishlist-page-wrapper">
          {err && <h4>{err}</h4>}
          {loading && <div className="loader" />}
          {empty && <p>Odabrana lista je prazna.</p>}
          {!loading && !empty && (
            <Wishlist wishlistItems={wishlistItems} />
          )}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  wishlistStore: state.wishlistStore,
});

export default connect(
  mapStateToProps,
  { makeWishlistValid }
)(OdabranaLista);