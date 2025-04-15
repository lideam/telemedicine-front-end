import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";

import {
  Home,
  Calendar,
  MessageSquare,
  Users,
  Clock,
  DollarSign,
  UserCog,
  Bell,
  Star,
  HelpCircle,
  LogOut,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: <Home size={20} />, path: "/doctor-dashboard" },
  {
    name: "Appointments",
    icon: <Calendar size={20} />,
    path: "/doctor-appointments",
  },
  {
    name: "Chats",
    icon: <MessageSquare size={20} />,
    path: "/doctor-chats",
  },
  { name: "Patients", icon: <Users size={20} />, path: "/doctor/patients" },
  { name: "My Schedule", icon: <Clock size={20} />, path: "/doctor/schedule" },
  {
    name: "Payments",
    icon: <DollarSign size={20} />,
    path: "/doctor/payments",
  },
  { name: "Profile", icon: <UserCog size={20} />, path: "/doctor/profile" },
  {
    name: "Notifications",
    icon: <Bell size={20} />,
    path: "/doctor/notifications",
  },
  { name: "Reviews", icon: <Star size={20} />, path: "/doctor/reviews" },
  { name: "Support", icon: <HelpCircle size={20} />, path: "/doctor/support" },
];

const DoctorNav = () => {
  const location = useLocation();

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg p-4 pt-8 border-r border-gray-200">
      {/* <div className="text-2xl font-bold text-blue-600 mb-6 pl-4">
        Telemedicine
      </div> */}
      <div className="flex items-center space-x-4 mb-6">
        {/* Logo */}
        <Link
          to="/doctor-dashboard"
          className="text-2xl font-bold text-blue-600 flex items-center gap-4"
        >
          <img src={logo} alt="Logo" className="h-7 w-auto" />
          {/* Website Name */}
          TeleMedicine
        </Link>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 transition ${
              location.pathname === item.path
                ? "bg-blue-100 text-blue-700 font-medium"
                : "text-gray-700"
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-8 border-t pt-4">
        <button
          onClick={() => {
            // TODO: Add logout logic
          }}
          className="flex items-center gap-3 text-red-600 hover:text-red-700 transition px-3 py-2 rounded-lg"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default DoctorNav;
