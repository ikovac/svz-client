import React from "react";
import { Link } from "gatsby";

import Container from "../../components/Container";

const RestoraniSalePage = () => {
  return (
    <Container>
      <div>
        <Link to="svadbene-vecere/restorani-sale/restoran-gusar">
          Resotran Gusar
        </Link>
      </div>
      <div>
        <Link to="svadbene-vecere/restorani-sale/hotel-fanat">Hotel fanat</Link>
      </div>
    </Container>
  );
};

export default RestoraniSalePage;
