import React from 'react';
import { FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';
import im3 from "../../assets/template_asset/images/bg_quote2.png"

const TestimonialCard = ({ image, message, name, title }) => {
  return (
    <div  className="org_testimonial_slide">
      <div className="org_test_image">
        <img src={image} alt="testimonial" style={{
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      objectFit: 'cover',
    }}
/>
      </div>
      <div className="org_testimonial_message">
        <img src={im3} alt="quote" />
        <p>{message}</p>
        <h5>{name} <span>- {title}</span></h5>
      </div>
    </div>
  );
};

export default TestimonialCard;
