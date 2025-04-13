import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="py-16 px-6 bg-gray-50 text-gray-800">
        {/* Hero Section */}
        <div className="flex flex-col items-center bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 p-10 rounded-lg mb-12 shadow-lg text-white">
          <h2 className="text-5xl font-bold mb-4">Get to Know Us</h2>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            We are transforming the future of healthcare with technology. Our
            mission is to make medical care more accessible, reliable, and
            efficient—anytime, anywhere.
          </p>
        </div>

        {/* Company Introduction */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 py-16 px-4">
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">
              Who We Are
            </h3>
            <p className="text-lg text-gray-600">
              TeleMedicine is a pioneering digital healthcare platform dedicated
              to making quality healthcare accessible to everyone. By leveraging
              advanced technology, we bridge the gap between patients and
              healthcare professionals, ensuring seamless and secure
              consultations via video, audio, or chat. We believe that
              healthcare should be convenient, affordable, and available at the
              touch of a button.
            </p>
          </motion.div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://media.istockphoto.com/id/1012323872/photo/medical-insurance-concept-with-family-and-stethoscope-on-wooden-desk.webp?a=1&b=1&s=612x612&w=0&k=20&c=7ftUF0kPc5MXCH4efqWBWLF3bwve4mGbzNttPvX7AcU="
              alt="Healthcare"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="w-1/2 h-1 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 mx-auto my-10 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.4)]" />
        <div className="py-16 px-6 text-center bflex flex-col items-center p-6 bg-gray-50 rounded-lg mb-16">
          <div className="max-w-3xl mx-auto space-y-8">
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">
                Our Mission
              </h3>
              <p className="text-lg text-gray-600">
                To bridge the gap between healthcare providers and patients by
                utilizing innovative telemedicine solutions. We ensure that
                everyone, regardless of location, can receive expert medical
                advice.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">
                Our Vision
              </h3>
              <p className="text-lg text-gray-600">
                To create a future where healthcare is borderless, immediate,
                and affordable, enhancing lives through technology-driven
                medical services.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Core Values */}
        <div className="w-1/2 h-1 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 mx-auto my-10 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.4)]" />
        <div className="py-16 px-6 text-center flex flex-col items-center p-6 bg-gray-50 rounded-lg mb-16">
          <h3 className="text-4xl font-semibold text-black mb-8">
            Our Core Values
          </h3>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: "Reliability",
                text: "We ensure consistent and dependable healthcare services whenever you need them.",
              },
              {
                title: "Confidentiality",
                text: "Your medical data remains private with our secure encrypted platform.",
              },
              {
                title: "Innovation",
                text: "We leverage the latest technology to enhance healthcare accessibility.",
              },
              {
                title: "Patient-Centered Care",
                text: "We prioritize patient needs, providing personalized and compassionate service.",
              },
              {
                title: "Accessibility",
                text: "Healthcare should be available to everyone, no matter where they are.",
              },
              {
                title: "Quality Assurance",
                text: "We are committed to maintaining the highest standards of medical care.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="text-xl font-semibold text-gray-800 mb-4">
                  {value.title}
                </h4>
                <p className="text-lg text-gray-600">{value.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Meet the Team */}
        <div className="w-1/2 h-1 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 mx-auto my-10 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.4)]" />
        <div className="py-16 px-6 text-center mb-10">
          <h3 className="text-4xl font-semibold text-gray-800 mb-6">
            Meet Our Team
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Our experts are dedicated to providing high-quality virtual
            healthcare, ensuring you receive top-tier medical advice and
            support.
          </p>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 max-w-7xl mx-auto">
            {[
              {
                name: "Dr. John Doe",
                role: "Chief Medical Officer",
                img: "https://images.unsplash.com/photo-1602526210979-5f97b94b48f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
              },
              {
                name: "Dr. Jane Smith",
                role: "Mental Health Specialist",
                img: "https://images.unsplash.com/photo-1616766589040-89bc1b21519a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
              },
              {
                name: "Dr. Sarah Lee",
                role: "Pediatrician",
                img: "https://images.unsplash.com/photo-1595422183560-2efbf5a53e8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
              },
            ].map((team, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                whileHover={{ scale: 1.1 }}
              >
                <img
                  src={team.img}
                  alt={team.name}
                  className="w-32 h-32 rounded-full mx-auto shadow-lg"
                />
                <h4 className="text-xl font-semibold text-gray-800 mt-4">
                  {team.name}
                </h4>
                <p className="text-gray-600">{team.role}</p>
                <p className="text-gray-500 mt-4">
                  {team.role === "Chief Medical Officer"
                    ? "Bringing over 20 years of expertise in telemedicine innovation."
                    : team.role === "Mental Health Specialist"
                    ? "Dedicated to mental well-being, helping patients through online therapy."
                    : "Ensuring children receive the best medical attention through virtual care."}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutUs;
