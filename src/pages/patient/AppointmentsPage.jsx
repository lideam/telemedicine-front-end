import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PatientNav from "../../components/layout/PatientNav";
import { FaCalendarAlt } from "react-icons/fa";

const AppointmentsPage = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [pendingAppointment, setPendingAppointment] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    fetch("http://localhost:5000/api/doctors/available")
      .then((res) => res.json())
      .then((data) => {
        const doctorsWithSlots = data.map((doctor) => {
          const availableSlots = doctor.availability.flatMap((day) =>
            (day.timeSlots || [])
              .filter((time) => time !== null)
              .map((time) => ({
                date: new Date(day.date).toISOString().split("T")[0],
                time,
              }))
          );
          return { ...doctor, availableSlots };
        });
        setDoctors(doctorsWithSlots);
      })
      .catch((error) => console.error("Error fetching doctors:", error));

    // 👇 Updated to include patientId in query
    fetch(`http://localhost:5000/api/appointments?patientId=${user._id}`)
      .then((res) => res.json())
      .then((data) => {
        setAppointments(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  const handleRequestAppointment = () => {
    if (!selectedDoctor || !selectedSlot) {
      alert("Please select a doctor and a time slot.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const newAppointment = {
      patientId: user._id, // or user.id depending on your structure
      doctorId: selectedDoctor._id,
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      date: selectedSlot.date,
      time: selectedSlot.time,
      amount: selectedDoctor.amount,
      status: "Pending",
      paymentStatus: "Pending",
    };

    fetch("http://localhost:5000/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAppointment),
    })
      .then((res) => res.json())
      .then((data) => {
        setAppointments([...appointments, data]);
        setSelectedDoctor(null);
        setSelectedSlot(null);
        alert("Appointment requested! Awaiting doctor confirmation.");
      })
      .catch((error) => {
        console.error("Error requesting appointment:", error);
        alert("Error requesting appointment.");
      });
  };

  const handlePaymentNow = (appointment) => {
    setPendingAppointment(appointment);
    setShowPaymentModal(true);
  };

  const handlePayment = () => {
    fetch(
      `http://localhost:5000/api/appointments/${pendingAppointment._id}/pay`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((updatedAppt) => {
        setAppointments(
          appointments.map((appt) =>
            appt._id === updatedAppt._id ? updatedAppt : appt
          )
        );
        setShowPaymentModal(false);
        setPendingAppointment(null);
        alert("Payment successful!");
      })
      .catch((error) => {
        console.error("Payment failed:", error);
        alert("Payment failed.");
      });
  };

  const handleReschedule = (appointmentId) => {
    const appointment = appointments.find((a) => a._id === appointmentId);
    if (
      appointment.status === "Declined" &&
      appointment.paymentStatus === "Paid"
    ) {
      setSelectedDoctor(
        doctors.find((doc) => doc.name === appointment.doctorName)
      );
      setSelectedSlot({ date: appointment.date, time: appointment.time });
      alert("Please choose a new time slot and request again.");
    }
  };

  const handleGoToChat = () => {
    navigate("/patient-chats");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      <PatientNav />
      <main className="flex-1 p-6 pt-0 overflow-y-auto ml-64 space-y-6">
        {/* Header */}
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

        {/* Doctor List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              onClick={() => {
                setSelectedDoctor(doctor);
                setSelectedSlot(null);
              }}
              className={`p-4 rounded-lg shadow-md cursor-pointer border transition-transform duration-200 ${
                selectedDoctor?._id === doctor._id
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

        {/* Time Slot Selection */}
        {selectedDoctor && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Choose Time with {selectedDoctor.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedDoctor.availableSlots?.map((slot, index) => (
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

        {/* Appointments List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            My Appointments
          </h3>
          {appointments.length === 0 ? (
            <p className="text-gray-500">No appointments yet.</p>
          ) : (
            appointments.map((appointment) => (
              <div
                key={appointment._id}
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
                <p
                  className={`font-semibold ${
                    appointment.paymentStatus === "Paid"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  <strong>Payment:</strong> {appointment.paymentStatus}
                </p>

                {/* Pay Now */}
                {appointment.status === "Confirmed" &&
                  appointment.paymentStatus === "Pending" && (
                    <button
                      onClick={() => handlePaymentNow(appointment)}
                      className="mt-2 px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Pay Now
                    </button>
                  )}

                {/* Chat Access */}
                {appointment.status === "Confirmed" &&
                  appointment.paymentStatus === "Paid" && (
                    <button
                      onClick={handleGoToChat}
                      className="mt-2 px-6 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700"
                    >
                      Go to Chat
                    </button>
                  )}

                {/* Reschedule */}
                {appointment.status === "Declined" &&
                  appointment.paymentStatus === "Paid" && (
                    <button
                      onClick={() => handleReschedule(appointment._id)}
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
                  <strong>Amount:</strong> {pendingAppointment.amount} ETB
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
