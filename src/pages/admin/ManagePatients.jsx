import { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "../../components/layout/AdminNav";
import { Search, PlusCircle, FileDown } from "lucide-react";

const ManagePatients = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showViewPatientModal, setShowViewPatientModal] = useState(false);
  const [patientToView, setPatientToView] = useState(null);
  const [newPatient, setNewPatient] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/patients");
      setPatients(response.data);
    } catch (error) {
      console.error("Failed to fetch patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleAddPatient = async () => {
    if (!newPatient.name || !newPatient.email || !newPatient.phone) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/patients",
        newPatient
      );
      setPatients((prev) => [...prev, response.data]);
      setNewPatient({ name: "", email: "", phone: "" });
      setShowAddPatientModal(false);
      setSearchTerm("");
    } catch (error) {
      alert("Failed to add patient: " + error.message);
      console.error("Failed to add patient:", error);
    }
  };

  const handleViewPatient = (patient) => {
    setPatientToView(patient);
    setShowViewPatientModal(true);
  };

  const handleDeletePatient = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/patients/${id}`);
      setPatients((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Failed to delete patient:", error);
      alert("Failed to delete patient.");
    }
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const closeModal = () => {
    setShowAddPatientModal(false);
    setShowViewPatientModal(false);
    setNewPatient({ name: "", email: "", phone: "" });
    setSearchTerm("");
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
              Review registered patient details
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
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr
                  key={patient._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium">{patient.name}</td>
                  <td className="px-6 py-4">{patient.email}</td>
                  <td className="px-6 py-4">{patient.phone}</td>
                  <td className="px-6 py-4 flex items-center justify-center gap-4">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleViewPatient(patient)}
                    >
                      View
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDeletePatient(patient._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredPatients.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-gray-400 py-6">
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Add Patient Modal */}
      {showAddPatientModal && (
        <div
          onClick={closeModal}
          className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm"
        >
          <div
            className="bg-white p-8 rounded-xl w-1/3 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
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
                  onClick={closeModal}
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

      {/* View Patient Modal */}
      {showViewPatientModal && patientToView && (
        <div
          onClick={closeModal}
          className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm"
        >
          <div
            className="bg-white p-8 rounded-xl w-1/3 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
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
                  onClick={closeModal}
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
