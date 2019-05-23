import React from "react";
import { graphql } from "gatsby";
import Container from "../components/Container";
import PageTitle from "../components/PageTitle";
import Slideshow from "../components/Slideshow";
import Image from "../components/Image";

import { FaMapMarkerAlt, FaUsers, FaMapSigns, FaParking } from "react-icons/fa";

export default ({ data }) => {
  const { nodeRestoraniSale } = data;
  return (
    <Container>
      <div className="usluge-wrapper">
        <PageTitle>{nodeRestoraniSale.title}</PageTitle>
        {/* <div className="slideshow-wrapper">
          <Slideshow>
            {nodeRestoraniSale.relationships.field_content_main_info.relationships.field_galerija.map(
              img => (
                <Image
                  key={img.localFile.childImageSharp.fluid.originalName}
                  source={img.localFile.childImageSharp.fluid}
                  alt={nodeRestoraniSale.title}
                />
              )
            )}
          </Slideshow>
        </div> */}
        <div className="main-info">
          <p>
            <FaMapMarkerAlt />
            {
              nodeRestoraniSale.relationships.field_content_main_info
                .relationships.field_lokacija.name
            }
          </p>
          <p>
            <FaUsers /> Kapacitet do {nodeRestoraniSale.field_kapacitet} osoba
          </p>
          <p>
            <FaMapSigns /> {nodeRestoraniSale.field_adresa}
          </p>
          {nodeRestoraniSale.field_parking && (
            <p>
              <FaParking /> Dostupan Parking
            </p>
          )}
        </div>

        <div className="field-opis">
          <h4>Opis</h4>
          <div
            dangerouslySetInnerHTML={{
              __html: nodeRestoraniSale.body.processed,
            }}
          />
        </div>

        <div className="kontakt-info">
            <h4>Kontakt Info</h4>
          <p>
            {
              nodeRestoraniSale.relationships.field_content_main_info
                .field_email
            }
          </p>
          {nodeRestoraniSale.relationships.field_content_main_info.field_kontakt.map(
            kontakt => (
              <p key={kontakt}>{kontakt}</p>
            )
          )}
        </div>
      </div>
    </Container>
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
                  fluid(maxWidth: 1000) {
                    ...GatsbyImageSharpFluid
                    originalName
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
