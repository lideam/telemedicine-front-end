import { useState } from "react";
import { Link } from "react-router-dom";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "John Doe",
      date: "2025-04-10",
      time: "10:30 AM",
      status: "Scheduled",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      date: "2025-04-12",
      time: "1:00 PM",
      status: "Scheduled",
    },
  ]);

  const [earnings, setEarnings] = useState({
    monthly: "$5,200",
    pending: "$1,000",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white p-4 shadow-md fixed w-full z-50">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Logo */}
          <div className="text-2xl font-semibold text-blue-600">
            Telemedicine
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6 text-lg">
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
            <Link
              to="/appointments"
              className="text-gray-700 hover:text-blue-600"
            >
              Appointments
            </Link>
            <Link to="/messages" className="text-gray-700 hover:text-blue-600">
              Messages
            </Link>
            <Link to="/patients" className="text-gray-700 hover:text-blue-600">
              Patients
            </Link>
            <Link to="/earnings" className="text-gray-700 hover:text-blue-600">
              Earnings
            </Link>
          </div>

          {/* Logout Button */}
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hidden md:block">
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 px-6 md:px-12 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, Dr. [Doctor Name]
          </h1>
          <p className="text-sm text-gray-500">
            Your doctor dashboard overview
          </p>
        </div>

        {/* Earnings Summary */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Earnings Overview
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-lg font-semibold text-blue-600">This Month</p>
              <p className="text-xl font-bold">{earnings.monthly}</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-blue-600">Pending</p>
              <p className="text-xl font-bold">{earnings.pending}</p>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Upcoming Appointments
          </h3>
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex justify-between items-center border-b pb-4 mb-4"
            >
              <div>
                <h4 className="text-lg font-bold text-gray-800">
                  {appointment.patientName}
                </h4>
                <p className="text-sm text-gray-500">
                  {appointment.date} at {appointment.time}
                </p>
              </div>
              <div>
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg"
                  onClick={() =>
                    alert(`Starting session with ${appointment.patientName}`)
                  }
                >
                  Start Session
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Messages Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Messages</h3>
          <div className="text-sm text-gray-500">You have no new messages.</div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
