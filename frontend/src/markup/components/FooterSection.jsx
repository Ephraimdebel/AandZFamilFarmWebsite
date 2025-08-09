import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaAngleRight,
} from 'react-icons/fa';
// import logo from '../../assets/template_asset/images/logo7-foot.png';
import logo from '../../assets/template_asset/images/logo7update.svg'

import underline from '../../assets/template_asset/images/wool/coffee_underline2.png';
import { useNavigate } from 'react-router-dom';

  


const FooterSection = () => {

  const navigate = useNavigate()

   const scrollToSection = (sectionId) => {
    // Navigate to home page with section anchor
    navigate(`/#${sectionId}`);
  };
  return (
  // <div className="index_v6">
  <div className="clv_footer_wrapper clv_section bg-gray-100 py-10">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap -mx-4">
        {/* Column 1: Contact Info & Social */}
        <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
          <div className="footer_block">
            <div className="footer_logo mb-4">
              <a href="#">
                <img src={logo} alt="logo" style={{ width: '120px' }} />
              </a>
            </div>
            <p className="mb-2"><span>📍</span> 16487 Fredrick RD Woodbine MD 21797</p>
            <p className="mb-2"><span>📞</span> +1 (240) 441 3923 </p>
            <p className="mb-2"><span>📞</span> +1 (202) 262 8200 </p>
            <p className="mb-4"><span>📧</span> cultivation@example.com</p>
            <ul className="agri_social_links flex space-x-4">
              <li><a href="#"><FaFacebookF /></a></li>
              <li><a href="#"><FaTwitter /></a></li>
              <li><a href="#"><FaLinkedinIn /></a></li>
              <li><a href="#"><FaYoutube /></a></li>
            </ul>
          </div>
        </div>

        {/* Column 2: Information Links */}
        <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
          <div className="footer_block">
            <div className="footer_heading mb-4">
              <h4>information</h4>
              <img src={underline} alt="underline" />
            </div>
            <ul className="useful_links space-y-2">
              <li><a href="/order" className="flex items-center"><FaAngleRight className="mr-2" /> Shop</a></li>
              <li><a onClick={() => scrollToSection('pricing')} className="flex items-center"><FaAngleRight className="mr-2" /> Our Range</a></li>
              <li><a onClick={() => scrollToSection('about')} className="flex items-center"><FaAngleRight className="mr-2" /> About Us</a></li>
              <li><a onClick={() => scrollToSection('services')} className="flex items-center"><FaAngleRight className="mr-2" /> Service</a></li>
              <li><a onClick={() => scrollToSection('gallery')} className="flex items-center"><FaAngleRight className="mr-2" /> Gallery</a></li>
            </ul>
          </div>
        </div>

        {/* Column 3: Categories */}
        <div className="w-full md:w-1/3 px-4">
          <div className="footer_block">
            <div className="footer_heading mb-4">
              <h4>categories</h4>
              <img src={underline} alt="underline" />
            </div>
            <ul className="useful_links space-y-2">
              <li><a href="#" className="flex items-center"><FaAngleRight className="mr-2" /> Lamb</a></li>
              <li><a href="#" className="flex items-center"><FaAngleRight className="mr-2" /> Goat</a></li>
              {/* <li><a href="#" className="flex items-center"><FaAngleRight className="mr-2" /> Dairy & Breakfast</a></li>
              <li><a href="#" className="flex items-center"><FaAngleRight className="mr-2" /> Soft Drinks</a></li>
              <li><a href="#" className="flex items-center"><FaAngleRight className="mr-2" /> Biscuits</a></li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  // </div>
);

};

export default FooterSection;
