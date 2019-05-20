import React from "react";
import { Link } from "gatsby";
import Container from "../Container";
import {
  FaRegCopyright,
  FaInfoCircle,
  FaPhone,
  FaMobileAlt,
} from "react-icons/fa";
import { MdMail } from "react-icons/md";

const Footer = () => {
  const crntYear = new Date().getFullYear();
  return (
    <footer id="footer">
      <Container>
        <div className="footer-top">
          <div className="footer-first">
            <h3>
              <FaInfoCircle /> Informacije
            </h3>
            <p>
              <Link to="/o-nama" title="o nama">
                O nama
              </Link> 
            </p>
            <p>
              <Link to="/opci-uvjeti-koristenja" title="opći uvjeti korištenja">
                Opći uvjeti korištenja
              </Link>
            </p>
          </div>
          <div className="footer-second">
            <h3>Za oglašivače</h3>
            <p>
              <Link to="/postanite-nas-clan" title="postanite naš član">
                Postanite naš član
              </Link>
            </p>
          </div>
          <div className="footer-third">
            <h3>Kontakt</h3>
            <p>
              <MdMail /> info@svezavjencanje.hr
            </p>
            <p>
              <FaPhone /> +385 (0)21 420 899
            </p>
            <p>
              <FaMobileAlt /> +385 (0)98 180 2609
            </p>
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
