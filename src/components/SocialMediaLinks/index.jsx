import React from "react";

import { FaFacebookF, FaInstagram, FaGlobe, FaYoutube } from "react-icons/fa";

const SocialMediaLinks = ({ socialMedia }) => {
  return (
    <div className="social-media-links">
      {socialMedia.field_facebook && (
        <p>
          <a
            href={socialMedia.field_facebook.uri}
            target="_blank"
            rel="noreferrer noopener"
          >
            <FaFacebookF />
          </a>
        </p>
      )}
      {socialMedia.field_instagram && (
        <p>
          <a
            href={socialMedia.field_instagram.uri}
            target="_blank"
            rel="noreferrer noopener"
          >
            <FaInstagram />
          </a>
        </p>
      )}
      {socialMedia.field_web && (
        <p>
          <a
            href={socialMedia.field_web.uri}
            target="_blank"
            rel="noreferrer noopener"
          >
            <FaGlobe />
          </a>
        </p>
      )}
      {socialMedia.field_youtube && (
        <p>
          <a
            href={socialMedia.field_youtube.uri}
            target="_blank"
            rel="noreferrer noopener"
          >
            <FaYoutube />
          </a>
        </p>
      )}
    </div>
  );
};

export default SocialMediaLinks;
