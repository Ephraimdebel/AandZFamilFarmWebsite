import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import person from "../../assets/template_asset/images/person.jpg"
import im1 from '../../assets/template_asset/images/wool/org_underline2.png';
import TestimonialCard from './TestimonialCard';

const fallbackTestimonials = [
  {
  name: "John Berg",
  title: "Farm Specialist",
  message: "The quality of the sheep and goats here is unmatched. Every order is prepared on time, and the care they take shows in every detail.",
  image: person
},
{
  name: "Alison Emma",
  title: "Farm Specialist",
  message: "I’ve never seen such well-kept animals and clean facilities. The service is friendly, professional, and truly reliable.",
  image: person
},
{
  name: "Michael Reed",
  title: "Local Customer",
  message: "From placing my order to picking it up, the process was smooth and easy. The meat was fresh, and the quality exceeded my expectations.",
  image: person
}

];

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // const res = await axios.get('http://localhost:5000/api/testimonials');
        setTestimonials(fallbackTestimonials);
      } catch (err) {
        console.error('Failed to fetch testimonials:', err);
      }
    };

    fetchTestimonials();
  }, []);

 return (
  <div id="testimonial" className="org_testimonial_wrapper clv_section">
    <div className="container mx-auto px-4">
      {/* Heading */}
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 text-center">
          <div className="clv_heading">
            <h3>we crafted it for you</h3>
            <div className="clv_underline">
              <img src={im1} alt="underline" />
            </div>
            <p>
                  Hear from our happy clients who trust us for quality, care, and craftsmanship in every service we provide.

            </p>
          </div>
        </div>
      </div>

      {/* Testimonial Slider */}
      <div className="flex justify-center mt-10">
        <div className="w-full md:w-10/12">
          <div className="org_testimonial_slider">
            <Swiper
              spaceBetween={30}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              loop={true}
              modules={[Autoplay]}
              className="swiper-container"
            >
              {testimonials.map((item, index) => (
                <SwiperSlide key={index} className="swiper-slide">
                  <TestimonialCard {...item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  </div>
);

};

export default TestimonialSection;
