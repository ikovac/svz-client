import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Transition from "../Transition";

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
