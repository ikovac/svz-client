import React from "react";
import { graphql } from "gatsby";
import SEO from "../components/seo";

import Timeline from "../components/Timeline";
import Image from "../components/Image";
import FrontPageFilters from "../components/FrontPageFilters";

const IndexPage = ({ data }) => (
  <div className="front-page-wrapper">
    <SEO
      title="Portal za organizaciju vjenčanja"
      keywords={[
        "organizacija vjenčanja",
        "organizacija svadbi",
        "sve za vjenčanja",
        "sve za svadbe",
        "jednostavno",
        "besplatno",
        "sve na jednom mjestu",
      ]}
    />
    <div className="front-page__image-section">
      <Image
        source={data.placeholderImage.childImageSharp.fluid}
        alt={"Sve za vjenčanje"}
      />
      <h2>Organizirajte Vaše vjenčanje</h2>
      <h4>- Sudbonosno da u samo par koraka -</h4>
      <FrontPageFilters />
    </div>
    <Timeline />
  </div>
);

export default IndexPage;

export const query = graphql`
  query frontPageImage {
    placeholderImage: file(relativePath: { eq: "cover.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 3000, maxHeight: 700) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
