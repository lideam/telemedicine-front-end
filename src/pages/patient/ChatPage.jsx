import { useState, useRef, useEffect } from "react";
import {
  FaPaperPlane,
  FaVideo,
  FaPaperclip,
  FaUserMd,
  FaArrowLeft,
  FaCalendarAlt,
  FaHistory,
} from "react-icons/fa"; // Import the calendar and history icons
import PatientNav from "../../components/layout/PatientNav";

// Dummy data for appointments
const appointmentsData = [
  {
    id: 1,
    doctorName: "Dr. John Smith",
    specialty: "Cardiologist",
    appointmentTime: "2025-04-10T10:30:00", // Past appointment
    messages: [
      {
        id: 1,
        sender: "Doctor",
        text: "How are you feeling today?",
        type: "text",
      },
      {
        id: 2,
        sender: "Patient",
        text: "Much better, thank you!",
        type: "text",
      },
    ],
  },
  {
    id: 2,
    doctorName: "Dr. Emily Davis",
    specialty: "Dermatologist",
    appointmentTime: "2025-04-20T13:00:00", // Upcoming appointment
    messages: [],
  },
];

const ChatPage = () => {
  const [appointments] = useState(appointmentsData);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);
  const [isFirstChat, setIsFirstChat] = useState(true);
  const messagesEndRef = useRef(null);

  const handleSelectAppointment = (appointment) => {
    setSelectedConversation(appointment);
    setIsFirstChat(appointment.messages.length === 0);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "" && !attachedFile) return;

    const newMsg = {
      id: selectedConversation.messages.length + 1,
      sender: "Patient",
      text: attachedFile ? attachedFile.name : newMessage,
      type: attachedFile ? "file" : "text",
    };

    setSelectedConversation((prev) => ({
      ...prev,
      messages: [...prev.messages, newMsg],
    }));

    setNewMessage("");
    setAttachedFile(null);
    setIsFirstChat(false);
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleFileChange = (e) => {
    setAttachedFile(e.target.files[0]);
    setNewMessage("");
  };

  const handleVideoCall = () => {
    alert("Video call feature will be implemented here (WebRTC)");
  };

  const isAppointmentTimeReached = (appointmentTime) => {
    const now = new Date();
    const date = new Date(appointmentTime);
    return date <= now; // Ensures video call button is only enabled at or after the scheduled time
  };

  const handleBackToList = () => {
    setSelectedConversation(null); // This will bring the user back to the list
  };

  return (
    <div className="flex min-h-screen bg-gray-50 ">
      <PatientNav />

      <main className="flex-1 p-6 pt-0 overflow-y-auto ml-64 space-y-6">
        {/* Header */}
        {/* <div className="bg-white px-6 py-4 flex items-center justify-between shadow"> */}
        <section className="bg-white p-3 pl-6 -ml-6 -mr-6 shadow-lg flex items-center gap-5">
          {/* <div className="flex items-center space-x-4"> */}
            <FaUserMd className="text-blue-500 text-3xl" />
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                {selectedConversation
                  ? selectedConversation.doctorName
                  : "Select a Doctor"}
              </h2>
              <p className="text-sm text-gray-500">
                {selectedConversation ? selectedConversation.specialty : ""}
              </p>
            </div>
          {/* </div> */}
          </section>

          {selectedConversation &&
            !isAppointmentTimeReached(selectedConversation.appointmentTime) && (
              <button
                onClick={handleVideoCall}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isAppointmentTimeReached(selectedConversation.appointmentTime)
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
                disabled={
                  !isAppointmentTimeReached(
                    selectedConversation.appointmentTime
                  )
                }
              >
                <FaVideo />
                Video Call
              </button>
            )}
        {/* </div> */}

        {/* Chat Section */}
        {selectedConversation && (
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
            {/* Back Button at the top of the chat */}
            <button
              onClick={handleBackToList}
              className="text-2xl text-blue-600 hover:text-blue-800 mb-4"
            >
              <FaArrowLeft />
            </button>

            {selectedConversation.messages.length === 0 && isFirstChat && (
              <div className="text-center p-4 bg-gray-100 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800">
                  Start a conversation by sending your first message.
                </h3>
                <p className="text-sm text-gray-500">
                  Click to initiate chat with your doctor.
                </p>
              </div>
            )}

            {selectedConversation.messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-sm px-4 py-3 rounded-lg shadow ${
                  msg.sender === "Patient"
                    ? "ml-auto bg-blue-100"
                    : "mr-auto bg-gray-100"
                }`}
              >
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  {msg.sender}
                </p>
                {msg.type === "text" ? (
                  <p className="text-gray-800">{msg.text}</p>
                ) : (
                  <a
                    href="#"
                    className="text-blue-600 underline"
                    onClick={() => alert("Download file feature coming soon")}
                  >
                    📎 {msg.text}
                  </a>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Appointment List */}
        {!selectedConversation && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Your Consultations
            </h3>

            {/* Upcoming Appointments */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-gray-800 flex items-center">
                <FaCalendarAlt className="mr-2 text-blue-500" />
                Upcoming Appointments
              </h4>
              {appointments
                .filter(
                  (appointment) =>
                    !isAppointmentTimeReached(appointment.appointmentTime)
                )
                .map((appointment) => (
                  <div
                    key={appointment.id}
                    onClick={() => handleSelectAppointment(appointment)}
                    className="p-4 rounded-lg shadow-md cursor-pointer bg-blue-100"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">
                          {appointment.doctorName}
                        </h4>
                        <p className="text-gray-600">{appointment.specialty}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {new Date(
                            appointment.appointmentTime
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Past Appointments */}
            <div className="space-y-4 mt-6">
              <h4 className="font-semibold text-lg text-gray-800 flex items-center">
                <FaHistory className="mr-2 text-gray-500" />
                Past Appointments
              </h4>
              {appointments
                .filter((appointment) =>
                  isAppointmentTimeReached(appointment.appointmentTime)
                )
                .map((appointment) => (
                  <div
                    key={appointment.id}
                    onClick={() => handleSelectAppointment(appointment)}
                    className="p-4 rounded-lg shadow-md cursor-pointer bg-gray-100"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">
                          {appointment.doctorName}
                        </h4>
                        <p className="text-gray-600">{appointment.specialty}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {new Date(
                            appointment.appointmentTime
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Message Input */}
        {selectedConversation && (
          <div className="bg-white border-t px-6 py-4 flex items-center gap-2">
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-blue-600"
            >
              <FaPaperclip size={20} />
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <input
              type="text"
              placeholder={
                attachedFile
                  ? `File attached: ${attachedFile.name}`
                  : "Type a message"
              }
              className="flex-1 p-3 border rounded-lg bg-gray-50"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={!!attachedFile}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white p-3 rounded-lg disabled:opacity-50"
              disabled={newMessage.trim() === "" && !attachedFile}
            >
              <FaPaperPlane />
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ChatPage;
