import { useState } from "react";
import AdminNav from "../../components/layout/AdminNav";
import {
  Search,
  CheckCircle,
  XCircle,
  Eye,
  PlusCircle,
  FileDown,
} from "lucide-react";

const dummyPatients = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "0912345678",
    status: "Approved",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    phone: "0923456789",
    status: "Pending",
  },
  {
    id: 3,
    name: "Samuel Tesfaye",
    email: "samuel@example.com",
    phone: "0934567890",
    status: "Rejected",
  },
];

const ManagePatients = () => {
  const [patients, setPatients] = useState(dummyPatients);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showViewPatientModal, setShowViewPatientModal] = useState(false);
  const [patientToView, setPatientToView] = useState(null);
  const [newPatient, setNewPatient] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (id, newStatus) => {
    setPatients((prev) =>
      prev.map((patient) =>
        patient.id === id ? { ...patient, status: newStatus } : patient
      )
    );
  };

  const handleViewPatient = (patient) => {
    setPatientToView(patient);
    setShowViewPatientModal(true);
  };

  const handleAddPatient = () => {
    setPatients((prev) => [
      ...prev,
      { ...newPatient, id: prev.length + 1, status: "Pending" },
    ]);
    setNewPatient({
      name: "",
      email: "",
      phone: "",
    });
    setShowAddPatientModal(false);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminNav />
      <main className="flex-1 p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Manage Patients
            </h1>
            <p className="text-sm text-gray-500">
              Review, approve, or reject patient registrations
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              <FileDown size={18} /> Export
            </button>
            <button
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
              onClick={() => setShowAddPatientModal(true)}
            >
              <PlusCircle size={18} /> Add Patient
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200 mt-6">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr
                  key={patient.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium">{patient.name}</td>
                  <td className="px-6 py-4">{patient.email}</td>
                  <td className="px-6 py-4">{patient.phone}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        patient.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : patient.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center justify-center gap-4">
                    <button
                      className="text-green-600 hover:text-green-700"
                      onClick={() => handleStatusChange(patient.id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleStatusChange(patient.id, "Rejected")}
                    >
                      Reject
                    </button>
                    <button
                      className="text-blue-600 hover:text-blue-700"
                      onClick={() => handleViewPatient(patient)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {filteredPatients.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-gray-400 py-6">
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal for Add Patient */}
      {showAddPatientModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-xl w-1/3">
            <h3 className="text-xl font-bold mb-4">Add New Patient</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={newPatient.name}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, name: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                value={newPatient.email}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, email: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Phone"
                value={newPatient.phone}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, phone: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
                  onClick={() => setShowAddPatientModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                  onClick={handleAddPatient}
                >
                  Add Patient
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for View Patient */}
      {showViewPatientModal && patientToView && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-xl w-1/3">
            <h3 className="text-xl font-bold mb-4">Patient Profile</h3>
            <div className="space-y-4">
              <p>
                <strong>Name:</strong> {patientToView.name}
              </p>
              <p>
                <strong>Email:</strong> {patientToView.email}
              </p>
              <p>
                <strong>Phone:</strong> {patientToView.phone}
              </p>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
                  onClick={() => setShowViewPatientModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePatients;
