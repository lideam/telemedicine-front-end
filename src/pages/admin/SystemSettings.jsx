import { useState } from "react";
import AdminNav from "../../components/layout/AdminNav";
import {
  Save,
  Shield,
  Mail,
  CreditCard,
  User,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

const SystemSettings = () => {
  const [platformName, setPlatformName] = useState("TeleMedicine");
  const [contactEmail, setContactEmail] = useState("support@telemedicine.com");
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [passwordPolicy, setPasswordPolicy] = useState("Strong");
  const [notificationMethod, setNotificationMethod] = useState("Email");
  const [enable2FA, setEnable2FA] = useState(false);
  const [paymentGateway, setPaymentGateway] = useState("Chapa");
  const [isEditable, setIsEditable] = useState(false); // State to toggle edit mode

  const handleSaveSettings = () => {
    // Add logic for saving the settings
    alert("Settings saved successfully!");
    setIsEditable(false); // Disable editing after save
  };

  const handleEditClick = () => {
    setIsEditable(true); // Enable editing when the user clicks the Edit button
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminNav />
      <main className="flex-1 p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              System Settings
            </h1>
            <p className="text-sm text-gray-500">
              Configure platform settings and preferences.
            </p>
          </div>
          {!isEditable && (
            <button
              onClick={handleEditClick}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Change Settings
            </button>
          )}
        </div>

        {/* General Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold mb-4">General Settings</h4>
          <div className="space-y-4">
            <div className="flex items-center">
              <label
                htmlFor="platformName"
                className="text-lg font-medium w-48"
              >
                Platform Name
              </label>
              {isEditable ? (
                <input
                  type="text"
                  id="platformName"
                  value={platformName}
                  onChange={(e) => setPlatformName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              ) : (
                <span className="text-gray-700">{platformName}</span>
              )}
            </div>
            <div className="flex items-center">
              <label
                htmlFor="contactEmail"
                className="text-lg font-medium w-48"
              >
                Contact Email
              </label>
              {isEditable ? (
                <input
                  type="email"
                  id="contactEmail"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              ) : (
                <span className="text-gray-700">{contactEmail}</span>
              )}
            </div>
          </div>
        </div>

        {/* User Role Management */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h4 className="text-xl font-semibold mb-4">User Role Management</h4>
          <div className="space-y-4">
            <div className="flex items-center">
              <label
                htmlFor="doctorAccess"
                className="text-lg font-medium w-48"
              >
                Doctor Role Access
              </label>
              {isEditable ? (
                <select
                  id="doctorAccess"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="Full Access">Full Access</option>
                  <option value="Limited Access">Limited Access</option>
                </select>
              ) : (
                <span className="text-gray-700">Full Access</span>
              )}
            </div>
            <div className="flex items-center">
              <label
                htmlFor="patientAccess"
                className="text-lg font-medium w-48"
              >
                Patient Role Access
              </label>
              {isEditable ? (
                <select
                  id="patientAccess"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="Full Access">Full Access</option>
                  <option value="Limited Access">Limited Access</option>
                </select>
              ) : (
                <span className="text-gray-700">Full Access</span>
              )}
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h4 className="text-xl font-semibold mb-4">Notification Settings</h4>
          <div className="space-y-4">
            <div className="flex items-center">
              <label
                htmlFor="notificationMethod"
                className="text-lg font-medium w-48"
              >
                Notification Method
              </label>
              {isEditable ? (
                <select
                  id="notificationMethod"
                  value={notificationMethod}
                  onChange={(e) => setNotificationMethod(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="Email">Email</option>
                  <option value="SMS">SMS</option>
                </select>
              ) : (
                <span className="text-gray-700">{notificationMethod}</span>
              )}
            </div>
            <div className="flex items-center">
              <label
                htmlFor="pushNotifications"
                className="text-lg font-medium w-48"
              >
                Enable Push Notifications
              </label>
              <div
                className={`flex items-center ${
                  isMaintenanceMode ? "text-green-500" : "text-red-500"
                }`}
              >
                <label htmlFor="isMaintenanceMode" className="mr-4">
                  {isMaintenanceMode ? "Enabled" : "Disabled"}
                </label>
                {isEditable ? (
                  <button
                    onClick={() => setIsMaintenanceMode(!isMaintenanceMode)}
                    className={`flex items-center border p-2 rounded ${
                      isMaintenanceMode ? "border-green-500" : "border-red-500"
                    }`}
                  >
                    {isMaintenanceMode ? (
                      <ToggleRight size={24} color="#4CAF50" />
                    ) : (
                      <ToggleLeft size={24} color="#F44336" />
                    )}
                  </button>
                ) : (
                  <span>{isMaintenanceMode ? "Enabled" : "Disabled"}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h4 className="text-xl font-semibold mb-4">Security Settings</h4>
          <div className="space-y-4">
            <div className="flex items-center">
              <label
                htmlFor="passwordPolicy"
                className="text-lg font-medium w-48"
              >
                Password Policy
              </label>
              {isEditable ? (
                <select
                  id="passwordPolicy"
                  value={passwordPolicy}
                  onChange={(e) => setPasswordPolicy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="Weak">Weak</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Strong">Strong</option>
                </select>
              ) : (
                <span className="text-gray-700">{passwordPolicy}</span>
              )}
            </div>
            <div className="flex items-center">
              <label htmlFor="enable2FA" className="text-lg font-medium w-48">
                Enable Two-Factor Authentication (2FA)
              </label>
              {isEditable ? (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enable2FA"
                    checked={enable2FA}
                    onChange={(e) => setEnable2FA(e.target.checked)}
                    className="h-5 w-5"
                  />
                </div>
              ) : (
                <span className="text-gray-700">
                  {enable2FA ? "Enabled" : "Disabled"}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h4 className="text-xl font-semibold mb-4">Payment Settings</h4>
          <div className="space-y-4">
            <div className="flex items-center">
              <label
                htmlFor="paymentGateway"
                className="text-lg font-medium w-48"
              >
                Payment Gateway
              </label>
              {isEditable ? (
                <input
                  type="text"
                  id="paymentGateway"
                  value={paymentGateway}
                  onChange={(e) => setPaymentGateway(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Chapa"
                />
              ) : (
                <span className="text-gray-700">{paymentGateway}</span>
              )}
            </div>
          </div>
        </div>

        {/* Save Settings Button */}
        {isEditable && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSaveSettings}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center"
            >
              <Save className="mr-2" size={20} />
              Save Settings
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default SystemSettings;
