import React from "react";

import { GiCampfire } from "react-icons/gi";

const PosebnaPonuda = ({ field_pp }) => {
  if (!field_pp.field_posebna_ponuda) {
    return null;
  }

  return (
    <div id="field-posebna-ponuda">
      <p>
        <span className="field-pp__icon">
          <GiCampfire />
        </span>
        {field_pp.field_posebna_ponuda_opis}
      </p>
    </div>
  );
};

export default PosebnaPonuda;
