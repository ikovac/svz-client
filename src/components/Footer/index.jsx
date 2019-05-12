import React from "react";
import Container from "../Container";
import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  const crntYear = new Date().getFullYear();
  return (
    <footer id="footer">
      <Container>
        <div className="footer-top">
          <div className="footer-first">
            footer 1
          </div>
          <div className="footer-second">
            footer 2
          </div>
          <div className="footer-third">
            footer 2
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            svezavjencanje.hr sva prava pridržana <FaRegCopyright /> {crntYear}
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
