import React from "react";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slideshow = ({ children }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    // adaptiveHeight: true,
    lazyLoad: "progress",
    // fade: true,
    // cssEase: "linear",
  };
  return <Slider {...settings}>{children}</Slider>;
};

export default Slideshow;
