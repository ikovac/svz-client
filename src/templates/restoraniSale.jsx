import React from "react";
import { graphql } from "gatsby";
import PageTitle from "../components/PageTitle";

import SocialMediaLinks from "../components/SocialMediaLinks";
import KontaktInfo from "../components/KontaktInfo";
import MainInfo from "../components/MainInfo";
import Slideshow from "../components/Slideshow";
import PaketiTabs from "../components/PaketiTabs";
import LeafletMap from "../components/LeafletMap";
import UslugeNavBar from "../components/UslugeNavBar";

import { FaInfo, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default ({ data }) => {
  const { nodeRestoraniSale } = data;
  const navItems = [
    {
      icon: <FaInfo />,
      label: "Info",
      linkId: "main-info",
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
  ];
  return (
    <div className="usluge-wrapper">
      <PageTitle>{nodeRestoraniSale.title}</PageTitle>

      <div className="usluge__content-wrapper">
        <UslugeNavBar
          articleID={nodeRestoraniSale.drupal_internal__nid}
          items={navItems}
        />
        <div className="slideshow-wrapper">
          <Slideshow
            gallery={
              nodeRestoraniSale.relationships.field_content_main_info
                .relationships.field_galerija
            }
            alt={nodeRestoraniSale.title}
            showThumbnails={true}
          />
        </div>
        <div id="main-info">
          <MainInfo content={nodeRestoraniSale} />
        </div>

        <div id="field-opis">
          <h3>Opis</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: nodeRestoraniSale.body.processed,
            }}
          />
        </div>

        <div id="field-paketi">
          <h3>Preporučeni meniji</h3>
          <PaketiTabs
            items={nodeRestoraniSale.relationships.field_paketi}
            label={"Meni"}
          />
        </div>

        <div id="kontakt-info">
          <h3>Kontakt Info</h3>

          {nodeRestoraniSale.relationships.field_content_main_info && (
            <KontaktInfo
              mainInfo={nodeRestoraniSale.relationships.field_content_main_info}
            />
          )}

          {nodeRestoraniSale.relationships.field_drustvene_mreze && (
            <SocialMediaLinks
              socialMedia={
                nodeRestoraniSale.relationships.field_drustvene_mreze
              }
            />
          )}
        </div>

        {nodeRestoraniSale.relationships.field_lokacija_na_mapi && (
          <div id="leaflet-wrapper">
            <LeafletMap
              lat={
                nodeRestoraniSale.relationships.field_lokacija_na_mapi
                  .field_latitude
              }
              lng={
                nodeRestoraniSale.relationships.field_lokacija_na_mapi
                  .field_longitude
              }
            >
              <h4>{nodeRestoraniSale.title}</h4>
              <p>{nodeRestoraniSale.field_adresa}</p>
            </LeafletMap>
          </div>
        )}
      </div>
    </div>
  );
};

export const query = graphql`
  query restoraniSale($nid: Int!) {
    nodeRestoraniSale(
      status: { eq: true }
      drupal_internal__nid: { eq: $nid }
    ) {
      title
      drupal_internal__nid
      field_parking
      body {
        processed
      }
      field_kapacitet
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
