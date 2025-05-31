import { useState, useEffect } from "react";
import AdminNav from "../../components/layout/AdminNav";
import { Search, Eye, FileDown, X } from "lucide-react";
const API_BASE_URL = import.meta.env.VITE_API_URL;

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Fetch patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/api/user/role/patient`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch patients");
        const data = await response.json();
        const formattedPatients = data.map((p) => ({
          ...p,
          name: `${p.firstName} ${p.lastName}`,
        }));
        setPatients(formattedPatients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/api/user/role/doctor`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch doctors");
        const data = await response.json();
        const formattedDoctors = data.map((d) => ({
          ...d,
          name: `${d.firstName} ${d.lastName}`,
        }));
        setDoctors(formattedDoctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/api/appointment`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch appointments");
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  // Helpers to get names
  const getPatientName = (id) => {
    const patient = patients.find((p) => p._id === id);
    return patient ? patient.name : "Unknown Patient";
  };

  const getDoctorName = (id) => {
    const doctor = doctors.find((d) => d._id === id);
    return doctor ? doctor.name : "Unknown Doctor";
  };

  // Format only appointmentDate as YYYY-MM-DD
  const formatDateOnly = (dateStr) => {
    try {
      if (!dateStr) return "Invalid date";
      const dateObj = new Date(dateStr);
      return dateObj.toISOString().substring(0, 10);
    } catch {
      return "Invalid date";
    }
  };

  // Filter appointments by patient or doctor name
  const filteredAppointments = appointments.filter((appointment) => {
    const patientName = getPatientName(appointment.patientId);
    const doctorName = getDoctorName(appointment.doctorId);
    return (
      patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctorName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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
                  key={appointment._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium">
                    {getPatientName(appointment.patientId)}
                  </td>
                  <td className="px-6 py-4">
                    {getDoctorName(appointment.doctorId)}
                  </td>
                  <td className="px-6 py-4">
                    {formatDateOnly(appointment.appointmentDate)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        appointment.appointmentStatus === "accepted"
                          ? "bg-green-100 text-green-700"
                          : appointment.appointmentStatus === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {appointment.appointmentStatus.charAt(0).toUpperCase() +
                        appointment.appointmentStatus.slice(1)}
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
                {getPatientName(selectedAppointment.patientId)}
              </p>
              <p>
                <span className="font-semibold">Doctor:</span>{" "}
                {getDoctorName(selectedAppointment.doctorId)}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {formatDateOnly(selectedAppointment.appointmentDate)}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {selectedAppointment.appointmentStatus.charAt(0).toUpperCase() +
                  selectedAppointment.appointmentStatus.slice(1)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAppointments;
