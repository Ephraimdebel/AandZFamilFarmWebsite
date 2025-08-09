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
              <h4 className="text-lg font-medium mb-3">Discover How We Care for Our Sheep</h4>
              <h3 className="text-3xl font-bold mb-4">A & Z family farming</h3>
              <p className="text-base mb-6">
                From our farm to your table — the finest sheep and goats, carefully raised and handled with care.
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