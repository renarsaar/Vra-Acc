import React from "react";

// Render images for Carousel
export function renderImages(images, adrs) {
  return images.map((image) => {
    return (
      <div key={adrs}>
        <img alt={adrs} src={image}></img>
      </div>
    );
  });
}
