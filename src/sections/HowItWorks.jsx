import React from "react";
import illustration1 from "../assets/images/illustration1.svg"; // Make sure the path is correct
import illustration2 from "../assets/images/illustration2.svg"; // Make sure the path is correct
import illustration3 from "../assets/images/illustration3.svg"; // Make sure the path is correct
import illustration4 from "../assets/images/illustration4.svg"; // Make sure the path is correct
import illustration5 from "../assets/images/illustration5.svg"; // Make sure the path is correct
import illustration6 from "../assets/images/illustration5.svg"; // Make sure the path is correct

const HowItWorks = () => {
  const steps = [
    {
      title: "Create an Account",
      description:
        "Sign up as a patient or doctor to get started with TeleMedicine.",
      icon: illustration1,
    },
    {
      title: "Browse Doctors",
      description:
        "Choose a doctor from the available list based on your health needs.",
      icon: illustration2, // You can replace this with different icons for each step if needed
    },
    {
      title: "Book an Appointment",
      description:
        "Select an available time and make a payment to confirm your consultation.",
      icon: illustration3,
    },
    {
      title: "Consult with Doctor",
      description:
        "Enjoy your consultation with the doctor via video, chat, or voice.",
      icon: illustration4,
    },
    {
      title: "Follow Up",
      description:
        "If necessary, follow up with your doctor for additional guidance or advice.",
      icon: illustration5,
    },
    {
      title: "Receive Prescriptions",
      description:
        "Get prescriptions or health advice directly from your doctor after consultation.",
      icon: illustration6,
    },
  ];

  return (
    <section className="py-10 px-6 bg-gray-50">
      <div className="w-1/2 h-1 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 mx-auto my-20 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.4)]" />
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">How It Works</h2>
        <p className="text-xl text-gray-600 mt-4">
          A seamless and simple process to get your medical consultations.
        </p>
      </div>

      {/* Step Cards */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <img src={step.icon} alt={step.title} className="w-40 h-40 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800">
              {step.title}
            </h3>
            <p className="text-gray-600 text-center mt-2">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
