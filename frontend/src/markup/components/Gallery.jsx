
import React, { useEffect, useState } from "react";
import im1 from "../../assets/template_asset/images/wool/org_underline2.png";
import galleryImages from "../../assets/gallery/data.js"; // Assuming you have a data file for images
const Gallery = (props) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // const mockImages = Array.from({ length: 12 }, (_, i) => ({
    //   id: i + 1,
    //   url: `https://picsum.photos/400/300?random=${i + 1}`,
    // }));
    setImages(galleryImages);
  }, []);

  return (
  <div id={props.id} className="bg-[#FAFCF8] py-16">
    <div className="container mx-auto px-4">
      {/* Heading */}
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 text-center">
          <div className="clv_heading">
            <h3>our gallery</h3>
            <div className="clv_underline">
              <img src={im1} alt="underline" />
            </div>
            <p>
              Explore images of our facility, healthy animals, and the clean, professional process we follow for cutting and preparation.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Masonry Grid */}
    <div className="px-4 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 mt-10">
      {images.map((img) => (
        <div key={img.id} className="overflow-hidden rounded-lg">
          <img
            src={img.url}
            alt="Gallery"
            className="w-full mb-4 rounded-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  </div>
);

};

export default Gallery;

