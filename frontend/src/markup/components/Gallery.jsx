// // components/Gallery.jsx

// import React ,{useEffect,useState} from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import im1 from "../../assets/template_asset/images/wool/org_underline2.png"
// import axios from 'axios'; // or use fetch
// import aboutus from "../../assets/template_asset/images/aboutus.png"


// const Gallery = () => {
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     const fetchGalleryImages = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/gallery'); // update with your actual endpoint
//         setImages(res.data);
//       } catch (err) {
//         console.error('Failed to fetch images', err);
//       }
//     };

//     fetchGalleryImages();
//   }, []);

//   // Split into chunks of 10 per slide
//   const chunkArray = (arr, size) =>
//     Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
//       arr.slice(i * size, i * size + size)
//     );

//   const slides = chunkArray(images, 10);

//   return (
//     <div id="gallery" className="dairy_gallery_wrapper clv_section cv-gallery7">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-lg-6 col-md-6">
//             <div className="clv_heading">
//               <h3>our gallery</h3>
//               <div className="clv_underline">
//                 <img src={im1} alt="underline" />
//               </div>
//               <p>
//                 Consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et
//                 dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="dairy_gallery_inner index_v3">
//         <div className="row">
//           <div className="col-md-12">
//             <div className="gallery_slider">
//               <div className="swiper-container">
//                 <div className="swiper-wrapper">
//                   {slides.map((slideImages, i) => (
//                     <div className="swiper-slide" key={i}>
//                       <div className="gallery_slide">
//                         <div className="gallery_grid">
//                           {slideImages.map((img, idx) => (
//                             <div className="gallery_grid_item" key={img.id || idx}>
//                               <div className="gallery_image">
//                                 <img src={img.thumbUrl} alt="gallery" />
//                                 <div className="gallery_overlay">
//                                   <a href={img.fullUrl} className="view_image">
//                                     <span>
//                                       <img
//                                         src="images/gallery_plus.png"
//                                         alt="plus"
//                                       />
//                                     </span>
//                                   </a>
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="swiper-pagination"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Gallery;

import React, { useEffect, useState } from "react";
import im1 from "../../assets/template_asset/images/wool/org_underline2.png";

const Gallery = (props) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const mockImages = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      url: `https://picsum.photos/400/300?random=${i + 1}`,
    }));
    setImages(mockImages);
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
              Consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation.
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

