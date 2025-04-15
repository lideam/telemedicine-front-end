import { useState } from "react";
import { FaCamera, FaSave, FaEdit } from "react-icons/fa";
import PatientNav from "../../components/layout/PatientNav";

const ProfilePage = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    dob: "1990-05-14",
    gender: "Male",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main St, City, State, 12345",
  });

  const [healthInfo] = useState({
    medicalHistory: "Asthma, Hypertension",
    currentMedications: "Albuterol, Lisinopril",
    allergies: "Peanuts, Pollen",
    familyHistory: "Diabetes, Heart Disease",
    vaccinations: "Flu, COVID-19",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e, section, field) => {
    const value = e.target.value;
    if (section === "personal") {
      setPersonalInfo({ ...personalInfo, [field]: value });
    }
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    alert("Changes saved successfully!");
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <PatientNav />
      <main className="flex-1 p-6 pt-0 overflow-y-auto ml-64 space-y-6">
        <div className="bg-white shadow-md p-6 mb-8 rounded-xl max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-800 mb-1">My Profile</h1>
          <p className="text-sm text-gray-500">
            View and manage your personal and health information
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6 space-y-10 pb-20">
          {/* Profile Picture */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={profilePic || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-600 shadow-md"
              />
              <label
                htmlFor="profile-pic"
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow"
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

          {/* Personal Info */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                ["Full Name", "name", "text"],
                ["Date of Birth", "dob", "date"],
                ["Gender", "gender", "text"],
                ["Email", "email", "email"],
                ["Phone", "phone", "text"],
                ["Address", "address", "text"],
              ].map(([label, key, type]) => (
                <div
                  key={key}
                  className={key === "address" ? "col-span-2" : ""}
                >
                  <label className="block text-gray-600">{label}</label>
                  <input
                    type={type}
                    value={personalInfo[key]}
                    onChange={(e) => handleInputChange(e, "personal", key)}
                    className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
                    readOnly={!isEditing}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Health Info */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">
              Health Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                ["Medical History", "medicalHistory"],
                ["Current Medications", "currentMedications"],
                ["Allergies", "allergies"],
                ["Family Medical History", "familyHistory"],
                ["Vaccination Records", "vaccinations"],
              ].map(([label, key]) => (
                <div key={key}>
                  <label className="block text-gray-600">{label}</label>
                  <textarea
                    value={healthInfo[key]}
                    className="w-full p-3 mt-2 border rounded-lg bg-gray-100 text-gray-700"
                    readOnly
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            {!isEditing ? (
              <button
                onClick={handleEditClick}
                className="bg-yellow-500 text-white py-2 px-6 rounded-lg hover:bg-yellow-600 transition font-semibold shadow"
              >
                <FaEdit className="mr-2 inline" /> Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleSaveChanges}
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition font-semibold shadow"
                >
                  <FaSave className="mr-2 inline" /> Save Changes
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition font-semibold shadow"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
