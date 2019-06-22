import React from "react";
import Container from "../components/Container";

import SEO from "../components/seo";

const NotFoundPage = () => (
  <Container>
    <SEO title="404: Not found" />
    <h1>Ups...</h1>
    <p>Stranica koju ste otvorili nažalost ne postoji ili je privremeno nedostupna.</p>
  </Container>
);

export default NotFoundPage;
