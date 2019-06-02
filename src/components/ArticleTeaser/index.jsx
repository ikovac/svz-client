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
            <div className="group-body__text">
              {getTextSummary(article.body.processed)}
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
                  {article.field_kapacitet}
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
