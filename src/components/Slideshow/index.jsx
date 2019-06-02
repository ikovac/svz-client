import React from "react";
import ImageGallery from "react-image-gallery";
import Image from "../Image";

import "react-image-gallery/styles/scss/image-gallery.scss";

const Slideshow = ({ gallery, alt, showThumbnails }) => {
  let images;
  if (showThumbnails) {
    images = gallery.map(slika => ({
      original: slika.localFile.childImageSharp.original,
      thumbnail: slika.localFile.childImageSharp.thumbnail,
    }));
  } else {
    images = gallery.map(slika => ({
      original: slika.localFile.childImageSharp.fluid,
    }));
  }

  const customRenderItem = item => {
    return (
      <div className="image-gallery-image">
        <Image source={item.original} alt={alt} />
      </div>
    );
  };

  const customRenderThumbnail = item => {
    return (
      <div className="image-gallery-thumbnail-inner">
        <Image source={item.thumbnail} alt={alt} />
      </div>
    );
  };

  return (
    <ImageGallery
      items={images}
      renderItem={customRenderItem}
      renderThumbInner={customRenderThumbnail}
      showThumbnails={showThumbnails}
      showPlayButton={false}
      showFullscreenButton={false}
      showBullets={true}
      showIndex={true}
      lazyLoad={true}
    />
  );
};

export default Slideshow;
