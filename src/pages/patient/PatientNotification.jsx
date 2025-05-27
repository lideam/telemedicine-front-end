import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaBell,
  FaCheckCircle,
  FaFlask,
  FaCommentDots,
  FaPills,
} from "react-icons/fa";
import PatientNav from "../../components/layout/PatientNav";

const Notifications = () => {
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        const token = localStorage.getItem("token");

        if (!user || !token) {
          console.error("User not logged in");
          return;
        }

        const res = await fetch(
          `http://localhost:5000/api/notification/user/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch notifications");

        const data = await res.json();

        const enhanced = data.map((n) => ({
          ...n,
          icon: getIcon(n.type),
          read: n.read || false,
          timestamp: formatTimestamp(n.createdAt || n.updatedAt),
        }));

        setNotifs(enhanced);
      } catch (err) {
        console.error("Error loading notifications:", err);
      }
    };

    fetchNotifications();
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "appointment":
        return <FaBell className="text-blue-500" />;
      case "message":
        return <FaCommentDots className="text-green-500" />;
      case "test":
        return <FaFlask className="text-purple-500" />;
      case "prescription":
        return <FaPills className="text-pink-500" />;
      case "system":
        return <FaCheckCircle className="text-gray-500" />;
      default:
        return <FaBell className="text-gray-400" />;
    }
  };

  const formatTimestamp = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const unreadCount = notifs.filter((n) => !n.read).length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <PatientNav unreadCount={unreadCount} />
      <main className="flex-1 p-6 pt-0 overflow-y-auto ml-64 space-y-6">
        <section className="bg-white p-3 pl-6 -ml-6 -mr-6 shadow-lg flex items-center gap-5">
          <FaBell className="text-blue-600 text-4xl" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
            <p className="text-gray-600 mt-1">
              Stay updated with the latest information
            </p>
          </div>
        </section>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="space-y-4">
            {notifs.length > 0 ? (
              notifs.map((n) => (
                <motion.div
                  key={n._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start gap-4 p-4 rounded-lg shadow-sm border ${
                    n.read ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <div className="text-xl">{n.icon}</div>
                  <div className="flex-1">
                    <p
                      className={`text-sm ${
                        n.read
                          ? "text-gray-600"
                          : "text-gray-800 font-medium"
                      }`}
                    >
                      {n.message}
                    </p>
                    <span className="text-xs text-gray-500">
                      {n.timestamp}
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No notifications to show.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notifications;
