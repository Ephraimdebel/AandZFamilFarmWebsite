import React from 'react'
import Navbar from '../components/Navbar'
import FooterSection from '../components/FooterSection'
import { Outlet } from 'react-router-dom';

const Layout = () => {

    const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div>
        <Navbar scrollToSection= {scrollToSection}/>
        <Outlet />
        <FooterSection />
    </div>
  )
}

export default Layout