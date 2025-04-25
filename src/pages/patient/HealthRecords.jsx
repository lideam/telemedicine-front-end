import { useState } from "react";
import { FaSave, FaNotesMedical } from "react-icons/fa";
import PatientNav from "../../components/layout/PatientNav";

const ProfilePage = () => {
  const initialState = {
    medicalHistory: "",
    currentMedications: "",
    allergies: "",
    familyHistory: "",
    vaccinations: "",
    lifestyle: "",
    recentSymptoms: "",
    mentalHealth: "",
    physicalActivity: "",
    dietaryPreferences: "",
    smokingStatus: "",
    alcoholConsumption: "",
    otherInfo: "",
  };

  const [healthInfo, setHealthInfo] = useState(initialState);
  const [isSaved, setIsSaved] = useState(false);
  const [formError, setFormError] = useState(false);

  const handleHealthInfoChange = (e) => {
    const { name, value } = e.target;
    setHealthInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormError(false); // Clear error on change
  };

  const handleSave = () => {
    const requiredFields = Object.entries(healthInfo).filter(
      ([key, value]) => key !== "otherInfo" && (value === "" || value === "Choose...")
    );

    if (requiredFields.length > 0) {
      setFormError(true);
      return;
    }

    console.log("Health Info Saved:", healthInfo);
    setIsSaved(true);
  };

  const options = {
    medicalHistory: ["None", "Asthma", "Knee Surgery", "Diabetes", "Heart Disease", "Cancer", "Other"],
    currentMedications: ["None", "Inhaler", "Ibuprofen", "Aspirin", "Antidepressants", "Blood Pressure Medication", "Other"],
    allergies: ["None", "Peanuts", "Penicillin", "Pollen", "Dust", "Shellfish", "Other"],
    familyHistory: ["None", "Hypertension", "Diabetes", "Cancer", "Heart Disease", "Mental Illness", "Other"],
    vaccinations: ["None", "COVID-19", "Tetanus", "Flu", "Hepatitis B", "HPV", "Other"],
    lifestyle: ["None", "Active", "Sedentary", "Vegetarian", "Non-Vegetarian", "Vegan", "Other"],
    recentSymptoms: ["None", "Cough", "Fever", "Headache", "Shortness of Breath", "Fatigue", "Other"],
    mentalHealth: ["None", "Stable", "Anxiety", "Depression", "Bipolar Disorder", "Other"],
    physicalActivity: ["None", "Daily", "Weekly", "Occasionally", "Rarely", "Other"],
    dietaryPreferences: ["None", "Vegetarian", "Non-Vegetarian", "Vegan", "Keto", "Other"],
    smokingStatus: ["None", "Non-Smoker", "Occasional Smoker", "Regular Smoker", "Former Smoker", "Other"],
    alcoholConsumption: ["None", "Non-Drinker", "Occasional Drinker", "Regular Drinker", "Other"],
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <PatientNav />
      <main className="flex-1 p-6 pt-0 overflow-y-auto ml-64 space-y-6">
          <section className="bg-white p-3 pl-6 -ml-6 -mr-6 shadow-lg flex items-center gap-5">
          <FaNotesMedical className="text-blue-600 text-4xl" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Health Information</h1>

            <p className="text-sm text-gray-500 mt-1">
              If any section does not apply to you, please choose <strong>"None"</strong>.
            </p>
            </div>
</section>
          <div className="max-w-5xl mx-auto bg-white p-10 rounded-3xl shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Object.entries(options).map(([key, values]) => (
                <div key={key}>
                  <label className="block font-bold text-gray-700 capitalize mb-1">{key.replace(/([A-Z])/g, ' $1')}</label>
                  <select
                    name={key}
                    value={healthInfo[key]}
                    onChange={handleHealthInfoChange}
                    className={`w-full mt-1 p-4 border rounded-2xl bg-gray-50 focus:outline-blue-400 ${
                      formError && (healthInfo[key] === "" || healthInfo[key] === "Choose...") ? "border-red-500" : "border-gray-300"
                    }`}
                    disabled={isSaved}
                  >
                    <option disabled value="">Choose...</option>
                    {values.map((option, idx) => (
                      <option key={idx} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              ))}

              <div className="sm:col-span-2">
                <label className="block font-bold text-gray-700 mb-1">
                  Other Information <span className="text-sm text-gray-500">(Optional)</span>
                </label>
                <textarea
                  name="otherInfo"
                  value={healthInfo.otherInfo}
                  onChange={handleHealthInfoChange}
                  className="w-full mt-1 p-4 border border-gray-300 rounded-2xl bg-gray-50 focus:outline-blue-400"
                  rows="4"
                  placeholder="Provide any other relevant health information."
                  disabled={isSaved}
                />
              </div>
            </div>

            {formError && (
              <p className="text-red-600 text-sm font-medium text-center mt-6">
                ⚠️ Please make sure all required fields are selected.
              </p>
            )}

            <p className={`text-xs font-medium text-center mt-4 ${isSaved ? "text-green-600" : "text-red-600"}`}>
              {isSaved ? "✅ Health information saved successfully." : "⚠️ Once filled, you will not be able to make changes."}
            </p>

            <div className="mt-4 flex justify-center">
              <button
                onClick={handleSave}
                className={`bg-blue-600 text-white px-10 py-3 rounded-xl font-semibold transition ${
                  isSaved ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                }`}
                disabled={isSaved}
              >
                <FaSave className="mr-2 inline" /> Save
              </button>
            </div>
          </div>
        </main>
      </div>
  );
};

export default ProfilePage;
