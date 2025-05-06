import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorNav from "../../components/layout/DoctorNav";
import { Dialog } from "@headlessui/react";
import { MessageSquareText, FileText } from "lucide-react";
import { FaUsers } from "react-icons/fa";

const patients = [
  {
    id: 1,
    name: "Jane Doe",
    gender: "Female",
    age: 29,
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    lastAppointment: "Apr 10, 2025",
    condition: "Flu symptoms",
    email: "jane.doe@example.com",
    phone: "+251912345678",
    address: "Addis Ababa, Ethiopia",
  },
  {
    id: 2,
    name: "Michael Smith",
    gender: "Male",
    age: 35,
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    lastAppointment: "Apr 1, 2025",
    condition: "Chest pain",
    email: "michael.smith@example.com",
    phone: "+251911234567",
    address: "Bahir Dar, Ethiopia",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    gender: "Female",
    age: 41,
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    lastAppointment: "Mar 25, 2025",
    condition: "Blood pressure check",
    email: "sarah.johnson@example.com",
    phone: "+251910123456",
    address: "Gondar, Ethiopia",
  },
];

const PatientsPage = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const navigate = useNavigate();

  const openPatientDetails = (patient) => {
    setSelectedPatient(patient);
    setOpenModal(true);
  };

  const closeModal = () => setOpenModal(false);

  const filteredPatients = patients.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchGender = genderFilter === "All" || p.gender === genderFilter;
    return matchSearch && matchGender;
  });

  return (
    <div className="flex min-h-screen bg-gray-50 relative overflow-hidden">
      <DoctorNav />

      <main className="flex-1 p-6 pt-0 overflow-y-auto ml-64 space-y-6">
        {/* Header */}
        <section className="bg-white p-3 pl-6 -ml-6 -mr-6 shadow-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left: Icon + Title */}
          <div className="flex items-center gap-4">
            <FaUsers className="text-blue-600 text-3xl" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Patients</h1>
              <p className="text-gray-600 mt-1">
                Manage and explore your patients
              </p>
            </div>
          </div>

          {/* Right: Search & Filter */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full md:w-60"
            />
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full md:w-auto"
            >
              <option value="All">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </section>

        {/* Patient Table */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="py-3 px-4">Photo</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Gender</th>
                  <th className="py-3 px-4">Age</th>
                  <th className="py-3 px-4">Last Appointment</th>
                  <th className="py-3 px-4">Condition</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <tr key={patient.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <img
                          src={patient.photo}
                          alt={patient.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-800">
                        {patient.name}
                      </td>
                      <td className="py-3 px-4">{patient.gender}</td>
                      <td className="py-3 px-4">{patient.age}</td>
                      <td className="py-3 px-4">{patient.lastAppointment}</td>
                      <td className="py-3 px-4">{patient.condition}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => openPatientDetails(patient)}
                          className="text-blue-600 hover:underline"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-gray-500">
                      No patients found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Patient Details Modal */}
      <Dialog
        open={openModal}
        onClose={closeModal}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="absolute inset-0 backdrop-blur-sm bg-black/10" />
        <Dialog.Panel className="relative bg-white p-6 rounded-xl w-full max-w-md z-10 shadow-2xl">
          {selectedPatient && (
            <>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={selectedPatient.photo}
                  alt={selectedPatient.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {selectedPatient.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedPatient.gender}, {selectedPatient.age} years
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-gray-700 text-sm">
                <p>
                  <strong>Email:</strong> {selectedPatient.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedPatient.phone}
                </p>
                <p>
                  <strong>Address:</strong> {selectedPatient.address}
                </p>
                <p>
                  <strong>Last Appointment:</strong>{" "}
                  {selectedPatient.lastAppointment}
                </p>
                <p>
                  <strong>Condition:</strong> {selectedPatient.condition}
                </p>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  onClick={() =>
                    navigate(`/doctor/history/${selectedPatient.id}`)
                  }
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                >
                  <FileText size={16} />
                  History
                </button>
                <button
                  onClick={() => navigate(`/doctor/chat/${selectedPatient.id}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                >
                  <MessageSquareText size={16} />
                  Chat
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
