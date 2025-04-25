import { useState } from "react";
import { FaEnvelope, FaPhone, FaQuestionCircle, FaHeadset } from "react-icons/fa";
import PatientNav from "../../components/layout/PatientNav";

const SupportPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [faq] = useState([
    {
      question: "How can I reset my password?",
      answer: "You can reset your password by clicking on 'Forgot Password' on the login page.",
    },
    {
      question: "Where can I find my medical records?",
      answer: "Your medical records are available under the 'Health Records' section in the dashboard.",
    },
    {
      question: "How do I schedule an appointment?",
      answer: "To schedule an appointment, go to the 'Appointments' page and choose a time slot with your doctor.",
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
      <PatientNav />
      <main className="flex-1 p-6 pt-0 overflow-y-auto ml-64 space-y-6">
        {/* Header Section */}
        <section className="bg-white p-3 pl-6 -ml-6 -mr-6 shadow-lg flex items-center gap-5">
        <FaHeadset className="text-blue-600 text-4xl" /> 
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Support</h1>
          <p className="text-gray-600 mt-2">
            We're here to help! Please reach out with any questions or concerns.
          </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Contact Us</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-600" htmlFor="name">
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
                <label className="block text-gray-600" htmlFor="email">
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
            <div className="mb-4">
              <label className="block text-gray-600" htmlFor="message">
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
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit Support Request
            </button>
          </form>
        </section>

        {/* FAQ Section */}
        <section className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faq.map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="text-lg font-semibold text-gray-800">{item.question}</p>
                <p className="text-sm text-gray-600 mt-2">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Support Channels */}
        <section className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Support Channels</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-blue-600 text-xl" />
              <span className="text-gray-700">Email: support@example.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="text-blue-600 text-xl" />
              <span className="text-gray-700">Phone: +1 800 123 4567</span>
            </div>
            <div className="flex items-center gap-3">
              <FaQuestionCircle className="text-blue-600 text-xl" />
              <span className="text-gray-700">Live Chat: Available 24/7</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SupportPage;
