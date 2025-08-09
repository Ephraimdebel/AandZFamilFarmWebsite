import React from 'react';
import underline from '../../assets/template_asset/images/wool/coffee_underline2.png';

import im4 from "../../assets/template_asset/images/guarantee_icon.png"
import im1 from "../../assets/template_asset/images/event_service.png"
import im2 from "../../assets/template_asset/images/farm_service.png"
import im3 from "../../assets/template_asset/images/garden_service3.png"

const products = [
  {
    title: "Reserve",
    image: im1,
    description: "We accept your order and prepare on your preferred date.",
    svgWidth: "70px",
    svgHeight: "70px",
    svgPath: "<path ... />"
  },
  {
    title: "Space",
    image: im2,
    description: "We provide a clean space for slaughtering and cutting meat.",
    svgWidth: "70px",
    svgHeight: "70px",
    svgPath: "<path ... />"
  },
  {
    title: "Peel the Skin",
    image: im3,
    description: "We have a proper area dedicated for peeling the skin easily.",
    svgWidth: "70px",
    svgHeight: "70px",
    svgPath: "<path ... />"
  },
  {
    title: "Guarantee",
    image: im4,
    description: "We guarantee your satisfaction with quality and service.",
    svgWidth: "70px",
    svgHeight: "70px",
    svgPath: "<path ... />"
  }
];


const ProductCard = ({ title, image, description, svgWidth, svgHeight, svgPath }) => (
  <div className="w-full md:w-1/4 px-2 mb-6">
    <div className="dairy_product_block">
      <div className="product_image">
        <img src={image} alt={title} width={svgWidth}
        height={svgHeight}/>
      </div>
      <div className="product_content text-center">
        <h4>{title}</h4>
        <p>{description}</p>
        <a href="#!">read more</a>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={svgWidth}
        height={svgHeight}
        dangerouslySetInnerHTML={{ __html: svgPath }}
      />
      <span className="product_devider top_devider"></span>
      <span className="product_devider"></span>
    </div>
  </div>
);

const ProductSection = (props) => (
  <div id={props.id} className="dairy_products_wrapper clv_section cv-product7">
    <div className="container mx-auto px-4">
      {/* Heading */}
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 text-center">
          <div className="clv_heading">
            <h3>our services</h3>
            <div className="clv_underline">
              <img src={underline} alt="underline" />
            </div>
            <p>
               We take orders for your chosen date, provide a clean space for slaughtering and cutting, offer an area for easy skin peeling, and guarantee quality service.
            </p>
          </div>
        </div>
      </div>

      {/* Product Cards */}
      <div className="dairy_product_inner mt-8">
        <div className="flex flex-wrap -mx-2">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </div>
  </div>
);


export default ProductSection;
