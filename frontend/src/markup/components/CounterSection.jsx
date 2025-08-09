import React, { useEffect, useState } from 'react';
import im1 from "../../assets/template_asset/images/wool/org_underline2.png"
import im2 from "../../assets/template_asset/images/agri_counter_customer.png"
import im3 from "../../assets/template_asset/images/agri_counter_winner.png"
import im4 from "../../assets/template_asset/images/agri_counter_project.png"
import im5 from "../../assets/template_asset/images/agri_counter_branch.png"


const CounterSection = () => {
  
  // eslint-disable-next-line no-unused-vars
  const [counters, setCounters] = useState({
    customers: 50,
    projects: 100,
    branches: 1,
    awards: 0
  });

  useEffect(() => {
    const fetchCounters = async () => {
      try {
        // const res = await axios.get('http://localhost:5000/api/counters'); // Replace with your API
        // setCounters(res.data);
      } catch (err) {
        console.error('Failed to fetch counter data', err);
      }
    };

    fetchCounters();
  }, []);

  return (
  <div className="index_v2">
    <div className="clv_counter_wrapper clv_section">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="flex justify-center">
          <div className="w-full md:w-1/2 text-center">
            <div className="clv_heading">
              <h3>we are an expert in this field</h3>
              <div className="clv_underline">
                <img src={im1} alt="image" />
              </div>
              <p>
               With over 50 satisfied clients and more than 100 healthy animals, we bring trusted experience and quality service to every order.
              </p>
            </div>
          </div>
        </div>

        {/* Counter Section */}
        <div className="counter_section mt-10">
          <div className="flex flex-wrap -mx-2">
            {/* Counter Item 1 */}
            <div className="w-full md:w-1/4 px-2 mb-6">
              <div className="counter_block text-center">
                <div className="counter_img mb-4">
                  <span>
                    <img src={im2} alt="image" className="mx-auto" />
                  </span>
                </div>
                <div className="counter_text">
                  <h4 className="red_color text-2xl font-bold">
                    <span className="count_no">{(counters.customers).toFixed(0)}</span>
                    <span>+</span>
                  </h4>
                  <h5 className="text-gray-700">happy customers</h5>
                </div>
              </div>
            </div>

            {/* Counter Item 2 */}
            <div className="w-full md:w-1/4 px-2 mb-6">
              <div className="counter_block text-center">
                <div className="counter_img mb-4">
                  <span>
                    <img src={im4} alt="image" className="mx-auto" />
                  </span>
                </div>
                <div className="counter_text">
                  <h4 className="yellow_color text-2xl font-bold">
                    <span className="count_no">{counters.projects}</span>
                    <span>+</span>
                  </h4>
                  <h5 className="text-gray-700">Animal Sold</h5>
                </div>
              </div>
            </div>

            {/* Counter Item 3 */}
            <div className="w-full md:w-1/4 px-2 mb-6">
              <div className="counter_block text-center">
                <div className="counter_img mb-4">
                  <span>
                    <img src={im5} alt="image" className="mx-auto" />
                  </span>
                </div>
                <div className="counter_text">
                  <h4 className="orange_color text-2xl font-bold">
                    <span className="count_no">{counters.branches}</span>
                    {/* <span>+</span> */}
                  </h4>
                  <h5 className="text-gray-700">world wide branch</h5>
                </div>
              </div>
            </div>

            {/* Counter Item 4 */}
            <div className="w-full md:w-1/4 px-2 mb-6">
              <div className="counter_block text-center">
                <div className="counter_img mb-4">
                  <span>
                    <img src={im3} alt="image" className="mx-auto" />
                  </span>
                </div>
                <div className="counter_text">
                  <h4 className="blue_color text-2xl font-bold">
                    <span className="count_no">{(counters.awards / 1000).toFixed(0)}</span>
                    {/* <span>k+</span> */}
                  </h4>
                  <h5 className="text-gray-700">award winner</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

};

export default CounterSection;
