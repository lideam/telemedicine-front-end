import { useState } from "react";
import { FaCamera, FaSave, FaEdit, FaUserAlt } from "react-icons/fa";
import PatientNav from "../../components/layout/PatientNav"; // Import PatientNav

const ProfilePage = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    dob: "1990-05-14",
    gender: "Male",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main St, City, State, 12345",
  });

  const [healthInfo, setHealthInfo] = useState({
    medicalHistory: "Asthma, Hypertension",
    currentMedications: "Albuterol, Lisinopril",
    allergies: "Peanuts, Pollen",
    familyHistory: "Diabetes, Heart Disease",
    vaccinations: "Flu, COVID-19",
  });

  const [profilePic, setProfilePic] = useState(null);

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = () => {
    // Handle saving changes here
    alert("Changes saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Patient Navigation */}
      <PatientNav /> {/* PatientNav component added here */}
      {/* Content Section */}
      <div className="pt-20">
        {" "}
        {/* Adjust padding top to ensure content starts below the fixed nav */}
        {/* Header Section */}
        <div className="bg-white shadow-lg p-6 mb-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
            <p className="text-sm text-gray-500">
              Manage your personal and health information
            </p>
          </div>
        </div>
        {/* Profile Content */}
        <div className="max-w-6xl mx-auto p-6 space-y-8">
          {/* Profile Picture Section */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={profilePic || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-600"
              />
              <label
                htmlFor="profile-pic"
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer"
              >
                <FaCamera />
              </label>
              <input
                type="file"
                id="profile-pic"
                className="hidden"
                accept="image/*"
                onChange={handleProfilePicChange}
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {personalInfo.name}
              </h2>
              <p className="text-gray-500">{personalInfo.email}</p>
              <p className="text-gray-500">{personalInfo.phone}</p>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600">Full Name</label>
                <input
                  type="text"
                  value={personalInfo.name}
                  className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-600">Date of Birth</label>
                <input
                  type="date"
                  value={personalInfo.dob}
                  className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-600">Gender</label>
                <input
                  type="text"
                  value={personalInfo.gender}
                  className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-600">Email</label>
                <input
                  type="email"
                  value={personalInfo.email}
                  className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-600">Phone</label>
                <input
                  type="text"
                  value={personalInfo.phone}
                  className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
                  readOnly
                />
              </div>
              <div className="col-span-2">
                <label className="block text-gray-600">Address</label>
                <input
                  type="text"
                  value={personalInfo.address}
                  className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Health Information Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Health Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600">Medical History</label>
                <textarea
                  value={healthInfo.medicalHistory}
                  className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-600">
                  Current Medications
                </label>
                <textarea
                  value={healthInfo.currentMedications}
                  className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-600">Allergies</label>
                <textarea
                  value={healthInfo.allergies}
                  className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-600">
                  Family Medical History
                </label>
                <textarea
                  value={healthInfo.familyHistory}
                  className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-600">
                  Vaccination Records
                </label>
                <textarea
                  value={healthInfo.vaccinations}
                  className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Save Changes Section */}
          <div className="flex justify-end">
            <button
              onClick={handleSaveChanges}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
            >
              <FaSave className="mr-2 inline" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
