import React from "react";
import { Link } from "gatsby";

import { FaTimes } from "react-icons/fa";

const Wishlist = ({
  wishlistItems,
  onRemoveFromWishlist,
  onSpremiOdabranoClick,
}) => {
  return (
    <div className="odabrana-lista">
      <table className="unstriped stack">
        <thead>
          <tr>
            <th className="wishlist-item-no" />
            <th className="wishlist-remove-btn" />
            <th>Naziv</th>
            <th>Email</th>
            <th>Kontakt</th>
          </tr>
        </thead>
        <tbody>
          {wishlistItems.map((item, index) => (
            <tr key={item.nid}>
              <td className="wishlist-item-no">#{index + 1}</td>
              <td className="wishlist-remove-btn">
                <button
                  onClick={() => onRemoveFromWishlist(item.nid)}
                  title="Ukloni"
                  aria-label="Ukloni"
                >
                  <FaTimes />
                </button>
              </td>
              <td>
                <Link to={item.path}>
                  <h4>{item.title}</h4>
                </Link>
              </td>
              <td>{item.email}</td>
              <td>
                <ul>
                  {item.kontakt.map(kontakt => (
                    <li key={kontakt.value}>{kontakt.value}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-btns">
        <a href="/odabrana-lista" className="button secondary">
          Osvježi
        </a>

        <button className="button" onClick={onSpremiOdabranoClick} aria-labelledby="Spremi odabrano">
          Spremi odabrano
        </button>
      </div>
    </div>
  );
};

export default Wishlist;
