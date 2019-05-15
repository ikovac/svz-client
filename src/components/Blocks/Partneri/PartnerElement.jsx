import React from "react";
import { Link } from "gatsby";
import Image from "../../Image";

const PartnerElement = ({ imageSrc, link, title }) => {
  return (
    <div className="partner-block__partner-element">
      <Link to={link} title={title.toLowerCase()}>
        <Image source={imageSrc} alt={title} />
      </Link>
    </div>
  );
};

export default PartnerElement;
