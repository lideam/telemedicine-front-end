import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaComments } from "react-icons/fa";
import DoctorNav from "../../components/layout/DoctorNav";
const API_BASE_URL = import.meta.env.VITE_API_URL;

const DoctorChatPage = () => {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const doctorId = userInfo?._id;

  useEffect(() => {
    const fetchChats = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      const doctorId = userInfo?.user?._id; // ✅ FIXED

      console.log("doctorId:", doctorId);
      console.log("role:", role);
      console.log("token:", token);

      if (!doctorId || role?.toLowerCase() !== "doctor") {
        console.warn("Not authorized or doctor data missing");
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/chat/user/${doctorId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch chats");
        }

        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, []);

  const handleOpenChat = (chatId) => {
    navigate(`/doctor/message/${chatId}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DoctorNav />

      <main className="flex-1 p-6 pt-0 overflow-y-auto ml-64 space-y-6">
        <div className="bg-white text-black p-3 pl-6 -ml-6 -mr-6 flex shadow-md items-center mb-6 gap-5">
          <FaComments className="text-blue-600 text-4xl" />
          <div>
            <h1 className="text-2xl font-bold">Consultation Inbox</h1>
            <p className="text-gray-600 mt-1">
              View and manage your patient chats.
            </p>
          </div>
        </div>

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
                        {chat._patient?.firstName} {chat._patient?.lastName}
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

export default DoctorChatPage;
