import React from "react";

import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import SimpleContactForm from "../components/ContactForm/SimpleContactForm";

import { FaPhone, FaMobileAlt } from "react-icons/fa";
import { MdMail } from "react-icons/md";

const KontaktPage = () => {
  return (
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
      </div>

      <SimpleContactForm />
    </Container>
  );
};

export default KontaktPage;
