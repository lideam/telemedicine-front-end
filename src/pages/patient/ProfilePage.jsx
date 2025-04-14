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

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleHealthInfoChange = (e) => {
    const { name, value } = e.target;
    setHealthInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Handle saving changes here (e.g., make API call)
    alert("Changes saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Patient Navigation */}
      <PatientNav /> {/* PatientNav component added here */}
      {/* Content Section */}
      <div className="pt-20">
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
                  name="name"
                  value={personalInfo.name}
                  onChange={handlePersonalInfoChange}
                  className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-gray-600">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={personalInfo.dob}
                  onChange={handlePersonalInfoChange}
                  className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-gray-600">Gender</label>
                <input
                  type="text"
                  name="gender"
                  value={personalInfo.gender}
                  onChange={handlePersonalInfoChange}
                  className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={personalInfo.email}
                  onChange={handlePersonalInfoChange}
                  className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-gray-600">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={personalInfo.phone}
                  onChange={handlePersonalInfoChange}
                  className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-gray-600">Address</label>
                <input
                  type="text"
                  name="address"
                  value={personalInfo.address}
                  onChange={handlePersonalInfoChange}
                  className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
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
                  name="medicalHistory"
                  value={healthInfo.medicalHistory}
                  onChange={handleHealthInfoChange}
                  className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-gray-600">
                  Current Medications
                </label>
                <textarea
                  name="currentMedications"
                  value={healthInfo.currentMedications}
                  onChange={handleHealthInfoChange}
                  className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-gray-600">Allergies</label>
                <textarea
                  name="allergies"
                  value={healthInfo.allergies}
                  onChange={handleHealthInfoChange}
                  className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-gray-600">
                  Family Medical History
                </label>
                <textarea
                  name="familyHistory"
                  value={healthInfo.familyHistory}
                  onChange={handleHealthInfoChange}
                  className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-gray-600">
                  Vaccination Records
                </label>
                <textarea
                  name="vaccinations"
                  value={healthInfo.vaccinations}
                  onChange={handleHealthInfoChange}
                  className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
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
