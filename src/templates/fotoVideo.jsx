import React from "react";
import { graphql } from "gatsby";
import UslugeTemplate from "../components/UslugeTemplate";

import {
  FaInfoCircle,
  FaPhone,
  FaQuestionCircle,
  FaTelegramPlane,
} from "react-icons/fa";

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
