import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DoctorNav from "../../components/layout/DoctorNav";
import { Dialog } from "@headlessui/react";
import { FaUsers } from "react-icons/fa";
const API_BASE_URL = import.meta.env.VITE_API_URL;

const PatientsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [patientsMap, setPatientsMap] = useState({}); // id -> full name
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const doctorId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Fetch appointments
  useEffect(() => {
    if (!doctorId || !token) return;

    const fetchAppointments = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/appointment/doctor/${doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch appointments");

        const data = await res.json();
        setAppointments(data);

        // Extract unique patient IDs
        const patientIds = [...new Set(data.map((appt) => appt.patientId))];

        // Fetch all patient details
        const fetchedMap = {};
        await Promise.all(
          patientIds.map(async (id) => {
            try {
              const userRes = await fetch(`${API_BASE_URL}/api/user/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              if (userRes.ok) {
                const user = await userRes.json();
                fetchedMap[id] = `${user.firstName} ${user.lastName}`;
              } else {
                fetchedMap[id] = "Unknown";
              }
            } catch {
              fetchedMap[id] = "Unknown";
            }
          })
        );

        setPatientsMap(fetchedMap);
      } catch (error) {
        console.error("Error fetching appointments or patients:", error);
      }
    };

    fetchAppointments();
  }, [doctorId, token]);

  const openDetails = (appt) => {
    setSelectedAppointment(appt);
    setOpenModal(true);
  };

  const closeModal = () => setOpenModal(false);

  const filteredAppointments = appointments.filter((appt) => {
    const fullName = patientsMap[appt.patientId] || "Unknown";
    return fullName.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="flex min-h-screen bg-gray-50 relative overflow-hidden">
      <DoctorNav />

      <main className="flex-1 p-6 pt-0 overflow-y-auto ml-64 space-y-6">
        {/* Header */}
        <section className="bg-white p-3 pl-6 -ml-6 -mr-6 shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <FaUsers className="text-blue-600 text-3xl" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Patients</h1>
              <p className="text-gray-600 mt-1">
                Manage and explore your patients
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by patient name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full md:w-60"
            />
          </div>
        </section>

        {/* Table */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="py-3 px-4">Patient Name</th>
                  <th className="py-3 px-4">Session Duration (min)</th>
                  <th className="py-3 px-4">Appointment Date</th>
                  <th className="py-3 px-4">Appointment Time</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appt) => (
                    <tr key={appt._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-800">
                        {patientsMap[appt.patientId] || "Unknown"}
                      </td>
                      <td className="py-3 px-4">{appt.sessionDuration}</td>
                      <td className="py-3 px-4">
                        {new Date(appt.appointmentDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">{appt.appointmentTime}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => openDetails(appt)}
                          className="text-blue-600 hover:underline"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500">
                      No patients found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal */}
      <Dialog
        open={openModal}
        onClose={closeModal}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="absolute inset-0 backdrop-blur-sm bg-black/10" />
        <Dialog.Panel className="relative bg-white p-6 rounded-xl w-full max-w-md z-10 shadow-2xl">
          {selectedAppointment && (
            <>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Appointment Details
              </h3>
              <div className="space-y-2 text-gray-700 text-sm">
                <p>
                  <strong>Appointment ID:</strong> {selectedAppointment._id}
                </p>
                <p>
                  <strong>Patient:</strong>{" "}
                  {patientsMap[selectedAppointment.patientId] || "Unknown"}
                </p>
                <p>
                  <strong>Doctor ID:</strong> {selectedAppointment.doctorId}
                </p>
                <p>
                  <strong>Title:</strong> {selectedAppointment.title}
                </p>
                <p>
                  <strong>Session Price:</strong> $
                  {selectedAppointment.sessionPrice}
                </p>
                <p>
                  <strong>Session Duration:</strong>{" "}
                  {selectedAppointment.sessionDuration} minutes
                </p>
                <p>
                  <strong>Appointment Date:</strong>{" "}
                  {new Date(
                    selectedAppointment.appointmentDate
                  ).toLocaleDateString()}
                </p>
                <p>
                  <strong>Appointment Time:</strong>{" "}
                  {selectedAppointment.appointmentTime}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {selectedAppointment.appointmentStatus}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(selectedAppointment.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Updated At:</strong>{" "}
                  {new Date(selectedAppointment.updatedAt).toLocaleString()}
                </p>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </>
          )}
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default PatientsPage;
