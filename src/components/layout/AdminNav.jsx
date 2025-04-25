import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";

import {
  Home,
  UserCog,
  Users,
  Calendar,
  DollarSign,
  ShieldCheck,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: <Home size={20} />, path: "/admin-dashboard" },
  {
    name: "Manage Doctors",
    icon: <UserCog size={20} />,
    path: "/admin/manage-doctors",
  },
  {
    name: "Manage Patients",
    icon: <Users size={20} />,
    path: "/admin/manage-patients",
  },
  {
    name: "Appointments",
    icon: <Calendar size={20} />,
    path: "/admin/manage-appointments",
  },
  { name: "Earnings", icon: <DollarSign size={20} />, path: "/admin/earnings" },
  {
    name: "System Settings",
    icon: <Settings size={20} />,
    path: "/admin/settings",
  },
  {
    name: "Admin Access",
    icon: <ShieldCheck size={20} />,
    path: "/admin/access-control",
  },
  { name: "Support", icon: <HelpCircle size={20} />, path: "/admin/support" },
];

const AdminNav = () => {
  const location = useLocation();

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg p-4 pt-8 border-r border-gray-200">
      {/* Logo and Brand */}
      <div className="flex items-center space-x-4 mb-6">
        <Link
          to="/admin-dashboard"
          className="text-2xl font-bold text-blue-600 flex items-center gap-4"
        >
          <img src={logo} alt="Logo" className="h-7 w-auto" />
          TeleMedicine Admin
        </Link>
      </div>

      {/* Navigation Items */}
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

      {/* Logout */}
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

export default AdminNav;
