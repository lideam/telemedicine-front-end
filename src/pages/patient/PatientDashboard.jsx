import { useState } from "react";
import { Link } from "react-router-dom";
import { FaAppleAlt, FaRunning, FaTint, FaHeartbeat, FaFileMedical, FaWeight, FaStethoscope } from "react-icons/fa";
import Calendar from "react-calendar";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { motion } from "framer-motion";
import "react-calendar/dist/Calendar.css";
import PatientNav from "../../components/layout/PatientNav";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PatientDashboard = () => {
  const [appointments] = useState([
    {
      id: 1,
      doctorName: "Dr. John Doe",
      specialty: "Cardiologist",
      date: "2025-04-20",
      time: "10:30 AM",
      status: "Scheduled",
    },
    {
      id: 2,
      doctorName: "Dr. Jane Smith",
      specialty: "Dermatologist",
      date: "2025-04-22",
      time: "1:00 PM",
      status: "Scheduled",
    },
  ]);

  const healthStats = {
    weight: "70kg",
    bloodPressure: "120/80 mmHg",
    glucose: "95 mg/dL",
    cholesterol: "190 mg/dL",
    oxygenLevel: "98%",
    bmi: "22.5",
  };

  const healthTips = [
    {
      icon: <FaAppleAlt className="text-green-500 text-3xl" />,
      tip: "Eat more fruits and vegetables for a balanced diet.",
    },
    {
      icon: <FaRunning className="text-blue-500 text-3xl" />,
      tip: "Exercise for at least 30 minutes every day.",
    },
    {
      icon: <FaTint className="text-blue-400 text-3xl" />,
      tip: "Drink at least 8 glasses of water daily to stay hydrated.",
    },
    {
      icon: <FaHeartbeat className="text-red-500 text-3xl" />,
      tip: "Regular checkups help detect health issues early.",
    },
  ];

  const healthChartData = {
    labels: ["Weight", "BP", "Glucose", "Cholesterol", "O2", "BMI"],
    datasets: [
      {
        label: "Health Metrics",
        backgroundColor: "#3B82F6",
        data: [70, 120, 95, 190, 98, 22.5],
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <PatientNav />
      <main className="flex-1 p-6 pt-0 overflow-y-auto ml-64 space-y-6">
        <section className="bg-white p-3 pl-6 -ml-6 -mr-6 shadow-lg flex items-center gap-5">
          <img
            src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Doctor"
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-600"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome, John Doe</h1>
            <p className="text-gray-600 mt-1">Your health dashboard at a glance</p>
          </div>
        </section>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md mb-6">
          <p className="font-medium">⚠️ Please complete your health profile.</p>
          <Link to="/patient-health-records" className="text-gray-700 hover:text-blue-600 flex items-center">
            <FaFileMedical className="mr-2" /> Health Records
          </Link>
        </div>

        {/* Health Overview */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Health Overview</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-6">
            {Object.entries(healthStats).map(([key, value]) => (
              <div key={key} className="text-center bg-blue-50 p-3 rounded-lg">
                <p className="text-blue-600 capitalize font-medium">{key.replace(/([A-Z])/g, " $1")}</p>
                <p className="text-xl font-bold">{value}</p>
              </div>
            ))}
          </div>
          <Bar data={healthChartData} height={100} />
        </div>

        {/* Appointments with Calendar */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Upcoming Appointments</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="border p-4 rounded-lg flex justify-between items-center shadow-sm bg-blue-50">
                  <div>
                    <h4 className="font-bold text-gray-800">{appointment.doctorName}</h4>
                    <p className="text-sm text-gray-600">{appointment.specialty}</p>
                    <p className="text-sm text-gray-600">{appointment.date} at {appointment.time}</p>
                  </div>
                  <Link to="/patient-appointments" className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700">
                    View
                  </Link>
                </div>
              ))}
            </div>
            <Calendar className="rounded-lg shadow border" />
          </div>
        </div>

        {/* Health Tips with Animation */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Health Tips</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {healthTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center bg-blue-50 p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                {tip.icon}
                <p className="text-center text-gray-700 mt-2">{tip.tip}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
