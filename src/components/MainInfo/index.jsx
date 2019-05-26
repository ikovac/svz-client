import React from "react";

import { FaMapMarkerAlt, FaUsers, FaMapSigns, FaParking } from "react-icons/fa";

const MainInfo = ({ content }) => {
  return (
    <>
      <div className="main-info__lokacija columns medium-6">
        <p>
          <FaMapMarkerAlt />
          {
            content.relationships.field_content_main_info.relationships
              .field_lokacija.name
          }
        </p>
      </div>

      {content.field_kapacitet && (
        <div className="main-info__kapacitet columns medium-6">
          <p>
            <FaUsers /> Kapacitet do {content.field_kapacitet} osoba
          </p>
        </div>
      )}

      {content.field_adresa && (
        <div className="main-info--adresa columns medium-6">
          <p>
            <FaMapSigns /> {content.field_adresa}
          </p>
        </div>
      )}

      {content.field_parking && (
        <div className="main-info__parking columns medium-6">
          <p>
            <FaParking /> Dostupan Parking
          </p>
        </div>
      )}
    </>
  );
};

export default MainInfo;
