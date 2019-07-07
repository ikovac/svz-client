import React from "react";
import PageTitle from "../PageTitle";
import SimpleContactForm from "../ContactForm/SimpleContactForm";

import SocialMediaLinks from "../SocialMediaLinks";
import KontaktInfo from "../KontaktInfo";
import MainInfo from "../MainInfo";
import Slideshow from "../Slideshow";
import PaketiTabs from "../PaketiTabs";
import LeafletMap from "../LeafletMap";
import UslugeNavBar from "../UslugeNavBar";
import Breadcrumbs from "../Breadcrumbs";
import PosebnaPonuda from "../Blocks/PosebnaPonuda";

import SEO from "../seo";

import escapeHtml from "../../utils/escapeHtml";
import { FaInfoCircle, FaPhone, FaQuestionCircle } from "react-icons/fa";

const UslugeTemplate = ({
  navItems,
  breadcrumbItems,
  nodeContentType,
  paketiTitle,
  paketiLabel,
}) => {
  return (
    <div className="usluge-wrapper">
      <SEO
        title={nodeContentType.title}
        description={escapeHtml(nodeContentType.body.processed)}
      />
      <Breadcrumbs items={breadcrumbItems} current={nodeContentType.title} />
      <PageTitle>{nodeContentType.title}</PageTitle>

      <div className="usluge__content-wrapper">
        <UslugeNavBar
          articleID={nodeContentType.drupal_internal__nid}
          items={navItems}
        />
        <div className="slideshow-wrapper">
          <Slideshow
            gallery={
              nodeContentType.relationships.field_content_main_info
                .relationships.field_galerija
            }
            alt={nodeContentType.title}
            showThumbnails={true}
            disableArrowKeys={false}
          />
        </div>
        <div id="main-info" className="usluge-section row">
          <span className="section-represent__icon">
            <FaInfoCircle />
          </span>
          <MainInfo content={nodeContentType} />
        </div>

        <div id="field-opis" className="usluge-section">
          <span className="section-represent__icon">
            <FaQuestionCircle />
          </span>

          {nodeContentType.relationships.field_posebna_ponuda && (
            <PosebnaPonuda
              field_pp={nodeContentType.relationships.field_posebna_ponuda}
            />
          )}
          <h3>Opis</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: nodeContentType.body.processed,
            }}
          />
        </div>

        {nodeContentType.relationships.field_paketi && (
          <div id="field-paketi" className="usluge-section">
            <PaketiTabs
              items={nodeContentType.relationships.field_paketi}
              label={paketiLabel}
              title={paketiTitle}
            />
          </div>
        )}

        <div id="kontakt-info" className="usluge-section">
          <span className="section-represent__icon">
            <FaPhone />
          </span>
          <h3>Kontakt Info</h3>

          {nodeContentType.relationships.field_content_main_info && (
            <KontaktInfo
              mainInfo={nodeContentType.relationships.field_content_main_info}
            />
          )}

          {nodeContentType.relationships.field_drustvene_mreze && (
            <SocialMediaLinks
              socialMedia={nodeContentType.relationships.field_drustvene_mreze}
            />
          )}
        </div>

        {nodeContentType.relationships.field_lokacija_na_mapi && (
          <div id="leaflet-wrapper" className="usluge-section">
            <LeafletMap
              lat={
                nodeContentType.relationships.field_lokacija_na_mapi
                  .field_latitude
              }
              lng={
                nodeContentType.relationships.field_lokacija_na_mapi
                  .field_longitude
              }
            >
              <h4>{nodeContentType.title}</h4>
              <p>{nodeContentType.field_adresa}</p>
            </LeafletMap>
          </div>
        )}

        <div id="contact-form" className="usluge-section">
          <h3>Kontaktiraj {nodeContentType.title}</h3>
          <SimpleContactForm
            to={
              nodeContentType.relationships.field_content_main_info.field_email
            }
          />
        </div>
      </div>
    </div>
  );
};

export default UslugeTemplate;
