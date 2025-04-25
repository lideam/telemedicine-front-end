import AdminNav from "../../components/layout/AdminNav";
import {
  BarChart3,
  Users,
  UserCog,
  Calendar,
  DollarSign,
  ChevronRight,
} from "lucide-react";

const cards = [
  {
    title: "Total Patients",
    count: 1280,
    icon: <Users className="text-blue-600" size={28} />,
    bg: "bg-blue-50",
  },
  {
    title: "Total Doctors",
    count: 245,
    icon: <UserCog className="text-green-600" size={28} />,
    bg: "bg-green-50",
  },
  {
    title: "Appointments Today",
    count: 73,
    icon: <Calendar className="text-purple-600" size={28} />,
    bg: "bg-purple-50",
  },
  {
    title: "Monthly Revenue",
    count: "ETB 95,200",
    icon: <DollarSign className="text-yellow-600" size={28} />,
    bg: "bg-yellow-50",
  },
];

const recentDoctors = [
  {
    name: "Dr. Selamawit Fikru",
    specialty: "Cardiologist",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    registered: "2 days ago",
  },
  {
    name: "Dr. Henok Mulugeta",
    specialty: "Dermatologist",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    registered: "3 days ago",
  },
  {
    name: "Dr. Eden Worku",
    specialty: "General Practitioner",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    registered: "5 days ago",
  },
];

const appointments = [
  {
    patient: "Amanuel Birhanu",
    doctor: "Dr. Selamawit",
    date: "Apr 26, 2025",
    time: "2:00 PM",
    status: "Confirmed",
  },
  {
    patient: "Lily Alemayehu",
    doctor: "Dr. Henok",
    date: "Apr 26, 2025",
    time: "4:30 PM",
    status: "Pending",
  },
  {
    patient: "Samuel Tefera",
    doctor: "Dr. Eden",
    date: "Apr 25, 2025",
    time: "1:00 PM",
    status: "Completed",
  },
];

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminNav />
      <main className="flex-1  p-8 space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 text-sm">
              Overview of platform activity
            </p>
          </div>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium shadow hover:bg-blue-700 transition">
            Generate Report
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`rounded-2xl shadow-sm p-6 ${card.bg} border border-gray-200 flex items-center justify-between`}
            >
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {card.count}
                </h2>
              </div>
              {card.icon}
            </div>
          ))}
        </div>

        {/* Two-Column Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Recent Doctors */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Newly Registered Doctors
              </h2>
              <button className="text-sm text-blue-600 hover:underline flex items-center">
                View All <ChevronRight size={16} />
              </button>
            </div>
            <ul className="divide-y divide-gray-100">
              {recentDoctors.map((doc, i) => (
                <li key={i} className="py-3 flex items-center gap-4">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{doc.name}</p>
                    <p className="text-sm text-gray-500">{doc.specialty}</p>
                  </div>
                  <span className="ml-auto text-sm text-gray-400">
                    {doc.registered}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Appointments */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Recent Appointments
              </h2>
              <button className="text-sm text-blue-600 hover:underline flex items-center">
                View All <ChevronRight size={16} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs uppercase bg-gray-50 text-gray-500">
                  <tr>
                    <th className="px-4 py-3">Patient</th>
                    <th className="px-4 py-3">Doctor</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt, idx) => (
                    <tr
                      key={idx}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-4 py-2 font-medium">{appt.patient}</td>
                      <td className="px-4 py-2">{appt.doctor}</td>
                      <td className="px-4 py-2">{appt.date}</td>
                      <td className="px-4 py-2">{appt.time}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            appt.status === "Confirmed"
                              ? "bg-green-100 text-green-700"
                              : appt.status === "Completed"
                              ? "bg-gray-200 text-gray-600"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {appt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <BarChart3 size={20} /> Platform Activity (Chart)
            </h2>
            <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            (Charts will be displayed here)
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
