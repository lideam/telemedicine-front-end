import { useEffect, useState } from "react";
import { FaSave, FaEdit, FaUser } from "react-icons/fa";
import PatientNav from "../../components/layout/PatientNav";

const ProfilePage = () => {
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    email: "",
    _id: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch patient info");

        const data = await res.json();
        const fullName = `${data.firstName} ${data.lastName}`;

        setPatientInfo({
          name: fullName,
          email: data.email,
          _id: data._id,
        });
      } catch (error) {
        console.error("Error fetching patient profile:", error);
      }
    };

    fetchPatientInfo();
  }, []);

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setPatientInfo({ ...patientInfo, [field]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");

      const [firstName, ...rest] = patientInfo.name.split(" ");
      const lastName = rest.join(" ") || "";

      const payload = { firstName, lastName, email: patientInfo.email };

      const res = await fetch(
        `http://localhost:5000/api/user/${patientInfo._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to update profile");

      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Failed to save changes.");
    }
  };

  const handleEditClick = () => setIsEditing(true);
  const handleCancelEdit = () => setIsEditing(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <PatientNav />
      <main className="flex-1 p-6 pt-0 overflow-y-auto ml-64 space-y-6">
        <section className="bg-white p-3 pl-6 -ml-6 -mr-6 shadow-lg flex items-center gap-4">
          <FaUser className="text-blue-600 text-4xl" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
            <p className="text-sm text-gray-500 mt-1">
              View and manage your basic information
            </p>
          </div>
        </section>

        <div className="max-w-3xl px-2 space-y-10 pb-20">
          {/* Editable Info */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600">Full Name</label>
                <input
                  type="text"
                  value={patientInfo.name || ""}
                  onChange={(e) => handleInputChange(e, "name")}
                  className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
                  readOnly={!isEditing}
                />
              </div>
              <div>
                <label className="block text-gray-600">Email</label>
                <input
                  type="email"
                  value={patientInfo.email || ""}
                  onChange={(e) => handleInputChange(e, "email")}
                  className="w-full p-3 mt-2 border rounded-lg bg-gray-50"
                  readOnly={!isEditing}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-start space-x-4">
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
