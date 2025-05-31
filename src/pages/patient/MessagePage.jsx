import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Paperclip, Send, Download } from "lucide-react";
import PatientNav from "../../components/layout/PatientNav";
const API_BASE_URL = import.meta.env.VITE_API_URL;

const MessagePage = () => {
  const { id: chatId } = useParams();
  const messagesEndRef = useRef(null);

  const [doctorName, setDoctorName] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);

  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    if (!chatId) return;

    const fetchDoctorFromChat = async () => {
      try {
        const chatRes = await fetch(`${API_BASE_URL}/api/chat/${chatId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!chatRes.ok) throw new Error("Failed to fetch chat");

        const chat = await chatRes.json();
        setAppointmentId(chat.appointmentId);

        const doctorRes = await fetch(
          `${API_BASE_URL}/api/user/${chat.doctorId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!doctorRes.ok) throw new Error("Failed to fetch doctor");

        const doctor = await doctorRes.json();
        if (doctor.firstName && doctor.lastName) {
          setDoctorName(`Dr. ${doctor.firstName} ${doctor.lastName}`);
        }
      } catch (error) {
        console.error("Error loading doctor:", error);
      }
    };

    fetchDoctorFromChat();
  }, [chatId, token]);

  useEffect(() => {
    if (!chatId) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/message/chat/${chatId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch messages");

        const data = await res.json();

        const formattedMessages = data.map((msg) => ({
          sender: msg.senderId === currentUserId ? "Me" : doctorName,
          text: msg.messageType === "text" ? msg.content : "",
          messageType: msg.messageType,
          content: msg.content,
          fileName: msg.fileName || null,
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [chatId, token, currentUserId, doctorName]);

  const sendMessage = async () => {
    if (!newMessage.trim() && !file) return;

    try {
      const senderId = currentUserId;
      let fileUrl = null;
      let messageType = "text";
      let fileName = null;

      if (file) {
        const isImage = file.type.startsWith("image/");
        messageType = isImage ? "image" : "file";

        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch("${API_BASE_URL}/api/upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        if (!uploadRes.ok) {
          const error = await uploadRes.json();
          throw new Error("File upload failed: " + error.message);
        }

        const uploaded = await uploadRes.json();
        fileUrl = uploaded.url;
        fileName = file.name;
      }

      const payload = {
        chatId,
        senderId,
        messageType,
        content: file ? fileUrl : newMessage,
        fileName,
        seenBy: [],
      };

      const res = await fetch(`${API_BASE_URL}/api/message`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error("Failed to send message: " + errData.message);
      }

      const savedMessage = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "Me",
          text: messageType === "text" ? newMessage : "",
          messageType,
          content: fileUrl || newMessage,
          fileName,
          time: new Date(savedMessage.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);

      setNewMessage("");
      setFile(null);
    } catch (error) {
      console.error("Send error:", error);
    }
  };

  const handleStartVideoCall = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/videoCall/appointment/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to start video call");
      }

      const data = await res.json();
      const callUrl = data.callUrl;

      window.open(callUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Video call error:", err);
      alert("Could not start the video call. Please try again.");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <PatientNav />
      <main className="flex-1 p-6 pt-6 ml-64 flex flex-col">
        <div className="text-2xl font-semibold text-gray-800 mb-2">
          {doctorName || "Loading doctor..."}
        </div>

        {appointmentId && (
          <button
            onClick={handleStartVideoCall}
            className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 w-fit"
          >
            Start Video Call
          </button>
        )}

        <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-white rounded-xl shadow-inner border">
          {messages.map((msg, idx) => (
            <div key={idx} className="flex justify-start">
              <div className="max-w-xs bg-gray-200 rounded-2xl p-3 text-lg text-gray-800">
                <div className="font-semibold text-xs text-gray-500 mb-1">
                  {msg.sender}
                </div>

                {msg.messageType === "text" && <div>{msg.text}</div>}

                {msg.messageType === "image" && (
                  <div className="mt-2">
                    <img
                      src={msg.content}
                      alt="attachment"
                      className="max-w-[200px] rounded-lg border"
                    />
                  </div>
                )}

                {msg.messageType === "file" && (
                  <div className="mt-2 text-blue-600 flex items-center gap-2">
                    <Download size={16} />
                    <a
                      href={msg.content}
                      download
                      className="underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {msg.fileName || "Download file"}
                    </a>
                  </div>
                )}

                <div className="text-xs text-gray-500 mt-1 text-right">
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        <div className="mt-4 flex items-center gap-2">
          <label className="cursor-pointer">
            <Paperclip />
            <input
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border rounded-lg"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Send className="mr-1" size={16} /> Send
          </button>
        </div>
      </main>
    </div>
  );
};

export default MessagePage;
