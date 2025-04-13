import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/images/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <img src={logo} alt="Logo" className="h-7 w-auto" />

          {/* Website Name */}
          <Link to="/" className="text-3xl font-bold text-blue-600">
            TeleMedicine
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-5 text-lg">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            About
          </Link>
          <Link
            to="/services"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Services
          </Link>
          <Link
            to="/tips"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Tips
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Contact
          </Link>
        </div>

        {/* Authentication Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/patient-auth"
            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            Patient Login / Sign Up
          </Link>
          <Link
            to="/doctor-login"
            className="px-5 py-2 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition"
          >
            Doctor Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-full left-0 w-full flex flex-col items-center py-4">
          <Link
            to="/"
            className="py-2 text-gray-700 hover:text-blue-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="py-2 text-gray-700 hover:text-blue-600 transition"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/services"
            className="py-2 text-gray-700 hover:text-blue-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="py-2 text-gray-700 hover:text-blue-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/patient-auth"
            onClick={() => (window.location.href = "/patient-auth")}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-2xl shadow-md hover:bg-blue-600 transition-all duration-300"
          >
            Patient Login / Sign Up
          </Link>
          <Link
            to="/doctor-login"
            onClick={() => (window.location.href = "/doctor-login")}
            className="px-6 py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-2xl hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            Doctor Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
