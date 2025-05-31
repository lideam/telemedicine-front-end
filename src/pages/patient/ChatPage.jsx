import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCommentDots } from "react-icons/fa";
import PatientNav from "../../components/layout/PatientNav";
const API_BASE_URL = import.meta.env.VITE_API_URL;

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const patientId = userInfo?._id;

  useEffect(() => {
    const fetchChats = async () => {
      if (!patientId || role !== "patient") {
        console.warn("Not authorized or patient data missing");
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/api/chat/user/${patientId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch chats");

        const data = await res.json();

        // Group by doctorId (only latest chat per doctor)
        const uniqueDoctorChats = Object.values(
          data.reduce((acc, chat) => {
            const docId = chat.doctorId;
            if (
              !acc[docId] ||
              new Date(chat.updatedAt) > new Date(acc[docId].updatedAt)
            ) {
              acc[docId] = chat;
            }
            return acc;
          }, {})
        );

        setChats(uniqueDoctorChats);
      } catch (err) {
        console.error("Error fetching chat list:", err);
      }
    };

    fetchChats();
  }, [patientId, role, token]);

  const handleOpenChat = (chatId) => {
    navigate(`/message/${chatId}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <PatientNav />

      <main className="flex-1 p-6 pt-0 overflow-y-auto ml-64 space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Your Chats
          </h3>

          {chats.length === 0 ? (
            <p className="text-gray-600">No chats yet.</p>
          ) : (
            <div className="space-y-4">
              {chats.map((chat) => (
                <div
                  key={chat._id}
                  onClick={() => handleOpenChat(chat._id)}
                  className="p-4 bg-blue-100 rounded-lg shadow-md cursor-pointer hover:bg-blue-200 transition-all"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        Dr. {chat._doctor?.firstName} {chat._doctor?.lastName}
                      </h4>
                      <p className="text-gray-600">{chat.lastMessage}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(chat.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
