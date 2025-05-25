import { useState, useEffect } from "react";
import AdminNav from "../../components/layout/AdminNav";
import { Search, FileDown, PlusCircle } from "lucide-react";

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/doctors");
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDoctor = async () => {
    try {
      const doctorToAdd = {
        firstName: newDoctor.firstName,
        lastName: newDoctor.lastName,
        email: newDoctor.email,
        password: newDoctor.password,
        role: "doctor",
      };

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(doctorToAdd),
      });

      if (!response.ok) throw new Error("Error adding doctor");

      const data = await response.json();
      setDoctors((prev) => [...prev, data]);

      setNewDoctor({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      setShowAddDoctorModal(false);
    } catch (error) {
      console.error("Failed to add doctor:", error);
      alert("Failed to add doctor. Please try again.");
    }
  };

  const handleViewDoctor = (id) => {
    const doctor = doctors.find((doc) => doc._id === id);
    setSelectedDoctor(doctor);
  };

  const handleCloseViewModal = () => {
    setSelectedDoctor(null);
  };

  const handleDeleteDoctor = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/doctors/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete doctor");

      setDoctors((prev) => prev.filter((doc) => doc._id !== id));
    } catch (error) {
      console.error("Error deleting doctor:", error);
      alert("Failed to delete doctor. Please try again.");
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminNav />
      <main className="flex-1 p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Doctors</h1>
            <p className="text-sm text-gray-500">
              View and manage registered doctors
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              <FileDown size={18} /> Export
            </button>
            <button
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
              onClick={() => setShowAddDoctorModal(true)}
            >
              <PlusCircle size={18} /> Add Doctor
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or specialty..."
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
                <th className="px-6 py-4">Specialty</th>
                <th className="px-6 py-4">Clinic</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doc) => (
                <tr
                  key={doc._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium">{doc.name}</td>
                  <td className="px-6 py-4">{doc.specialty}</td>
                  <td className="px-6 py-4">{doc.clinic}</td>
                  <td className="px-6 py-4">
                    <div>{doc.email}</div>
                    <div className="text-sm text-gray-500">{doc.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-center space-x-3">
                    <button
                      className="text-blue-600 hover:text-blue-700"
                      onClick={() => handleViewDoctor(doc._id)}
                    >
                      View
                    </button>
                    <button
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteDoctor(doc._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredDoctors.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-gray-400 py-6">
                    No doctors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* View Doctor Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-white p-8 rounded-xl w-1/3 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Doctor Details</h3>
            <div className="space-y-4">
              <p>
                <strong>Name:</strong> {selectedDoctor.name}
              </p>
              <p>
                <strong>Specialty:</strong> {selectedDoctor.specialty}
              </p>
              <p>
                <strong>Clinic:</strong> {selectedDoctor.clinic}
              </p>
              <p>
                <strong>Email:</strong> {selectedDoctor.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedDoctor.phone}
              </p>
              {selectedDoctor.bio && (
                <p>
                  <strong>Bio:</strong> {selectedDoctor.bio}
                </p>
              )}
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

      {/* Add Doctor Modal */}
      {showAddDoctorModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-white p-8 rounded-xl w-1/3 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Add New Doctor</h3>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                placeholder="First Name"
                value={newDoctor.firstName}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, firstName: e.target.value })
                }
              />
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                placeholder="Last Name"
                value={newDoctor.lastName}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, lastName: e.target.value })
                }
              />
              <input
                type="email"
                className="w-full p-2 border rounded-lg"
                placeholder="Email"
                value={newDoctor.email}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, email: e.target.value })
                }
              />
              <input
                type="password"
                className="w-full p-2 border rounded-lg"
                placeholder="Password"
                value={newDoctor.password}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, password: e.target.value })
                }
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
                  onClick={() => setShowAddDoctorModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
                  onClick={handleAddDoctor}
                >
                  Add Doctor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDoctors;
