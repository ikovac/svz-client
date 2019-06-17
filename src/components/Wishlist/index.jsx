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
            <th>Naziv</th>
            <th>Email</th>
            <th>Kontakt</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {wishlistItems.map(item => (
            <tr key={item.nid}>
              <td>
                <Link to={item.path}>{item.title}</Link>
              </td>
              <td>{item.email}</td>
              <td>
                <ul>
                  {item.kontakt.map(kontakt => (
                    <li key={kontakt.value}>{kontakt.value}</li>
                  ))}
                </ul>
              </td>
              <td>
                <button onClick={() => onRemoveFromWishlist(item.nid)}>
                  <FaTimes />
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <a href="/odabrana-lista" className="button secondary">
                Osvježi
              </a>
            </td>
            <td />
            <td />
            <td>
              <button
                className="button"
                onClick={onSpremiOdabranoClick}
              >
                Spremi odabrano
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Wishlist;
