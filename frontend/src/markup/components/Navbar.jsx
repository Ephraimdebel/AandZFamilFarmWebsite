import React, { useState } from 'react';
import logo7 from '../../assets/template_asset/images/logo7update.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { HiOutlineMenu, HiX } from 'react-icons/hi';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = ({ scrollToSection }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const userRole = user?.role;
  const isLoggedIn = !!user;
  const navigator = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    if (logout) logout();
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  return (
   <div className="sticky top-0 z-[1000] bg-white shadow-md">
  <div className="w-full container mx-auto px-4">
    <div className="flex items-center justify-between py-1">
      {/* Left: Logo */}
      <div className="cursor-pointer" onClick={() => navigator('/')}>
        <img src={logo7} alt="Cultivation" className="w-[110px]" />
      </div>

      {/* Center: Empty Space */}
      <div className="flex-1"></div>

      {/* Right: Nav + Profile */}
      <div className="hidden md:flex items-center gap-8">
        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <a onClick={() => scrollToSection('home')} className="cursor-pointer hover:text-[#07adb1]">
            Home
          </a>
          <a onClick={() => scrollToSection('about')} className="cursor-pointer hover:text-[#07adb1]">
            About Us
          </a>
          <a onClick={() => scrollToSection('services')} className="cursor-pointer hover:text-[#07adb1]">
            Service
          </a>
          <a onClick={() => scrollToSection('gallery')} className="cursor-pointer hover:text-[#07adb1]">
            Gallery
          </a>
          <Link to="/order" className="hover:text-[#07adb1]">
            Order Now
          </Link>
        </nav>

        {/* Profile or Sign In */}
        <div>
          {isLoggedIn ? (
            <div className="relative">
              <FaUserCircle size={32} className="cursor-pointer" onClick={toggleDropdown} />
              {dropdownOpen && (
                <div className="absolute top-10 right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-3 w-40 z-[999]">
                  <ul>
                    {userRole === 'admin' && (
                      <li className="py-2">
                        <Link to="/admin" onClick={() => setDropdownOpen(false)}>
                          Admin Dashboard
                        </Link>
                      </li>
                    )}
                    <li className="py-2">
                      <a onClick={handleLogout} className="cursor-pointer">
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-5 py-3 bg-[#07adb1] text-white rounded-full font-bold no-underline"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="focus:outline-none">
          {menuOpen ? <HiX size={30} /> : <HiOutlineMenu size={30} />}
        </button>
      </div>
    </div>

    {/* Mobile Menu */}
    {menuOpen && (
      <div className="md:hidden bg-white shadow-lg rounded-lg p-5 mt-2">
        <nav className="flex flex-col gap-4">
          <a onClick={() => { scrollToSection('home'); setMenuOpen(false); }} className="cursor-pointer">
            Home
          </a>
          <a onClick={() => { scrollToSection('about'); setMenuOpen(false); }} className="cursor-pointer">
            About Us
          </a>
          <a onClick={() => { scrollToSection('services'); setMenuOpen(false); }} className="cursor-pointer">
            Service
          </a>
          <a onClick={() => { scrollToSection('gallery'); setMenuOpen(false); }} className="cursor-pointer">
            Gallery
          </a>
          <Link to="/order" onClick={() => setMenuOpen(false)}>Order Now</Link>

          {isLoggedIn ? (
            <>
              {userRole === 'admin' && (
                <Link to="/admin" onClick={() => setMenuOpen(false)}>
                  Admin Dashboard
                </Link>
              )}
              <a onClick={handleLogout} className="cursor-pointer">
                Logout
              </a>
            </>
          ) : (
            <Link
              to="/login"
              className="px-5 py-3 bg-[#07adb1] text-white rounded-full font-bold text-center"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    )}
  </div>
</div>

  );
};

export default Navbar;
