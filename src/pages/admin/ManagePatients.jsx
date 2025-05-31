import { useState, useEffect } from "react";
import AdminNav from "../../components/layout/AdminNav";
import { Search, FileDown, PlusCircle } from "lucide-react";
const API_BASE_URL = import.meta.env.VITE_API_URL;

const ManagePatients = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [newPatient, setNewPatient] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [errors, setErrors] = useState({});

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

  const filteredPatients = patients.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!newPatient.email || !emailRegex.test(newPatient.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!newPatient.password || newPatient.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddPatient = async () => {
    if (!validate()) return;

    try {
      const patientToAdd = {
        ...newPatient,
        role: "patient",
      };

      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(patientToAdd),
      });

      if (!response.ok) throw new Error("Error adding patient");

      const data = await response.json();
      const addedPatient = {
        ...data,
        name: `${data.firstName} ${data.lastName}`,
      };

      setPatients((prev) => [...prev, addedPatient]);
      setNewPatient({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      setErrors({});
      setShowAddPatientModal(false);
    } catch (error) {
      console.error("Failed to add patient:", error);
      alert("Failed to add patient. Please try again.");
    }
  };

  const handleViewPatient = (id) => {
    const patient = patients.find((p) => p._id === id);
    setSelectedPatient(patient);
  };

  const handleCloseViewModal = () => {
    setSelectedPatient(null);
  };

  const handleDeletePatient = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/api/user/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete patient");

      setPatients((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("Failed to delete patient. Please try again.");
    }
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
              View and manage registered patients
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

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200 mt-6">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((p) => (
                <tr
                  key={p._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium">{p.name}</td>
                  <td className="px-6 py-4">{p.email}</td>
                  <td className="px-6 py-4 text-center space-x-3">
                    <button
                      className="text-blue-600 hover:text-blue-700"
                      onClick={() => handleViewPatient(p._id)}
                    >
                      View
                    </button>
                    <button
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDeletePatient(p._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredPatients.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center text-gray-400 py-6">
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {selectedPatient && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-white p-8 rounded-xl w-1/3 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Patient Details</h3>
            <div className="space-y-4">
              <p>
                <strong>Name:</strong> {selectedPatient.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedPatient.email}
              </p>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
                  onClick={handleCloseViewModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddPatientModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-white p-8 rounded-xl w-1/3 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Add New Patient</h3>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                placeholder="First Name"
                value={newPatient.firstName}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, firstName: e.target.value })
                }
              />
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                placeholder="Last Name"
                value={newPatient.lastName}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, lastName: e.target.value })
                }
              />
              <input
                type="email"
                className={`w-full p-2 border rounded-lg ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Email"
                value={newPatient.email}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, email: e.target.value })
                }
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email}</p>
              )}
              <input
                type="password"
                className={`w-full p-2 border rounded-lg ${
                  errors.password ? "border-red-500" : ""
                }`}
                placeholder="Password"
                value={newPatient.password}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, password: e.target.value })
                }
              />
              {errors.password && (
                <p className="text-red-600 text-sm">{errors.password}</p>
              )}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
                  onClick={() => {
                    setShowAddPatientModal(false);
                    setErrors({});
                  }}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
                  onClick={handleAddPatient}
                >
                  Add Patient
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
