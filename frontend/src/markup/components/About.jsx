import React from 'react'
import im1 from '../../assets/template_asset/images/wool/org_underline2.png';
import aboutus from "../../assets/template_asset/images/aboutus.png"
const About = (props) => {
  return (
  <div id={props.id} className="org_about_wrapper clv_section">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap">
        {/* Left Column */}
        <div className="w-full md:w-1/2">
          <div className="org_about_contents">
            <h5>About Us</h5>
            <h2>Different sheep breeds and their characteristics</h2>
            <img src={im1} alt="image" />
            <p>
              Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut eni ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.
            </p>
            <a href="javascript:;" className="clv_btn mb-0">
              discover more
            </a>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/2">
          <div className="cv-about7-image">
            <img src={aboutus} alt="image" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

}

export default About