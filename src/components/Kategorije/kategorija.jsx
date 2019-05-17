import React from "react";
import Image from "../Image";
import { Link } from "gatsby";

const Kategorija = ({ kategorija }) => {
  return (
    <div className="kategorija__column-element card">
      <div className="kategorija-element__title">{kategorija.title}</div>
      <Link to={kategorija.path.alias}>
        <Image
          source={
            kategorija.relationships.field_image.localFile.childImageSharp.fluid
          }
          alt={kategorija.title}
        />
      </Link>

      <div className="card-section">
        {kategorija.relationships.field_podkategorije.map(
          ({ field_link_kategorije }) => (
            <div key={field_link_kategorije.title}>
              <Link
                to={field_link_kategorije.uri.replace(
                  "internal:",
                  kategorija.path.alias
                )}
              >
                {field_link_kategorije.title}
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Kategorija;
