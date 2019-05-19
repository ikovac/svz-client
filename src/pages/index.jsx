import React from "react";
import { Link, graphql } from "gatsby";
import SEO from "../components/seo";
import Image from "../components/Image";

import "../styles/main.scss";
import Timeline from "../components/Timeline";

const IndexPage = ({ data }) => (
  <div className="front-page-wrapper">
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    {/* <Image
      source={data.placeholderImage.childImageSharp.fluid}
      alt="sve za vjencanje"
    /> */}
    <Timeline />
  </div>
);

export default IndexPage;

export const query = graphql`
  query frontPageImage {
    placeholderImage: file(relativePath: { eq: "cover.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
