import React from "react";
import { graphql } from "gatsby";
import SEO from "../components/seo";

import "../styles/main.scss";
import Timeline from "../components/Timeline";
import Image from "../components/Image";

const IndexPage = ({ data }) => (
  <div className="front-page-wrapper">
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <div className="front-page__image-section">
      <Image
        source={data.placeholderImage.childImageSharp.fluid}
        alt={"Sve za vjenčanje"}
      />
      <h2>Sve za Vjenčanje</h2>
      <h3>Isplanirajte Vaše vjenčanje u samo par koraka</h3>
      <div className="front-page__form">
        <input type="date"/>
      </div>
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
