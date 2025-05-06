import { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaRegComments, FaHeadset } from "react-icons/fa";
import DoctorNav from "../../components/layout/DoctorNav";

const DoctorsSupportPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [faq] = useState([
    {
      question: "How do I update my availability schedule?",
      answer: "You can update your schedule by navigating to the 'Availability' section in your dashboard settings.",
    },
    {
      question: "How can I view patient appointment requests?",
      answer: "Go to the 'Appointments' tab where all incoming requests are listed with patient details.",
    },
    {
      question: "What should I do if I experience technical issues during a session?",
      answer: "Contact our technical support immediately via live chat or call our helpline for real-time assistance.",
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Your support request has been submitted!");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DoctorNav />
      <main className="flex-1 p-6 pt-0 overflow-y-auto ml-64 space-y-8">
        {/* Hero Section */}
      <section className="bg-white p-3 pl-6 -ml-6 -mr-6 shadow-lg flex items-center gap-5">
             <FaHeadset className="text-blue-600 text-3xl" /> 
             <div>
               <h1 className="text-2xl font-bold text-gray-800">Support</h1>
               <p className="text-gray-600 mt-2">
                 We're here to help! Please reach out with any questions or concerns.
               </p>
               </div>
             </section>

        {/* Quick Help Section */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            <FaEnvelope className="text-blue-600 text-3xl mb-4" />
            <h3 className="text-lg font-semibold text-gray-700">Email Support</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Reach out to us via email and get a response within 24 hours.
            </p>
            <p className="mt-4 text-blue-600 text-sm">support@example.com</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            <FaPhoneAlt className="text-blue-600 text-3xl mb-4" />
            <h3 className="text-lg font-semibold text-gray-700">Call Us</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Speak directly with a support specialist during business hours.
            </p>
            <p className="mt-4 text-blue-600 text-sm">+1 800 123 4567</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            <FaRegComments className="text-blue-600 text-3xl mb-4" />
            <h3 className="text-lg font-semibold text-gray-700">Live Chat</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Connect instantly with our 24/7 live chat team.
            </p>
            <p className="mt-4 text-blue-600 text-sm">Start a Chat</p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faq.map((item, index) => (
              <details key={index} className="group rounded-lg p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition">
                <summary className="flex justify-between items-center font-semibold text-gray-700">
                  {item.question}
                  <span className="transform group-open:rotate-180 transition-transform">⌄</span>
                </summary>
                <p className="mt-3 text-gray-600 text-sm">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Still Need Help?</h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 mb-1" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg bg-gray-50"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg bg-gray-50"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-600 mb-1" htmlFor="message">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg bg-gray-50"
                rows="5"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Submit Support Request
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default DoctorsSupportPage;
