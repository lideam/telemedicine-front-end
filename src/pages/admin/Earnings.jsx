import { useState, useEffect } from "react";
import AdminNav from "../../components/layout/AdminNav";
import { Search, DollarSign, Calendar } from "lucide-react";
import { Bar } from "react-chartjs-2"; // Importing Bar chart from Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Dummy data for the earnings page (replace with actual data)
const dummyEarningsData = [
  {
    id: 1,
    patient: "John Doe",
    doctor: "Dr. Jane Smith",
    amount: 50,
    date: "2025-04-20",
    status: "Completed",
  },
  {
    id: 2,
    patient: "Samuel Tesfaye",
    doctor: "Dr. Alex Brown",
    amount: 70,
    date: "2025-04-22",
    status: "Pending",
  },
  {
    id: 3,
    patient: "Emily White",
    doctor: "Dr. Sarah Connor",
    amount: 40,
    date: "2025-04-18",
    status: "Completed",
  },
];

// Sample monthly earnings data for the bar chart (replace with actual data)
const monthlyEarningsData = [
  { month: "Jan", earnings: 500 },
  { month: "Feb", earnings: 700 },
  { month: "Mar", earnings: 550 },
  { month: "Apr", earnings: 1200 },
];

// Sample additional data for the second bar graph (e.g., earnings by doctor)
const doctorEarningsData = [
  { doctor: "Dr. Jane Smith", earnings: 500 },
  { doctor: "Dr. Alex Brown", earnings: 700 },
  { doctor: "Dr. Sarah Connor", earnings: 550 },
  { doctor: "Dr. Michael Johnson", earnings: 800 },
  { doctor: "Dr. Emily White", earnings: 600 },
  { doctor: "Dr. Linda Green", earnings: 1000 },
  { doctor: "Dr. Samuel Tesfaye", earnings: 450 },
];

const Earnings = () => {
  const [earnings, setEarnings] = useState(dummyEarningsData);
  const [totalEarnings, setTotalEarnings] = useState(16000); // Total earnings sum
  const [monthlyEarnings, setMonthlyEarnings] = useState(1200); // Earnings for the current month
  const [searchTerm, setSearchTerm] = useState("");

  // Process data for the bar chart (Monthly Earnings)
  const chartData = {
    labels: monthlyEarningsData.map((data) => data.month), // X-axis: months
    datasets: [
      {
        label: "Monthly Earnings ($)",
        data: monthlyEarningsData.map((data) => data.earnings), // Y-axis: earnings
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Color for the bars
        borderColor: "rgba(75, 192, 192, 1)", // Border color for the bars
        borderWidth: 1,
      },
    ],
  };

  // Process data for the second bar chart (Top 5 Doctor Earnings)
  const topDoctorEarningsData = doctorEarningsData
    .sort((a, b) => b.earnings - a.earnings) // Sort by earnings, highest first
    .slice(0, 5); // Take the top 5 doctors

  const doctorChartData = {
    labels: topDoctorEarningsData.map((data) => data.doctor), // X-axis: doctors
    datasets: [
      {
        label: "Doctor Earnings ($)",
        data: topDoctorEarningsData.map((data) => data.earnings), // Y-axis: earnings
        backgroundColor: "rgba(153, 102, 255, 0.6)", // Color for the bars
        borderColor: "rgba(153, 102, 255, 1)", // Border color for the bars
        borderWidth: 1,
      },
    ],
  };

  const filteredEarnings = earnings.filter(
    (earning) =>
      earning.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      earning.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminNav />
      <main className="flex-1 p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Earnings</h1>
            <p className="text-sm text-gray-500">
              Track and manage platform earnings
            </p>
          </div>
        </div>

        {/* Total and Monthly Earnings */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <DollarSign size={24} className="text-green-600 mr-4" />
            <div>
              <h4 className="text-xl font-semibold">Total Earnings</h4>
              <p className="text-lg text-gray-700">${totalEarnings}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <Calendar size={24} className="text-blue-600 mr-4" />
            <div>
              <h4 className="text-xl font-semibold">Monthly Earnings</h4>
              <p className="text-lg text-gray-700">${monthlyEarnings}</p>
            </div>
          </div>
        </div>

        {/* Bar Charts for Earnings */}
        <div className="flex space-x-6 mt-6">
          {/* First Bar Chart: Monthly Earnings */}
          <div className="bg-white p-6 rounded-lg shadow-md flex-1">
            <h4 className="text-xl font-semibold mb-4">Earnings by Month</h4>
            <div className="relative h-72">
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    title: {
                      display: true,
                      text: "Monthly Earnings ($)",
                      font: { size: 16 },
                    },
                    legend: {
                      display: true,
                      position: "top",
                    },
                  },
                  scales: {
                    x: {
                      beginAtZero: true,
                    },
                    y: {
                      beginAtZero: true,
                      ticks: {
                        stepSize: 200,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Second Bar Chart: Top 5 Doctor Earnings */}
          <div className="bg-white p-6 rounded-lg shadow-md flex-1">
            <h4 className="text-xl font-semibold mb-4">
              Top 5 Doctor Earnings
            </h4>
            <div className="relative h-72">
              <Bar
                data={doctorChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    title: {
                      display: true,
                      text: "Doctor Earnings ($)",
                      font: { size: 16 },
                    },
                    legend: {
                      display: true,
                      position: "top",
                    },
                  },
                  scales: {
                    x: {
                      beginAtZero: true,
                    },
                    y: {
                      beginAtZero: true,
                      ticks: {
                        stepSize: 200,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md mt-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by patient or doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
        </div>

        {/* Earnings Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200 mt-6">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Doctor</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEarnings.map((earning) => (
                <tr
                  key={earning.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">{earning.patient}</td>
                  <td className="px-6 py-4">{earning.doctor}</td>
                  <td className="px-6 py-4">${earning.amount}</td>
                  <td className="px-6 py-4">{earning.date}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-lg text-sm ${
                        earning.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {earning.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Earnings;
