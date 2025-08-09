import React from "react";
import { FaDollarSign } from "react-icons/fa";
import underlineImg from "../../assets/template_asset/images/wool/org_underline2.png"; // update path as needed

const pricingPlans = [
  // {
  //   title: 'Small',
  //   price: 20,
  //   features: [
  //     'Providing a slaughtering space',
  //     'Facilitating a place to peel the skin',
  //     'Supplying a cutting machine',
  //     'to cut all meats and bones',
  //   ],
  // },
  {
    title: "Medium",
    price: 20,
    headerClass: "premium",
    features: [
      "Providing a slaughtering space",
      "Facilitating a place to peel the skin",
      "Supplying a cutting machine",
      "to cut all meats and bones",
    ],
  },
  {
    title: "Large",
    price: 20,
    headerClass: "ultimate",
    features: [
      "Providing a slaughtering space",
      "Facilitating a place to peel the skin",
      "Supplying a cutting machine",
      "to cut all meats and bones",
    ],
  },
];

const PricingSection = (props) => {
  return (
    <div id={props.id} className="garden_pricing_wrapper clv_section">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="flex justify-center">
          <div className="w-full md:w-1/2 text-center">
            <div className="clv_heading">
              <h3>pricing table</h3>
              <div className="clv_underline">
                <img src={underlineImg} alt="underline" />
              </div>
              <p>
                Our pricing is based on animal type and size, from medium to
                large, offering fair rates and quality you can trust.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="pricing_section mt-10">
          <div className="flex flex-wrap -mx-4">
            {pricingPlans.map((plan, idx) => (
              <div className="w-full md:w-1/2 px-4 mb-8" key={idx}>
                <div className="pricing_block">
                  <div className={`pricing_header ${plan.headerClass || ""}`}>
                    <h3>{plan.title}</h3>
                  </div>
                  <h1 className="flex items-center justify-center text-4xl font-bold my-4">
                    {/* <span className="mr-2"><FaDollarSign /></span> */}
                    {/* {plan.price} */}
                  </h1>
                  <ul className="mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="mb-2">
                        <p>{feature}</p>
                      </li>
                    ))}
                  </ul>
                  <a href="/order" className="inline-block text-center clv_btn">
                    purchase
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
