import { useState } from "react";
import AdminNav from "../../components/layout/AdminNav";
import { Search, Eye, FileDown, X } from "lucide-react";

const dummyAppointments = [
  {
    id: 1,
    patientName: "John Doe",
    doctorName: "Dr. Hana Alemu",
    date: "2025-04-26 10:00 AM",
    status: "Pending",
    reason: "Regular checkup",
  },
  {
    id: 2,
    patientName: "Jane Smith",
    doctorName: "Dr. Meles Teshome",
    date: "2025-04-27 2:00 PM",
    status: "Confirmed",
    reason: "Skin rash consultation",
  },
  {
    id: 3,
    patientName: "Sara Kassa",
    doctorName: "Dr. Sara Kebede",
    date: "2025-04-28 3:30 PM",
    status: "Rejected",
    reason: "Child vaccination follow-up",
  },
];

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState(dummyAppointments);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex bg-gray-50 min-h-screen relative">
      <AdminNav />
      <main className="flex-1 p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Manage Appointments
            </h1>
            <p className="text-sm text-gray-500">
              Review all patient appointments and their statuses.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <FileDown size={18} /> Export
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by patient or doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Patient Name</th>
                <th className="px-6 py-4">Doctor</th>
                <th className="px-6 py-4">Appointment Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium">
                    {appointment.patientName}
                  </td>
                  <td className="px-6 py-4">{appointment.doctorName}</td>
                  <td className="px-6 py-4">{appointment.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        appointment.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : appointment.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center justify-center gap-2">
                    <button
                      className="text-blue-600 hover:text-blue-700"
                      onClick={() => setSelectedAppointment(appointment)}
                    >
                      <Eye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredAppointments.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-gray-400 py-6">
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-white/30">
          <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md z-50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                Appointment Details
              </h2>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setSelectedAppointment(null)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Patient:</span>{" "}
                {selectedAppointment.patientName}
              </p>
              <p>
                <span className="font-semibold">Doctor:</span>{" "}
                {selectedAppointment.doctorName}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {selectedAppointment.date}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {selectedAppointment.status}
              </p>
              <p>
                <span className="font-semibold">Reason:</span>{" "}
                {selectedAppointment.reason}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAppointments;
