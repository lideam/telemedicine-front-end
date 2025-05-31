import { useEffect, useState } from "react";
import { FaCamera, FaSave, FaEdit, FaUser } from "react-icons/fa";
import DoctorNav from "../../components/layout/DoctorNav";
const API_BASE_URL = import.meta.env.VITE_API_URL;

const DoctorProfilePage = () => {
  const [doctorInfo, setDoctorInfo] = useState({
    name: "",
    specialty: "",
    bio: "",
    yearsOfExperience: 0,
    clinicName: "",
    email: "",
    _id: "",
    medicalProfileId: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const token = localStorage.getItem("token");

        const authRes = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!authRes.ok) throw new Error("Failed to fetch doctor auth info");
        const authData = await authRes.json();

        const doctorId = authData._id;
        const fullName = `${authData.firstName} ${authData.lastName}`;

        const profileRes = await fetch(
          `${API_BASE_URL}/api/medicalProfile/user/${doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        let profileData = {};
        if (profileRes.ok) {
          profileData = await profileRes.json();
        }

        setDoctorInfo({
          name: fullName,
          email: authData.email || "",
          bio: "",
          clinicName: profileData.currentHospital || "",
          specialty: profileData.specialty || "",
          yearsOfExperience: profileData.yearsOfExperience || "",
          _id: doctorId,
          medicalProfileId: profileData._id || "",
        });
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    };

    fetchDoctorInfo();
  }, []);

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

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");

      const payload = {
        doctorId: doctorInfo._id,
        yearsOfExperience: Number(doctorInfo.yearsOfExperience),
        specialty: doctorInfo.specialty,
        currentHospital: doctorInfo.clinicName,
      };

      const method = doctorInfo.medicalProfileId ? "PUT" : "POST";
      const url = doctorInfo.medicalProfileId
        ? `${API_BASE_URL}/api/medicalProfile/${doctorInfo.medicalProfileId}`
        : `${API_BASE_URL}/api/medicalProfile`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to save profile");

      const data = await response.json();
      alert("Profile saved successfully!");
      setIsEditing(false);

      if (!doctorInfo.medicalProfileId && data._id) {
        setDoctorInfo((prev) => ({
          ...prev,
          medicalProfileId: data._id,
        }));
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile.");
    }
  };

  const handleEditClick = () => setIsEditing(true);
  const handleCancelEdit = () => setIsEditing(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DoctorNav />
      <main className="flex-1 p-6 pt-0 overflow-y-auto ml-64 space-y-6">
        <section className="bg-white p-3 pl-6 -ml-6 -mr-6 shadow-lg items-center flex gap-5">
          <FaUser className="text-blue-600 text-3xl" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
            <p className="text-sm text-gray-500 mt-1">
              View and manage your personal and health information
            </p>
          </div>
        </section>

        <div className="mx-auto px-6 space-y-10 pb-20">
          {/* Profile Picture */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={profilePic || ""}
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
                Dr. {doctorInfo.name}
              </h2>
              <p className="text-gray-500">{doctorInfo.specialty}</p>
              <p className="text-gray-500">{doctorInfo.email}</p>
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
                ["Clinic Name", "clinicName", "text"],
              ].map(([label, key, type]) => (
                <div key={key}>
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
