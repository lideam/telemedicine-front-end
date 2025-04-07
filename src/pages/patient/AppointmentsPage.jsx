import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientNav from "../../components/layout/PatientNav"; // Import PatientNav
import { FaCalendarAlt, FaSearch, FaCheckCircle } from "react-icons/fa";

const AppointmentsPage = () => {
  const navigate = useNavigate();

  // Dummy data for doctors and appointments
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctorName: "Dr. John Smith",
      specialty: "Cardiologist",
      date: "2025-04-10",
      time: "10:00 AM",
      status: "Pending",
    },
    {
      id: 2,
      doctorName: "Dr. Emily Davis",
      specialty: "Dermatologist",
      date: "2025-04-12",
      time: "02:00 PM",
      status: "Confirmed",
    },
  ]);
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. John Smith", specialty: "Cardiologist" },
    { id: 2, name: "Dr. Emily Davis", specialty: "Dermatologist" },
    { id: 3, name: "Dr. Michael Brown", specialty: "Orthopedic" },
  ]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  // Handle new appointment request
  const handleRequestAppointment = () => {
    if (selectedDoctor && appointmentDate && appointmentTime) {
      const newAppointment = {
        id: appointments.length + 1,
        doctorName: selectedDoctor.name,
        specialty: selectedDoctor.specialty,
        date: appointmentDate,
        time: appointmentTime,
        status: "Pending",
      };
      setAppointments([...appointments, newAppointment]);
      alert("Appointment requested successfully!");
    } else {
      alert("Please fill in all the fields.");
    }
  };

  // Handle starting the consultation (Video call)
  const handleStartConsultation = (appointmentId) => {
    navigate(`/video-call/${appointmentId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Patient Navigation */}
      <PatientNav /> {/* PatientNav component added here */}
      <div className="pt-20">
        {/* Header Section */}
        <div className="bg-white shadow-lg p-6 mb-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>
            <p className="text-sm text-gray-500">
              View and manage your appointments
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-6 space-y-8">
          {/* Available Doctors Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Available Doctors
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-gray-50 p-4 rounded-lg shadow-md"
                >
                  <h4 className="text-lg font-semibold text-gray-800">
                    {doctor.name}
                  </h4>
                  <p className="text-gray-600">{doctor.specialty}</p>
                  <button
                    onClick={() => setSelectedDoctor(doctor)}
                    className="mt-4 text-blue-600 hover:text-blue-800"
                  >
                    Select {doctor.name}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule Appointment Section */}
          {selectedDoctor && (
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Schedule Appointment with {selectedDoctor.name}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600">Choose Date</label>
                  <input
                    type="date"
                    className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-600">Choose Time</label>
                  <input
                    type="time"
                    className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleRequestAppointment}
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 mt-4"
                >
                  Request Appointment
                </button>
              </div>
            </div>
          )}

          {/* My Appointments Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              My Appointments
            </h3>
            <div className="space-y-4">
              {appointments.length === 0 ? (
                <p className="text-gray-500">
                  You don't have any appointments yet.
                </p>
              ) : (
                appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="p-4 bg-gray-50 rounded-lg shadow-md"
                  >
                    <h4 className="text-lg font-semibold text-gray-800">
                      {appointment.doctorName} - {appointment.specialty}
                    </h4>
                    <p className="text-gray-600">
                      {appointment.date} at {appointment.time}
                    </p>
                    <p
                      className={`text-sm ${
                        appointment.status === "Confirmed"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {appointment.status === "Confirmed" ? (
                        <>
                          <FaCheckCircle className="inline mr-2" />
                          Confirmed
                          <button
                            onClick={() =>
                              handleStartConsultation(appointment.id)
                            }
                            className="ml-4 bg-blue-600 text-white py-1 px-4 rounded-lg hover:bg-blue-700"
                          >
                            Start Consultation
                          </button>
                        </>
                      ) : (
                        "Pending"
                      )}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;
