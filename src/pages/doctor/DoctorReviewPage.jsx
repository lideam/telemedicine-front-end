import { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaReply, FaTrash, FaFlag } from "react-icons/fa";
import DoctorNav from "../../components/layout/DoctorNav";

const patientReviews = [
  {
    id: 1,
    name: "Betelhem Abrham",
    rating: 5,
    comment: "Dr. Mahider was extremely kind and explained everything clearly.",
    date: "April 25, 2025",
    appointmentType: "General Checkup",
    image: "",
  },
  {
    id: 2,
    name: "Eden Solomon",
    rating: 4,
    comment: "Good consultation, minor wait time.",
    date: "April 20, 2025",
    appointmentType: "Cardiology",
    image: "",
  },
];

const otherDoctors = [
  {
    id: 3,
    name: "Dr. Abebe Belete",
    specialty: "Neurologist",
    rating: 4.8,
    image: "",
  },
  {
    id: 4,
    name: "Dr. Samuel Belachew",
    specialty: "Endocrinologist",
    rating: 4.5,
    image: "",
  },
];

const DoctorReviews = () => {
  const handleReply = (id) => alert(`Reply to review ${id}`);
  const handleReport = (id) => alert(`Reported review ${id}`);

  return (
    <div className="relative">
      <DoctorNav />
      <div className="flex min-h-screen bg-gray-50">
        <main className="flex-1 p-6 pt-0 overflow-y-auto ml-64 space-y-8">
          {/* Hero Section */}
          <section className="bg-white p-3 pl-6 -ml-6 -mr-6 shadow-lg flex items-center gap-5">
            <FaStar className="text-blue-600 text-3xl" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Patient Reviews
              </h1>
              <p className="text-gray-600 mt-1">
                See how your patients feel about you
              </p>
            </div>
          </section>

          {/* Reviews List */}
          <section className="bg-white p-6 rounded-2xl shadow-md space-y-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Ratings from Your Patients
            </h2>
            {patientReviews.map((review) => (
              <motion.div
                key={review.id}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-50 p-5 rounded-xl shadow-sm flex flex-col md:flex-row gap-6"
              >
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800">
                      {review.name}
                    </h3>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                  <p className="text-sm text-blue-600">
                    {review.appointmentType}
                  </p>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <FaStar
                        key={i}
                        className={`h-5 w-5 ${
                          i <= review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm mt-2">{review.comment}</p>
                  <div className="flex gap-3 pt-3">
                    <button
                      onClick={() => handleReply(review.id)}
                      className="flex items-center gap-1 text-blue-600 text-sm hover:underline"
                    >
                      <FaReply className="text-xs" /> Reply
                    </button>
                    <button
                      onClick={() => handleReport(review.id)}
                      className="flex items-center gap-1 text-gray-500 text-sm hover:underline"
                    >
                      <FaFlag className="text-xs" /> Report
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </section>

          {/* Other Doctors Section */}
          <section className="bg-white p-6 rounded-2xl shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Other Top Rated Doctors
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {otherDoctors.map((doc) => (
                <motion.div
                  key={doc.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-50 p-4 rounded-xl shadow-sm flex flex-col items-center text-center"
                >
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-16 h-16 rounded-full object-cover mb-2"
                  />
                  <h4 className="font-bold text-gray-800">{doc.name}</h4>
                  <p className="text-sm text-gray-500">{doc.specialty}</p>
                  <div className="flex justify-center mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <FaStar
                        key={i}
                        className={`h-4 w-4 ${
                          i <= Math.round(doc.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default DoctorReviews;
