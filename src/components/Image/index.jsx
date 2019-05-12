import React from "react";

import Img from "gatsby-image";

const Image = ({ source, alt="" }) => {
  return <Img fluid={source} alt={alt} />;
};

export default Image;
