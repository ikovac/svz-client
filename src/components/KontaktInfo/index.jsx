import React from "react";

import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const KontaktInfo = ({ mainInfo }) => {
  return (
    <>
      <div className="kontakt-info__field-email">
        <p>
          <MdEmail />
          {mainInfo.field_email}
        </p>
      </div>
      <div className="kontakt-info__field-phone">
        <FaPhone />
        <ul>
          {mainInfo.field_kontakt.map(kontakt => (
            <li key={kontakt}>{kontakt}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default KontaktInfo;
