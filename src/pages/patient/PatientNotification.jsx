import { useState } from "react";
import { motion } from "framer-motion";
import { FaBell, FaClock, FaCheckCircle, FaFlask, FaCommentDots, FaPills } from "react-icons/fa";
import PatientNav from "../../components/layout/PatientNav";

const notifications = [
  {
    id: 1,
    type: "appointment",
    icon: <FaBell className="text-blue-500" />,
    message: "You have an appointment with Dr. Alice Morgan tomorrow at 10:00 AM.",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "message",
    icon: <FaCommentDots className="text-green-500" />,
    message: "Dr. John Doe sent you a message regarding your recent consultation.",
    timestamp: "Yesterday",
    read: true,
  },
  {
    id: 3,
    type: "test",
    icon: <FaFlask className="text-purple-500" />,
    message: "Your blood test results are now available.",
    timestamp: "1 day ago",
    read: false,
  },
  {
    id: 4,
    type: "prescription",
    icon: <FaPills className="text-pink-500" />,
    message: "Your prescription for Ibuprofen is about to expire.",
    timestamp: "3 days ago",
    read: true,
  },
];

const Notifications = () => {
  const [notifs, setNotifs] = useState(notifications);
  const [filter, setFilter] = useState("all");

  const markAsRead = (id) => {
    setNotifs(
      notifs.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifs([]);
  };

  const filtered =
    filter === "unread" ? notifs.filter((n) => !n.read) : notifs;

  const unreadCount = notifs.filter((n) => !n.read).length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <PatientNav unreadCount={unreadCount} />
      <main className="flex-1 p-6 pt-0 overflow-y-auto ml-64 space-y-6">
        <section className="bg-white p-3 pl-6 -ml-6 -mr-6 shadow-lg flex items-center gap-5">
          <FaBell className="text-blue-600 text-4xl" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
            <p className="text-gray-600 mt-1">Stay updated with the latest information</p>
          </div>
        </section>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              <button
                onClick={markAllAsRead}
                className="text-sm px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Mark All as Read
              </button>
              <button
                onClick={clearAll}
                className="text-sm px-4 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Clear All
              </button>
            </div>
            <div>
              <button
                className={`text-sm px-3 py-1 rounded-full mr-2 ${filter === "all" ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-600"}`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={`text-sm px-3 py-1 rounded-full ${filter === "unread" ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-600"}`}
                onClick={() => setFilter("unread")}
              >
                Unread
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filtered.length > 0 ? (
              filtered.map((n) => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start gap-4 p-4 rounded-lg shadow-sm border ${n.read ? "bg-gray-100" : "bg-white"}`}
                >
                  <div className="text-xl">
                    {n.icon}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${n.read ? "text-gray-600" : "text-gray-800 font-medium"}`}>{n.message}</p>
                    <span className="text-xs text-gray-500">{n.timestamp}</span>
                  </div>
                  {!n.read && (
                    <button
                      onClick={() => markAsRead(n.id)}
                      className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Mark as Read
                    </button>
                  )}
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
