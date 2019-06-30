import React from "react";
import { graphql } from "gatsby";
import PageTitle from "../components/PageTitle";
import SimpleContactForm from "../components/ContactForm/SimpleContactForm";

import SocialMediaLinks from "../components/SocialMediaLinks";
import KontaktInfo from "../components/KontaktInfo";
import MainInfo from "../components/MainInfo";
import Slideshow from "../components/Slideshow";
import PaketiTabs from "../components/PaketiTabs";
import LeafletMap from "../components/LeafletMap";
import UslugeNavBar from "../components/UslugeNavBar";
import Breadcrumbs from "../components/Breadcrumbs";

import {
  FaInfoCircle,
  FaPhone,
  FaMapMarkerAlt,
  FaQuestionCircle,
  FaTelegramPlane,
} from "react-icons/fa";

export default ({ data }) => {
  const { nodeCatering: nodeContentType } = data;
  const navItems = [
    {
      icon: <FaInfoCircle />,
      label: "Info",
      linkId: "main-info",
    },
    {
      icon: <FaQuestionCircle />,
      label: "Detalji",
      linkId: "field-opis",
    },
    {
      icon: <FaPhone />,
      label: "Kontakt",
      linkId: "kontakt-info",
    },
    {
      icon: <FaMapMarkerAlt />,
      label: "Karta",
      linkId: "leaflet-wrapper",
    },
    {
      icon: <FaTelegramPlane />,
      label: "Pošalji upit",
      linkId: "contact-form",
    },
  ];
  const breadcrumbItems = [
    {
      label: "Svadbene večere",
      link: "/svadbene-vecere",
    },
    {
      label: "Catering",
      link: "/svadbene-vecere/catering",
    },
  ];
  return (
    <div className="usluge-wrapper">
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
              label={"Meni"}
              title="Preporučeni meniji"
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

export const query = graphql`
  query catering($nid: Int!) {
    nodeCatering(status: { eq: true }, drupal_internal__nid: { eq: $nid }) {
      title
      drupal_internal__nid
      body {
        processed
      }
      field_tekstualni_kapacitet
      field_adresa
      field_radno_vrijeme
      relationships {
        field_lokacija_na_mapi {
          field_latitude
          field_longitude
        }
        field_paketi {
          field_paket {
            processed
          }
        }
        field_drustvene_mreze {
          field_web {
            uri
          }
          field_facebook {
            uri
          }
          field_instagram {
            uri
          }
          field_youtube {
            uri
          }
        }
        field_posebna_ponuda {
          field_posebna_ponuda
          field_posebna_ponuda_opis
        }
        field_content_main_info {
          field_kontakt
          field_email
          relationships {
            field_lokacija {
              name
            }
            field_galerija {
              localFile {
                childImageSharp {
                  original: fluid(maxWidth: 800, maxHeight: 500) {
                    ...GatsbyImageSharpFluid
                  }
                  thumbnail: fluid(maxWidth: 250, maxHeight: 150) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
