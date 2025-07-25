import React, {useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import Service from '../components/Service';
import About from '../components/About';
import ProductSection from '../components/ProductSection';
import Gallery from '../components/Gallery';
import CounterSection from '../components/CounterSection';
import TestimonialSection from '../components/TestimonialSection';
import PricingSection from '../components/PricingPlans';
import FooterSection from '../components/FooterSection';

// import '../../assets/template_asset/css/bootstrap.min.css'
// import '../../assets/template_asset/css/navigation.css'
import '../../assets/template_asset/css/style.css'
// import '../../assets/template_asset/css/range.css'

// import '../../assets/template_asset/css/layers.css'
// import '../../assets/template_asset/css/settings.css'
// import '../../assets/template_asset/css/nice-select.css'

import '../../assets/template_asset/css/font.css'
// import '../../assets/template_asset/css/nice-select.css'

import '../../assets/template_asset/css/color/color7.css'

const Home = () => {
  // const sectionsRef = useRef({});
  const location = useLocation();

  // Scroll to section when hash changes
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Navbar scrollToSection={scrollToSection} />
      <HeroBanner id="home" />
      <Service id="service" />
      <About id="about" />
      <ProductSection id="services" />
      <Gallery id="gallery" />
      <CounterSection id="counter" />
      <TestimonialSection id="testimonials" />
      <PricingSection id="pricing" />
      <FooterSection />
    </div>
  );
};

export default Home;
