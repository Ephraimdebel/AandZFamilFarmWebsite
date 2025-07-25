import React from 'react'
import { Link } from 'react-router-dom'

const HeroBanner = (props) => {
 return (
  <div id={props.id}>
    <div className="cv-banner7">
      <div className="w-full">
        <div className="flex flex-wrap">
          <div className="w-full">
            <div className="cv-banner7-content text-center">
              <h4 className="text-lg font-medium mb-3">Discover the real wool farm</h4>
              <h3 className="text-3xl font-bold mb-4">Wool sheep farming</h3>
              <p className="text-base mb-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit sed doand eiusmod tempo incididunt ut labore.
              </p>
              <Link
                to="/order"
                className="clv_btn inline-block"
              >
                Reserve
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

}

export default HeroBanner