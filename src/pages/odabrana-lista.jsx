import React, { Component } from "react";

import { connect } from "react-redux";
import { makeWishlistValid } from "../redux/actions/wishlistStoreActions";
import { removeFromWishlist } from "../redux/actions/wishlistAction";

import Container from "../components/Container";
import PageTitle from "../components/PageTitle";

import {
  getWishlistCookieItems,
  removeFromWishlistCookie,
} from "../utils/wishlistCookieUtils";

import getSessionToken from "../utils/restToken";
import axios from "axios";
import Wishlist from "../components/Wishlist";

import Swal from "sweetalert2";
import MultipleContactForm from "../components/ContactForm/MultipleContactForm";

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

  onSpremiOdabranoClick = e => {
    const { wishlistItems } = this.state;
    if (!wishlistItems.length) {
    }
    const nidsArr = wishlistItems.map(item => item.nid);
    const nids = nidsArr.join(",");
    Swal.fire({
      title: "Spremite Vašu odabranu listu",
      input: "email",
      inputAttributes: {
        required: "true",
        placeholder: "Email adresa",
      },
      showCancelButton: true,
      cancelButtonText: "Odustani",

      confirmButtonText: "Spremi",
      confirmButtonColor: "#006950",
      showLoaderOnConfirm: true,
      preConfirm: async email => {
        let poruka = `Poštovani,
        Hvala Vam na korištenju portala svezavjencanje.hr.
        
        Odabranu listu možete pronaći na linku:
        ${process.env.GATSBY_SITE_URI}/spremljena-odabrana-lista?nids=${nids}`;

        let formData = {
          webform_id: "send_wishlist",
          to_email: email,
          poruka,
        };

        try {
          let config = {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Basic " +
                btoa(
                  `${process.env.DRUPAL_USERNAME}:${
                    process.env.DRUPAL_PASSWORD
                  }`
                ),
              "x-csrf-token": await getSessionToken(),
            },
          };

          let result = await axios.post(
            `${process.env.DRUPAL_URI}/webform_rest/submit`,
            formData,
            config
          );
          return result;
        } catch (err) {
          console.log(err);

          return err;
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(result => {
      if (result && result.value && result.value.status === 200) {
        Swal.fire({
          title: "Spremljeno!",
          text: "Odabrana lista je poslana na Vašu email adresu.",
          type: "success",
          confirmButtonColor: "#006950",
          confirmButtonText: "OK",
        });
      } else if (result && result.dismiss) {
        return;
      } else {
        Swal.fire({
          title: "Došlo je do pogreške",
          text:
            "Molimo Vas pokušajte kasnije ili se obratite na info@svezavjencanje.hr",
          type: "error",
          confirmButtonColor: "#f37474",
          confirmButtonText: "OK",
        });
      }
    });
  };

  componentDidMount() {
    this.loadWishlist();
  }

  onRemoveFromWishlist = nid => {
    const { removeFromWishlist, makeWishlistValid } = this.props;
    const { wishlistItems } = this.state;

    Swal.fire({
      type: "success",
      toast: true,
      position: "top-end",
      title: "Artkl je uklonjen iz odabrane liste",
      showConfirmButton: false,
      timer: 2000,
    });

    let newWishlist = wishlistItems.filter(item => item.nid !== nid);

    removeFromWishlistCookie(nid);
    makeWishlistValid(newWishlist);
    removeFromWishlist(nid);

    if (!newWishlist.length) {
      this.setState({ wishlistItems: newWishlist, empty: true });
      return;
    }

    this.setState({ wishlistItems: newWishlist });
  };

  render() {
    const { loading, empty, wishlistItems, err } = this.state;
    return (
      <Container>
        <PageTitle>Odabrana lista</PageTitle>

        <div className="wishlist-page-wrapper">
          <p className="body-text">
            <strong>Čestitamo!</strong> Došli ste do zadnjeg koraka.
            <br />
            Ovdje možete pregledati Vašu odabranu listu te ukoliko je sve
            ispravno stisnite gumb za spremanje.
            <br />
            Odabrana lista će potom biti poslana na Vašu email adresu te će te
            imati{" "}
            <em>
              <strong>sve što želite na jednom mjestu!</strong>
            </em>
          </p>
          {err && <h4>{err}</h4>}
          {loading && <div className="loader" />}
          {empty && <p>Odabrana lista je prazna.</p>}
          {!loading && !empty && !err && (
            <Wishlist
              wishlistItems={wishlistItems}
              onRemoveFromWishlist={this.onRemoveFromWishlist}
              onSpremiOdabranoClick={this.onSpremiOdabranoClick}
            />
          )}
          {!loading && !empty && !err && (
            <div className="callout multiple-contact-form">
              <h3>Pošalji upit</h3>
              <p>
                Sa samo jednim upitom možete kontaktirati sve označene
                oglašivače.
              </p>
              <MultipleContactForm checkboxes={wishlistItems} />
            </div>
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
  { makeWishlistValid, removeFromWishlist }
)(OdabranaLista);
