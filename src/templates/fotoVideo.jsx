import React from "react";
import { graphql } from "gatsby";
import PageTitle from "../components/PageTitle";
import SimpleContactForm from "../components/ContactForm/SimpleContactForm";

import SocialMediaLinks from "../components/SocialMediaLinks";
import KontaktInfo from "../components/KontaktInfo";
import MainInfo from "../components/MainInfo";
import Slideshow from "../components/Slideshow";
import PaketiTabs from "../components/PaketiTabs";
import UslugeNavBar from "../components/UslugeNavBar";

import SEO from "../components/seo";
import escapeHtml from "../utils/escapeHtml";

import {
  FaInfoCircle,
  FaPhone,
  FaQuestionCircle,
  FaTelegramPlane,
} from "react-icons/fa";
import Breadcrumbs from "../components/Breadcrumbs";

export default ({ data }) => {
  const { nodeFotoVideo: nodeContentType } = data;
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
      icon: <FaTelegramPlane />,
      label: "Pošalji upit",
      linkId: "contact-form",
    },
  ];
  const breadcrumbItems = [
    {
      label: "Foto & Video",
      link: "/foto-video/foto-video",
    },
  ];
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
              label={"Paket"}
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
  query fotoVideo($nid: Int!) {
    nodeFotoVideo(status: { eq: true }, drupal_internal__nid: { eq: $nid }) {
      title
      body {
        processed
      }
      path {
        alias
      }
      field_foto_usluge
      field_video_usluge
      drupal_internal__nid
      relationships {
        field_content_main_info {
          field_email
          field_kontakt
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
        field_drustvene_mreze {
          field_facebook {
            uri
          }
          field_instagram {
            uri
          }
          field_web {
            uri
          }
          field_youtube {
            uri
          }
        }
        field_paketi {
          field_paket {
            processed
          }
        }
        field_posebna_ponuda {
          field_posebna_ponuda
          field_posebna_ponuda_opis
        }
      }
    }
  }
`;
