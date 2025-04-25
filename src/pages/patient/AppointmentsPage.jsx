import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientNav from "../../components/layout/PatientNav";
import { FaCalendarAlt } from "react-icons/fa";

const AppointmentsPage = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [doctors] = useState([
    {
      id: 1,
      name: "Dr. John Smith",
      specialty: "Cardiologist",
      experience: "10 years",
      rating: 4.8,
      clinic: "Addis Heart Center",
      bio: "Experienced in treating cardiovascular diseases and performing diagnostic tests.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      amount: 300,
      availableSlots: [
        { date: "2025-04-20", time: "10:00 AM" },
        { date: "2025-04-21", time: "2:00 PM" },
      ],
    },
    {
      id: 2,
      name: "Dr. Emily Davis",
      specialty: "Dermatologist",
      experience: "8 years",
      rating: 4.6,
      clinic: "Skin Wellness Clinic",
      bio: "Specialist in skin treatments and cosmetic dermatology.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      amount: 250,
      availableSlots: [
        { date: "2025-04-22", time: "11:00 AM" },
        { date: "2025-04-23", time: "4:00 PM" },
      ],
    },
  ]);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingAppointment, setPendingAppointment] = useState(null);

  const handleRequestAppointment = () => {
    if (!selectedDoctor || !selectedSlot) {
      alert("Please select a doctor and an available time slot.");
      return;
    }

    const newAppointment = {
      id: appointments.length + 1,
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      date: selectedSlot.date,
      time: selectedSlot.time,
      amount: selectedDoctor.amount,
      status: "Pending", // Can later be updated to "Confirmed"
      paymentStatus: "Paid",
    };

    setPendingAppointment(newAppointment);
    setShowPaymentModal(true);
  };

  const handlePayment = () => {
    setAppointments([...appointments, pendingAppointment]);
    setPendingAppointment(null);
    setShowPaymentModal(false);
    setSelectedDoctor(null);
    setSelectedSlot(null);
    alert("Payment successful! Appointment confirmed.");
  };

  const handleReschedule = (appointmentId) => {
    const appointment = appointments.find((appt) => appt.id === appointmentId);

    if (
      appointment.paymentStatus === "Paid" &&
      appointment.status === "Declined"
    ) {
      setSelectedDoctor(
        doctors.find((doc) => doc.name === appointment.doctorName)
      );
      setSelectedSlot({ date: appointment.date, time: appointment.time });
      setShowPaymentModal(true);
    } else {
      alert("Appointment is not eligible for rescheduling.");
    }
  };

  const handleGoToChat = () => {
    navigate("/chats");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      <PatientNav />
      <main className="flex-1 p-6 pt-0 overflow-y-auto ml-64 space-y-6">
        {/* Available Doctors */}
        {/* <div className="bg-white p-6 rounded-lg shadow-md"> */}
        <section className="bg-white p-3 pl-6 -ml-6 -mr-6 shadow-lg flex items-center gap-5">
          <FaCalendarAlt className="text-blue-600 text-4xl" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Available Doctors
            </h1>
            <p className="text-gray-600 mt-1">
              Book an appointment with your preferred doctor
            </p>
          </div>
        </section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              onClick={() => {
                setSelectedDoctor(doctor);
                setSelectedSlot(null);
              }}
              className={`p-4 rounded-lg shadow-md cursor-pointer border transition-transform duration-200 ${
                selectedDoctor?.id === doctor.id
                  ? "bg-blue-100 border-blue-500 scale-105"
                  : "bg-white"
              }`}
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <h4 className="text-lg font-bold text-center">{doctor.name}</h4>
              <p className="text-center text-sm text-gray-600">
                {doctor.specialty}
              </p>
              <p className="text-center text-sm">
                Experience: {doctor.experience}
              </p>
              <p className="text-center text-sm">Clinic: {doctor.clinic}</p>
              <p className="text-center text-sm">Rating: ⭐ {doctor.rating}</p>
              <p className="text-center text-sm italic text-gray-500 mt-2">
                {doctor.bio}
              </p>
              <p className="text-center text-blue-600 font-semibold mt-2">
                Fee: {doctor.amount} ETB
              </p>
            </div>
          ))}
        </div>
        {/* </div> */}

        {/* Select Slot */}
        {selectedDoctor && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Choose Time with {selectedDoctor.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedDoctor.availableSlots.map((slot, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg cursor-pointer transition ${
                    selectedSlot?.date === slot.date &&
                    selectedSlot?.time === slot.time
                      ? "bg-blue-100 border-blue-500"
                      : "bg-white"
                  }`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  <p>
                    <strong>Date:</strong> {slot.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {slot.time}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={handleRequestAppointment}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Request Appointment
            </button>
          </div>
        )}

        {/* My Appointments */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            My Appointments
          </h3>
          {appointments.length === 0 ? (
            <p className="text-gray-500">No appointments yet.</p>
          ) : (
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-4 border rounded-lg mb-2 bg-gray-50"
              >
                <p>
                  <strong>Doctor:</strong> {appointment.doctorName}
                </p>
                <p>
                  <strong>Date:</strong> {appointment.date} |{" "}
                  <strong>Time:</strong> {appointment.time}
                </p>
                <p>
                  <strong>Fee:</strong> {appointment.amount} ETB
                </p>
                <p
                  className={`font-semibold ${
                    appointment.status === "Confirmed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  <strong>Status:</strong> {appointment.status}
                </p>

                {/* Conditionally active/inactive chat button */}
                <button
                  onClick={handleGoToChat}
                  disabled={appointment.status !== "Confirmed"}
                  className={`mt-2 px-6 py-2 rounded-lg text-white transition-all ${
                    appointment.status === "Confirmed"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Go to Chat
                </button>

                {appointment.status === "Declined" && (
                  <button
                    onClick={() => handleReschedule(appointment.id)}
                    className="mt-2 text-blue-600 underline block"
                  >
                    Reschedule Appointment (Payment Retained)
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {/* Payment Modal */}
        {showPaymentModal && pendingAppointment && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-24 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Payment Confirmation
              </h2>
              <div className="text-gray-700 mb-4">
                <p>
                  <strong>Doctor:</strong> {pendingAppointment.doctorName}
                </p>
                <p>
                  <strong>Date:</strong> {pendingAppointment.date}
                </p>
                <p>
                  <strong>Time:</strong> {pendingAppointment.time}
                </p>
                <p>
                  <strong>Amount:</strong>{" "}
                  <span className="text-green-600 font-bold">
                    {pendingAppointment.amount} ETB
                  </span>
                </p>
              </div>
              <button
                onClick={handlePayment}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Pay with Chapa
              </button>
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  setPendingAppointment(null);
                }}
                className="w-full mt-3 text-red-500 text-sm underline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AppointmentsPage;
