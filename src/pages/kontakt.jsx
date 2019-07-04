import React from "react";

import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import SimpleContactForm from "../components/ContactForm/SimpleContactForm";

import { FaPhone, FaMobileAlt } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import Breadcrumbs from "../components/Breadcrumbs";
import SEO from "../components/seo";

const KontaktPage = () => {
  return (
    <>
      <SEO title="Kontakt" />
      <Breadcrumbs current="Kontakt" />
      <Container>
        <PageTitle>Kontakt</PageTitle>
        <div className="kontakt-page">
          <p>Sve za vjenčanje</p>
          <p>Put Supavla 1, 21000 Split</p>
          <p>
            <MdMail /> info@svezavjencanje.hr
          </p>
          <p>
            <FaPhone /> +385 (0)21 420 899
          </p>
          <p>
            <FaMobileAlt /> +385 (0)98 180 2609
          </p>
          <div className="contact-form callout">
            <h3>Kontaktirajte nas</h3>
            <SimpleContactForm to={process.env.GATSBY_SITE_EMAIL} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default KontaktPage;
