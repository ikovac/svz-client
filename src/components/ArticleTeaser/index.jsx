import React from "react";
import { Link } from "gatsby";
import getTextSummary from "../../utils/trimHtmlText";
import Slideshow from "../Slideshow";
import AddToWishlistBtn from "../AddToWishlistBtn";

import { FaMapMarkerAlt, FaUsers, FaParking } from "react-icons/fa";

const ArticleTeaser = ({ article }) => {
  return (
    <article className="article-teaser row">
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
              <a
                href={article.path.alias}
                title={article.title}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3>{article.title}</h3>
              </a>
            </div>
            <div className="group-header__add-to-wishlist">
              <AddToWishlistBtn articleID={article.drupal_internal__nid} />
            </div>
          </div>
        </div>
        <div className="right-section__group-body column row">
          <div className="columns medium-6 teaser-summary">
            <div className="group-body__text">
              {getTextSummary(article.body.processed, 200)}
            </div>
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
            {article.field_parking && (
              <div className="group-body__parking paragraph-icon">
                <p>
                  <FaParking />
                  Dostupan parking
                </p>
              </div>
            )}

            <div className="saznaj-vise">
              <a
                href={article.path.alias}
                title="saznaj više"
                className="saznaj-vise-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Saznaj više
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleTeaser;
