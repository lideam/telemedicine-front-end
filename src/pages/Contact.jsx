import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="bg-gray-50 py-16 px-6">
        <div className="flex flex-col items-center bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 p-10 rounded-lg mb-12 shadow-lg text-whitemb-12">
          <h2 className="text-5xl font-bold text-white">Get in Touch</h2>
          <p className="text-xl text-white mt-4">
            Have questions? Need assistance? Reach out to us, and we'll be happy to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.form 
            className="bg-white p-8 rounded-lg shadow-lg space-y-6" 
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-3xl font-semibold text-gray-800">Send Us a Message</h3>
            <div>
              <label className="block text-gray-700 font-medium">Your Name</label>
              <input type="text" className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300" placeholder="Enter your name" required />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email Address</label>
              <input type="email" className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300" placeholder="Enter your email" required />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Message</label>
              <textarea className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300" rows="4" placeholder="Type your message..." required></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition cursor-pointer ">Send Message</button>
          </motion.form>

          {/* Contact Details */}
          <motion.div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white rounded-lg shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-3xl font-semibold mb-4">Contact Information</h3>
            <p className="text-lg mb-4">Reach out to us via phone, email, or visit our office.</p>
            <p className="text-lg"><strong>Phone:</strong> +1 (234) 567-890</p>
            <p className="text-lg"><strong>Email:</strong> support@telemedicine.com</p>
            <p className="text-lg"><strong>Address:</strong> 123 Health Street, Telemed City, TX</p>
            
            {/* Map */}
            <div className="mt-6">
              <iframe
                className="w-full h-64 rounded-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126699.77542602293!2d37.38404937651839!3d11.617801272232045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164c6c7fe1f3e98f%3A0x84c6a0a7da0d6bfc!2sPolytechnic%20College%2C%20Bahir%20Dar%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1682683926013!5m2!1sen!2sus"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
