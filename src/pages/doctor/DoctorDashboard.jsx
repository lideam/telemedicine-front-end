import { useState } from "react";
import DoctorNav from "../../components/layout/DoctorNav";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";

import {
  CalendarDays,
  UserPlus,
  MessageCircle,
  Clock,
  DollarSign,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const statCards = [
  {
    title: "Today's Appointments",
    value: 8,
    icon: <CalendarDays className="text-blue-600" size={28} />,
    bg: "bg-blue-50",
  },
  {
    title: "New Patients",
    value: 5,
    icon: <UserPlus className="text-green-600" size={28} />,
    bg: "bg-green-50",
  },
  {
    title: "Messages",
    value: 12,
    icon: <MessageCircle className="text-purple-600" size={28} />,
    bg: "bg-purple-50",
  },
  {
    title: "Pending Schedule",
    value: 3,
    icon: <Clock className="text-yellow-600" size={28} />,
    bg: "bg-yellow-50",
  },
];

const statsData = [
  { day: "Mon", earnings: 300, patients: 10, appointments: 2 },
  { day: "Tue", earnings: 500, patients: 12, appointments: 4 },
  { day: "Wed", earnings: 400, patients: 8, appointments: 3 },
  { day: "Thu", earnings: 600, patients: 15, appointments: 5 },
  { day: "Fri", earnings: 700, patients: 20, appointments: 6 },
  { day: "Sat", earnings: 200, patients: 5, appointments: 2 },
  { day: "Sun", earnings: 650, patients: 18, appointments: 7 },
];

const DoctorDashboard = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <DoctorNav />

      {/* Main Content */}
      <main className="flex-1 p-6 pt-0 overflow-y-auto space-y-6">
        {/* Welcome Section */}
        <section className="bg-white p-3 pl-6 -ml-6 -mr-6 shadow-lg flex items-center gap-5">
          <img
            src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Doctor"
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-600"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome, Dr. John
            </h1>
            <p className="text-gray-600 mt-1">
              Here is your dashboard summary for today.
            </p>
          </div>
        </section>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl shadow-sm border ${card.bg} flex items-center justify-between`}
            >
              <div>
                <p className="text-gray-600 text-sm">{card.title}</p>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {card.value}
                </h2>
              </div>
              <div>{card.icon}</div>
            </div>
          ))}
        </div>

        {/* Bar Graphs */}
        <div className="bg-white rounded-xl shadow p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Earnings Bar Chart */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Earnings
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={statsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="earnings" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Patients Bar Chart */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Patients
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={statsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="patients" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Appointments Bar Chart */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Appointments
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={statsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="appointments" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Appointments + Calendar */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Appointments Table */}
          <div className="bg-white rounded-xl shadow p-6 flex-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Upcoming Appointments
              </h2>
              <Link
                to="/doctor/doctor-appointments"
                className="text-sm text-blue-600 hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-600">
                <thead>
                  <tr className="text-gray-500 border-b">
                    <th className="py-3 px-4">Patient</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Time</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      patient: "Jane Doe",
                      date: "Apr 16, 2025",
                      time: "10:00 AM",
                      status: "Confirmed",
                    },
                    {
                      patient: "Michael Smith",
                      date: "Apr 16, 2025",
                      time: "11:30 AM",
                      status: "Pending",
                    },
                    {
                      patient: "Sarah Johnson",
                      date: "Apr 16, 2025",
                      time: "1:00 PM",
                      status: "Cancelled",
                    },
                  ].map((appt, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="py-3 px-4">{appt.patient}</td>
                      <td className="py-3 px-4">{appt.date}</td>
                      <td className="py-3 px-4">{appt.time}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            appt.status === "Confirmed"
                              ? "bg-green-100 text-green-700"
                              : appt.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {appt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-white rounded-xl shadow p-4 w-full lg:w-[350px]">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Calendar
            </h2>
            <Calendar onChange={setDate} value={date} />
          </div>
        </div>

        {/* Earnings Summary */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Earnings</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">This Month</p>
              <h3 className="text-2xl font-bold text-gray-800">$2,450.00</h3>
            </div>
            <DollarSign size={32} className="text-green-600" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
