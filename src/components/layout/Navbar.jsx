import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-blue-600">
          TeleMedicine
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-lg">
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
            to="/contact"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Contact
          </Link>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            to="/signup"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            Get Started
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
            to="/signup"
            className="mt-3 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
            onClick={() => setIsOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
