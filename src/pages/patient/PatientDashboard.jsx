import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaAppleAlt,
  FaRunning,
  FaTint,
  FaHeartbeat,
  FaSyringe,
  FaShieldAlt,
  FaMedkit,
} from "react-icons/fa";
import PatientNav from "../../components/layout/PatientNav"; // Import PatientNav

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctorName: "Dr. John Doe",
      specialty: "Cardiologist",
      date: "2025-04-10",
      time: "10:30 AM",
      status: "Scheduled", // Status can be 'Scheduled' or 'Completed'
    },
    {
      id: 2,
      doctorName: "Dr. Jane Smith",
      specialty: "Dermatologist",
      date: "2025-04-12",
      time: "1:00 PM",
      status: "Scheduled",
    },
  ]);

  const [healthStats, setHealthStats] = useState({
    weight: "70kg",
    bloodPressure: "120/80 mmHg",
    glucose: "95 mg/dL",
  });

  const healthTips = [
    {
      icon: <FaAppleAlt className="text-green-500 text-3xl" />,
      tip: "Eat more fruits and vegetables for a balanced diet.",
    },
    {
      icon: <FaRunning className="text-blue-500 text-3xl" />,
      tip: "Exercise for at least 30 minutes every day.",
    },
    {
      icon: <FaTint className="text-blue-400 text-3xl" />,
      tip: "Drink at least 8 glasses of water daily to stay hydrated.",
    },
    {
      icon: <FaHeartbeat className="text-red-500 text-3xl" />,
      tip: "Regular checkups help detect health issues early.",
    },
  ];

  // Function to check if the appointment time has passed or is imminent (e.g., within 15 minutes)
  const isAppointmentTimeNow = (appointmentTime) => {
    const appointmentDateTime = new Date(
      `${appointmentTime.date} ${appointmentTime.time}`
    );
    const currentDateTime = new Date();
    const timeDifference = appointmentDateTime - currentDateTime;

    return timeDifference <= 0; // Returns true if the appointment time has passed
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Patient Navigation */}
      <PatientNav /> {/* Include PatientNav component */}
      <div className="pt-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, John Doe
          </h1>
          <p className="text-sm text-gray-500">
            Your health dashboard at a glance
          </p>
        </div>

        {/* Health Overview */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Health Overview
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {Object.entries(healthStats).map(([key, value]) => (
              <div key={key} className="text-center bg-blue-50 p-4 rounded-lg">
                <p className="text-lg font-semibold text-blue-600">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </p>
                <p className="text-xl font-bold">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Upcoming Appointments
          </h3>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex justify-between items-center border-b pb-4 mb-4"
              >
                <div>
                  <h4 className="text-lg font-bold text-gray-800">
                    {appointment.doctorName}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {appointment.specialty}
                  </p>
                  <p className="text-sm text-gray-500">
                    {appointment.date} at {appointment.time}
                  </p>
                </div>
                {/* Display "Join Now" button only if the appointment is scheduled and the time is right */}
                {appointment.status === "Scheduled" &&
                  isAppointmentTimeNow(appointment) && (
                    <Link
                      to={`/video-call/${appointment.id}`}
                      className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                    >
                      Join Now
                    </Link>
                  )}
                {appointment.status === "Scheduled" &&
                  !isAppointmentTimeNow(appointment) && (
                    <p className="text-sm text-gray-500">
                      Your appointment is scheduled for {appointment.time}
                    </p>
                  )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No upcoming appointments.</p>
          )}
        </div>

        {/* Health Tips */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Health Tips
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {healthTips.map((tip, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-blue-50 p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                {tip.icon}
                <p className="text-center text-gray-700 mt-2">{tip.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
