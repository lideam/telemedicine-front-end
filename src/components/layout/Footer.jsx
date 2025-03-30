import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-3xl font-bold mb-4">TeleMedicine</h2>
          <p className="text-gray-400">
            Bringing healthcare closer to you, anytime, anywhere. Trusted by
            thousands.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-gray-400">
            <li>
              <a href="/" className="hover:text-blue-400">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-blue-400">
                About Us
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-blue-400">
                Services
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-400">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info & Socials */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-400">Email: support@telemedicine.com</p>
          <p className="text-gray-400">Phone: +251-123-456-789</p>

          {/* Social Media Links */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-blue-400">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400">
              <FaLinkedinIn size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} TeleMedicine. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
