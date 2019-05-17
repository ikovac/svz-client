import React from "react";
import Masonry from "react-masonry-css";
import Kategorija from "./kategorija";
// https://www.npmjs.com/package/react-masonry-css

const Kategorije = ({ kategorije }) => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="kategorije-wrapper"
      columnClassName="kategorije__column"
    >
      {kategorije.map(({ node }) => (
        <Kategorija
          key={node.drupal_internal__nid}
          isSubCategory={false}
          kategorija={node}
        />
      ))}
    </Masonry>
  );
};

export default Kategorije;
