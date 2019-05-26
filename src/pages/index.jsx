import React from "react";
import { graphql } from "gatsby";
import SEO from "../components/seo";

import "../styles/main.scss";
import Timeline from "../components/Timeline";

const IndexPage = ({ data }) => (
  <div className="front-page-wrapper">
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
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
