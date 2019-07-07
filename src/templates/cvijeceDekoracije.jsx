import React from "react";
import { graphql } from "gatsby";
import UslugeTemplate from "../components/UslugeTemplate";

import {
  FaInfoCircle,
  FaPhone,
  FaMapMarkerAlt,
  FaQuestionCircle,
  FaTelegramPlane,
} from "react-icons/fa";

export default ({ data }) => {
  const { nodeCvijeceIDekoracije: nodeContentType } = data;
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
      label: "Cvijeće i dekoracije",
      link: "/cvijece-i-dekoracije/cvijece-i-dekoracije",
    },
  ];
  return (
    <UslugeTemplate
      breadcrumbItems={breadcrumbItems}
      navItems={navItems}
      nodeContentType={nodeContentType}
      paketiLabel="Paket"
      paketiTitle="Preporučeni paketi"
    />
  );
};

export const query = graphql`
  query cvijeceDekoracije($nid: Int!) {
    nodeCvijeceIDekoracije(
      status: { eq: true }
      drupal_internal__nid: { eq: $nid }
    ) {
      title
      drupal_internal__nid
      body {
        processed
      }
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
