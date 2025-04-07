import { useState } from "react";
import PatientNav from "../../components/layout/PatientNav"; // Import PatientNav
import { FaPaperPlane, FaUserAlt, FaEnvelope } from "react-icons/fa";

const MessagesPage = () => {
  // Dummy data for conversations
  const [conversations, setConversations] = useState([
    {
      id: 1,
      doctorName: "Dr. John Smith",
      specialty: "Cardiologist",
      messages: [
        {
          id: 1,
          sender: "Doctor",
          text: "Hello, how are you feeling today?",
          read: true,
        },
        {
          id: 2,
          sender: "Patient",
          text: "I'm feeling a bit better, thanks for asking.",
          read: true,
        },
      ],
      unreadCount: 0,
    },
    {
      id: 2,
      doctorName: "Dr. Emily Davis",
      specialty: "Dermatologist",
      messages: [
        {
          id: 1,
          sender: "Doctor",
          text: "Did you experience any side effects?",
          read: false,
        },
        {
          id: 2,
          sender: "Patient",
          text: "No side effects yet, everything is fine.",
          read: false,
        },
      ],
      unreadCount: 2,
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  // Handle selecting a conversation
  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const updatedConversations = conversations.map((conversation) => {
      if (conversation.id === selectedConversation.id) {
        const newMessageObj = {
          id: conversation.messages.length + 1,
          sender: "Patient",
          text: newMessage,
          read: false,
        };
        conversation.messages.push(newMessageObj);
        conversation.unreadCount += 1;
      }
      return conversation;
    });

    setConversations(updatedConversations);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Patient Navigation */}
      <PatientNav /> {/* PatientNav component added here */}
      <div className="pt-20">
        {/* Header Section */}
        <div className="bg-white shadow-lg p-6 mb-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800">Messages</h1>
            <p className="text-sm text-gray-500">
              View and send messages to your doctors
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-6 space-y-8">
          {/* Messages List Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Your Conversations
            </h3>
            <div className="space-y-4">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 rounded-lg shadow-md ${
                    selectedConversation?.id === conversation.id
                      ? "bg-blue-100"
                      : "bg-gray-50"
                  } cursor-pointer`}
                  onClick={() => handleSelectConversation(conversation)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        {conversation.doctorName}
                      </h4>
                      <p className="text-gray-600">{conversation.specialty}</p>
                    </div>
                    <div>
                      {conversation.unreadCount > 0 && (
                        <span className="text-xs text-red-500 bg-red-100 px-2 py-1 rounded-full">
                          {conversation.unreadCount} new
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Conversation Section */}
          {selectedConversation && (
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Conversation with {selectedConversation.doctorName}
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg ${
                      message.sender === "Doctor"
                        ? "bg-gray-100"
                        : "bg-blue-100"
                    } shadow-md`}
                  >
                    <p className="font-semibold text-gray-700">
                      {message.sender}:
                    </p>
                    <p className="text-gray-600">{message.text}</p>
                  </div>
                ))}
              </div>

              {/* Message Input Section */}
              <div className="mt-6 flex items-center">
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg bg-gray-50"
                  placeholder="Type your message here"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                  onClick={handleSendMessage}
                  className="ml-4 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
