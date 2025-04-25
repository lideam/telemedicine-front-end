import { useState } from "react";
import { FaCamera, FaSave, FaEdit } from "react-icons/fa";
import DoctorNav from "../../components/layout/DoctorNav";

const DoctorProfilePage = () => {
  const [doctorInfo, setDoctorInfo] = useState({
    name: "Dr. John Doe",
    specialty: "Cardiologist",
    bio: "Experienced cardiologist with over 15 years of practice specializing in heart disease management.",
    yearsOfExperience: 15,
    clinicName: "HeartCare Clinic",
    clinicLocation: "123 Heart Ave, Addis Ababa, Ethiopia",
    phone: "+251 911 234 567",
    email: "johndoe@heartcare.com",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setDoctorInfo({ ...doctorInfo, [field]: value });
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
      <DoctorNav />
      <main className="flex-1 p-6 pt-0 overflow-y-auto  space-y-6">
        <div className="bg-white shadow-md p-6 -ml-6 -mr-6 mb-8   mx-auto">
          <h1 className="text-3xl font-bold text-blue-800 mb-1">My Profile</h1>
          <p className="text-sm text-gray-500">
            View and manage your personal and professional information
          </p>
        </div>

        <div className=" mx-auto px-6 space-y-10 pb-20">
          {/* Profile Picture */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={
                  profilePic ||
                  "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600"
                }
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
                {doctorInfo.name}
              </h2>
              <p className="text-gray-500">{doctorInfo.specialty}</p>
              <p className="text-gray-500">{doctorInfo.email}</p>
              <p className="text-gray-500">{doctorInfo.phone}</p>
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
                ["Specialty", "specialty", "text"],
                ["Years of Experience", "yearsOfExperience", "number"],
                ["Email", "email", "email"],
                ["Phone", "phone", "text"],
                ["Clinic Name", "clinicName", "text"],
                ["Clinic Location", "clinicLocation", "text"],
              ].map(([label, key, type]) => (
                <div
                  key={key}
                  className={
                    key === "clinicLocation" || key === "clinicName"
                      ? "col-span-2"
                      : ""
                  }
                >
                  <label className="block text-gray-600">{label}</label>
                  <input
                    type={type}
                    value={doctorInfo[key]}
                    onChange={(e) => handleInputChange(e, key)}
                    className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
                    readOnly={!isEditing}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">
              Professional Bio
            </h3>
            <div>
              <label className="block text-gray-600">Bio</label>
              <textarea
                value={doctorInfo.bio}
                onChange={(e) => handleInputChange(e, "bio")}
                className="w-full p-3 mt-2 border rounded-lg bg-gray-100"
                readOnly={!isEditing}
              />
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

export default DoctorProfilePage;
