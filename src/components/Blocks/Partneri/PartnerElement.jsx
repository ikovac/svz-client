import React from "react";
import Image from "../../Image";

const PartnerElement = ({ imageSrc, link, title }) => {
  return (
    <div className="partner-block__partner-element callout">
      <a href={link} title={title.toLowerCase()} target="_blank" rel="noreferrer noopener">
        <Image source={imageSrc} alt={title} />
      </a>
    </div>
  );
};

export default PartnerElement;
