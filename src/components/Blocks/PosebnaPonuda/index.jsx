import React from "react";

import { GiCampfire } from "react-icons/gi";

const PosebnaPonuda = ({ field_pp }) => {
  if (!field_pp.field_posebna_ponuda) {
    return null;
  }

  return (
    <div id="field-posebna-ponuda">
      <div className="field-pp__icon">
        <GiCampfire />
      </div>
      <div className="field_pp__opis">
        <p>{field_pp.field_posebna_ponuda_opis}</p>
      </div>
    </div>
  );
};

export default PosebnaPonuda;
