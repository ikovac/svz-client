import React from "react";
import { Link } from "gatsby";
import getTextSummary from "../../utils/trimHtmlText";
import Slideshow from "../Slideshow";
import AddToWishlistBtn from "../AddToWishlistBtn";

import {
  FaMapMarkerAlt,
  FaUsers,
  FaParking,
  FaCameraRetro,
  FaVideo,
} from "react-icons/fa";
import { GiCampfire } from "react-icons/gi";
import { MdSpeaker } from "react-icons/md";

const ArticleTeaser = ({ article }) => {
  return (
    <article className="article-teaser row">
      {article.relationships.field_posebna_ponuda && (
        <div className="article-teaser__pp-icon" title="Posebna ponuda">
          <GiCampfire />
        </div>
      )}
      <div className="columns medium-4 left-section">
        <Slideshow
          gallery={
            article.relationships.field_content_main_info.relationships
              .field_galerija
          }
          alt={article.title}
          showThumbnails={false}
          disableArrowKeys={true}
        />
      </div>
      <div className="columns medium-8 right-section">
        <div className="right-section__group-header">
          <div>
            <div className="group-header__title">
              <Link to={article.path.alias} title={article.title}>
                <h3>{article.title}</h3>
              </Link>
            </div>
            <div className="group-header__add-to-wishlist">
              <AddToWishlistBtn articleID={article.drupal_internal__nid} />
            </div>
          </div>
        </div>
        <div className="right-section__group-body column row">
          <div className="columns medium-6 teaser-summary">
            <div
              className="group-body__text"
              dangerouslySetInnerHTML={{
                __html: getTextSummary(article.body.processed, 200),
              }}
            />
          </div>
          <div className="columns medium-6">
            <div className="group-body__lokacija paragraph-icon">
              <p>
                <FaMapMarkerAlt />
                {
                  article.relationships.field_content_main_info.relationships
                    .field_lokacija.name
                }
              </p>
            </div>
            {article.field_kapacitet && (
              <div className="group-body__kapacitet paragraph-icon">
                <p>
                  <FaUsers />
                  do {article.field_kapacitet} osoba
                </p>
              </div>
            )}
            {article.field_tekstualni_kapacitet && (
              <div className="group-body__kapacitet paragraph-icon">
                <p>
                  <FaUsers />
                  Kapacitet: {article.field_tekstualni_kapacitet}
                </p>
              </div>
            )}
            {article.field_parking && (
              <div className="group-body__parking paragraph-icon">
                <p>
                  <FaParking />
                  Dostupan parking
                </p>
              </div>
            )}
            {article.field_broj_clanova && (
              <div className="group-body__clanovi paragraph-icon">
                <p>
                  <FaUsers />
                  Do {article.field_broj_clanova} članova
                </p>
              </div>
            )}
            {article.field_razglas && (
              <div className="group-body__clanovi paragraph-icon">
                <p>
                  <MdSpeaker /> Cijena uključuje razglas
                </p>
              </div>
            )}

            {article.field_foto_usluge && (
              <div className="group-body__foto paragraph-icon">
                <p>
                  <FaCameraRetro /> Foto usluge
                </p>
              </div>
            )}

            {article.field_video_usluge && (
              <div className="group-body__video paragraph-icon">
                <p>
                  <FaVideo /> Video usluge
                </p>
              </div>
            )}

            <div className="saznaj-vise">
              <Link
                to={article.path.alias}
                title="saznaj više"
                className="saznaj-vise-btn"
              >
                Saznaj više
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleTeaser;
