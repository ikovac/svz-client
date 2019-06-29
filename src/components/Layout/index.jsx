import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Transition from "../Transition";

import "../../styles/main.scss";
import "../../styles/hamburgers/hamburgers.scss";

const Layout = ({ children, location }) => {
  return (
    <>
      <Header />
      <Transition location={location}>{children}</Transition>
      <Footer />
    </>
  );
};

export default Layout;
