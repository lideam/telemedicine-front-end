import { useState } from "react";
import DoctorNav from "../../components/layout/DoctorNav";
import {
  CalendarDays,
  Clock,
  Bell,
  BellOff,
  Download,
  Search,
} from "lucide-react";
import { FaCalendarCheck } from "react-icons/fa";

const appointments = [
  {
    id: 1,
    patientName: "Jane Doe",
    date: "2025-04-26",
    time: "10:00 AM",
    condition: "Follow-up - Flu",
    status: "Confirmed",
  },
  {
    id: 2,
    patientName: "Michael Smith",
    date: "2025-04-26",
    time: "2:00 PM",
    condition: "Chest pain consultation",
    status: "Pending",
  },
  {
    id: 3,
    patientName: "Sarah Johnson",
    date: "2025-04-27",
    time: "9:00 AM",
    condition: "Routine checkup",
    status: "Confirmed",
  },
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MySchedulePage = () => {
  const [availability, setAvailability] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [search, setSearch] = useState("");

  const filteredAppointments = appointments.filter((appt) =>
    appt.patientName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DoctorNav />
      <main className="flex-1 p-6 pt-0 space-y-6 ml-64 overflow-y-auto">
        {/* Header */}
        <section className="bg-white p-4 -ml-6 -mr-6 shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left: Icon + Title */}
          <div className="flex items-center gap-4">
            <FaCalendarCheck className="text-blue-600 text-3xl" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">My Schedule</h1>
              <p className="text-gray-600">
                Manage your availability and appointments
              </p>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Available:</label>
              <button
                onClick={() => setAvailability(!availability)}
                className={`px-3 py-1 text-sm rounded-full ${
                  availability
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {availability ? "Yes" : "No"}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Notify:</label>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className="text-blue-600 hover:text-blue-800"
              >
                {notificationsEnabled ? (
                  <Bell size={20} />
                ) : (
                  <BellOff size={20} />
                )}
              </button>
            </div>
            <div>
              <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded text-sm">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
        </section>

        {/* Weekly Calendar */}
        <section className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <CalendarDays size={20} />
            Weekly Calendar
          </h2>
          <div className="grid grid-cols-7 gap-4 text-center text-sm text-gray-700">
            {daysOfWeek.map((day, i) => (
              <div
                key={i}
                className="border p-2 rounded-lg bg-gray-50 shadow-sm"
              >
                <div className="font-semibold mb-2">{day}</div>
                {appointments
                  .filter((appt) => new Date(appt.date).getDay() === i)
                  .map((appt) => (
                    <div
                      key={appt.id}
                      className="bg-indigo-100 text-indigo-700 rounded px-2 py-1 mb-1 text-xs"
                    >
                      {appt.time} <br /> {appt.patientName}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Appointments */}
        <section className="bg-white p-4 rounded-xl shadow space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <Clock size={20} />
              Upcoming Appointments
            </h2>
            <div className="relative w-64">
              <Search
                className="absolute top-2.5 left-3 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search patient..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg w-full text-sm"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="py-3 px-4">Patient</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Condition</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appt) => (
                    <tr key={appt.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-800">
                        {appt.patientName}
                      </td>
                      <td className="py-3 px-4">{appt.date}</td>
                      <td className="py-3 px-4">{appt.time}</td>
                      <td className="py-3 px-4">{appt.condition}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            appt.status === "Confirmed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {appt.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500">
                      No appointments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MySchedulePage;
