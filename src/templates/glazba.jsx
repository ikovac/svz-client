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
import Breadcrumbs from "../components/Breadcrumbs";
import PosebnaPonuda from "../components/Blocks/PosebnaPonuda";

import SEO from "../components/seo";
import escapeHtml from "../utils/escapeHtml";

import {
  FaInfoCircle,
  FaPhone,
  FaQuestionCircle,
  FaTelegramPlane,
} from "react-icons/fa";

export default ({ data }) => {
  const { nodeGlazba: nodeContentType } = data;
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
      label: "Glazba",
      link: "/glazba",
    },
    nodeContentType.relationships.field_vrsta_glazbe.name === "dj"
      ? {
          label: "DJ",
          link: "/glazba/dj",
        }
      : {
          label: "Bendovi",
          link: "/glazba/bendovi",
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
  query glazba($nid: Int!) {
    nodeGlazba(status: { eq: true }, drupal_internal__nid: { eq: $nid }) {
      title
      field_razglas
      field_broj_clanova
      body {
        processed
      }
      path {
        alias
      }
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
        field_vrsta_glazbe {
          name
        }
      }
    }
  }
`;
