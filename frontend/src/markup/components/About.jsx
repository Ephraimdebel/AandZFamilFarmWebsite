import React from "react";
import im1 from "../../assets/template_asset/images/wool/org_underline2.png";
import aboutus from "../../assets/template_asset/images/aboutus.png";
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
                Our sheep and goats are entirely grass-fed and raised in wide
                open pastures, allowing them to grow in a stress-free and
                natural environment. We follow traditional farming practices
                that focus on animal well-being, ensuring every breed develops
                its unique qualities to the fullest. This approach results in
                meat that is not only rich in flavor but also healthy and free
                from unnecessary chemicals.
              </p>
              <p>
                From the soft-fleeced Merino to the hardy Suffolk, each breed is
                selected and cared for with great attention. We monitor their
                diet, health, and living conditions daily, making sure they
                thrive year-round. When you choose from our farm, you are
                choosing freshness, sustainability, and a product that reflects
                our dedication to quality from start to finish.
              </p>
              <a href="javascript:;" className="clv_btn mb-0">
                Order Now
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
};

export default About;
