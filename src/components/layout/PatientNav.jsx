import { Link } from "react-router-dom";
import {
  FaUserAlt,
  FaCalendarAlt,
  FaEnvelope,
  FaDollarSign,
  FaFileMedical,
  FaHome, // Importing the Home Icon
} from "react-icons/fa"; // Updated import

const PatientNav = () => {
  return (
    <nav className="bg-white text-white p-4 shadow-md fixed w-full z-50">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo with Link to Dashboard */}
        <Link
          to="/patient-dashboard"
          className="text-2xl font-semibold text-blue-600"
        >
          Telemedicine
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 text-md">
          <Link
            to="/patient-dashboard"
            className="text-gray-700 hover:text-blue-600 flex items-center"
          >
            <FaHome className="mr-2" /> Home
          </Link>
          <Link
            to="/profile"
            className="text-gray-700 hover:text-blue-600 flex items-center"
          >
            <FaUserAlt className="mr-2" /> Profile
          </Link>
          <Link
            to="/appointments"
            className="text-gray-700 hover:text-blue-600 flex items-center"
          >
            <FaCalendarAlt className="mr-2" /> Appointments
          </Link>
          <Link
            to="/messages"
            className="text-gray-700 hover:text-blue-600 flex items-center"
          >
            <FaEnvelope className="mr-2" /> Messages
          </Link>
          <Link
            to="/billing"
            className="text-gray-700 hover:text-blue-600 flex items-center"
          >
            <FaDollarSign className="mr-2" /> Billing
          </Link>
          <Link
            to="/health-records"
            className="text-gray-700 hover:text-blue-600 flex items-center"
          >
            <FaFileMedical className="mr-2" /> Health Records
          </Link>
        </div>

        {/* Logout Button */}
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hidden md:block">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default PatientNav;
