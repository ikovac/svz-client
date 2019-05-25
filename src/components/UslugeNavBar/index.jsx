import React, { Component } from "react";
import { document, window, exists } from "browser-monads";

import { FaInfo, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const items = [
  {
    icon: <FaInfo />,
    label: "Info",
    linkId: "main-info",
  },
  {
    icon: <FaPhone />,
    label: "Kontakt",
    linkId: "kontakt-info",
  },
  {
    icon: <FaMapMarkerAlt />,
    label: "Karta",
    linkId: "leaflet-map",
  },
];
class UslugeNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleNavBarElementClick = id => {
    if (!exists(window) && !exists(document)) {
      return;
    }

    let el = document.getElementById(id);
    window.scroll({
      left: 0,
      top: el.offsetTop - 20,
      behavior: 'smooth',
    });
  };

  render() {
    return (
      <div className="usluge-nav-wrapper">
        {items.map(item => (
          <button
            key={item.label}
            onClick={() => this.handleNavBarElementClick(item.linkId)}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </div>
    );
  }
}

export default UslugeNavBar;
