import React from "react";

import { FaMapMarkerAlt, FaUsers, FaMapSigns, FaParking } from "react-icons/fa";
import { MdSpeaker } from "react-icons/md";

const MainInfo = ({ content }) => {
  return (
    <>
      <div className="main-info__lokacija columns medium-6 end">
        <p>
          <FaMapMarkerAlt />
          {
            content.relationships.field_content_main_info.relationships
              .field_lokacija.name
          }
        </p>
      </div>

      {content.field_kapacitet && (
        <div className="main-info__kapacitet columns medium-6 end">
          <p>
            <FaUsers /> Kapacitet do {content.field_kapacitet} osoba
          </p>
        </div>
      )}

      {content.field_adresa && (
        <div className="main-info--adresa columns medium-6 end">
          <p>
            <FaMapSigns /> {content.field_adresa}
          </p>
        </div>
      )}

      {content.field_parking && (
        <div className="main-info__parking columns medium-6 end">
          <p>
            <FaParking /> Dostupan Parking
          </p>
        </div>
      )}

      {content.field_broj_clanova && (
        <div className="main-info__clanovi columns medium-6 end">
          <p>
            <FaUsers /> Do {content.field_broj_clanova} članova
          </p>
        </div>
      )}

      {content.field_razglas && (
        <div className="main-info__clanovi columns medium-6 end">
          <p>
            <MdSpeaker /> Cijena uključuje razglas
          </p>
        </div>
      )}
    </>
  );
};

export default MainInfo;
