import { useState } from "react"; 
import { motion } from "framer-motion";
import { FaStar, FaEdit, FaTrash } from "react-icons/fa";
import { useEffect } from "react";
import PatientNav from "../../components/layout/PatientNav";

// Mock data for doctors rated by the current patient
const ratedDoctorsByPatient = [
  {
    id: 1,
    name: "Dr. Alice Morgan",
    specialty: "Cardiologist",
    rating: 4,
    comment: "Very attentive and helpful.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Dr. John Doe",
    specialty: "Dermatologist",
    rating: 5,
    comment: "Great experience. Listened carefully.",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
];

// Mock data for doctors rated by other patients
const ratedDoctorsByOthers = [
  {
    id: 3,
    name: "Dr. Sarah Lee",
    specialty: "Pediatrician",
    rating: 4.5,
    comment: "Amazing with kids!",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 4,
    name: "Dr. James Bond",
    specialty: "Orthopedic",
    rating: 4,
    comment: "Great knowledge and care.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
];

const DoctorReviews = () => {
  const [reviews, setReviews] = useState(ratedDoctorsByPatient);
  const [newReview, setNewReview] = useState({
    doctor: "",
    rating: 0,
    comment: "",
    image: "",
  });
  const [editingReview, setEditingReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBackgroundBlurred, setIsBackgroundBlurred] = useState(false);

  const handleRating = (stars) => {
    setNewReview((prev) => ({ ...prev, rating: stars }));
  };

  const submitReview = () => {
    if (newReview.rating > 0 && newReview.comment) {
      if (editingReview) {
        setReviews(
          reviews.map((review) =>
            review.id === editingReview.id
              ? { ...review, rating: newReview.rating, comment: newReview.comment }
              : review
          )
        );
        setEditingReview(null);
      }
      setNewReview({ doctor: "", rating: 0, comment: "", image: "" });
      closeModal();
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setNewReview({ doctor: review.name, rating: review.rating, comment: review.comment, image: review.image });
    setIsModalOpen(true);
    setIsBackgroundBlurred(true);
  };

  const handleDelete = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingReview(null);
    setNewReview({ doctor: "", rating: 0, comment: "", image: "" });
    setIsBackgroundBlurred(false);
  };

  return (
    <div className="relative">
      {/* Background blur overlay */}
      {isBackgroundBlurred && (
        <div className="fixed inset-0 z-30 backdrop-blur-sm bg-black/30"></div>
      )}
      <PatientNav />
      <div className={`flex min-h-screen bg-gray-50 ${isBackgroundBlurred ? "blur-sm pointer-events-none select-none" : ""}`}>
        <main className="flex-1 p-6 pt-0 overflow-y-auto ml-64 space-y-6">
          <section className="bg-white p-3 pl-6 -ml-6 -mr-6 shadow-lg flex items-center gap-5">
          <FaStar className="text-blue-600 text-4xl" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Your Doctor Reviews</h1>
              <p className="text-gray-600 mt-1">Manage and update your reviews</p>
            </div>
          </section>

          <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Rated by You</h3>
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((r) => (
                  <div key={r.id} className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
                    <img
                      src={r.image}
                      alt={r.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{r.name}</h3>
                      <p className="text-sm text-gray-600">{r.specialty}</p>
                      <div className="flex mb-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <FaStar
                            key={i}
                            className={`h-5 w-5 ${i <= r.rating ? "text-yellow-400" : "text-gray-400"}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-700">{r.comment}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(r)}
                        className="flex items-center text-sm px-3 py-1.5 text-white bg-blue-500 hover:bg-blue-600 rounded-full shadow-sm transition"
                      >
                        <FaEdit className="mr-1 text-xs" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="flex items-center text-sm px-3 py-1.5 text-white bg-red-500 hover:bg-red-600 rounded-full shadow-sm transition"
                      >
                        <FaTrash className="mr-1 text-xs" /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Rated Doctors</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {ratedDoctorsByOthers.map((doctor) => (
                <div key={doctor.id} className="bg-white p-4 rounded-lg shadow">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full object-cover mb-4"
                  />
                  <h4 className="font-bold text-lg">{doctor.name}</h4>
                  <p className="text-sm text-gray-600">{doctor.specialty}</p>
                  <div className="flex mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <FaStar
                        key={i}
                        className={`h-5 w-5 ${i <= doctor.rating ? "text-yellow-400" : "text-gray-400"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700">{doctor.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 z-50">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Edit Your Review</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={newReview.image}
                  alt={newReview.doctor}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <input
                  type="text"
                  value={newReview.doctor}
                  readOnly
                  className="w-full p-2 border rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                />
              </div>
              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <FaStar
                    key={i}
                    className={`h-6 w-6 cursor-pointer ${i <= newReview.rating ? "text-yellow-400" : "text-gray-400"}`}
                    onClick={() => handleRating(i)}
                  />
                ))}
              </div>
              <textarea
                placeholder="Your feedback"
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="w-full p-2 border rounded-lg bg-gray-50 mb-4"
              />
              <div className="flex justify-between">
                <button
                  onClick={submitReview}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Update Review
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorReviews;
