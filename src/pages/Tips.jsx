// HealthTipsPage.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { categories, tipsData } from "../components/Data/data";
import Navbar from "../components/layout/Navbar"; // Updated path
import Footer from "../components/layout/Footer"; // Updated path

export default function HealthTipsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);

  const filteredTips =
    selectedCategory === "All"
      ? tipsData
      : tipsData.filter((tip) => tip.category === selectedCategory);

  const visibleTips = filteredTips.slice(0, visibleCount);

  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex py-20">
        {/* Sidebar */}
        <aside className="w-1/5 p-6 bg-white shadow-md hidden md:block">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Categories</h2>
          <ul className="space-y-2">
            {["All", ...categories].map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => {
                    setSelectedCategory(cat);
                    setVisibleCount(8);
                  }}
                  className={`text-left w-full px-3 py-2 rounded-md transition ${
                    selectedCategory === cat
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          <h1 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 p-10 rounded-lg shadow-lg ">
            Health Tips
          </h1>

          {/* Tips grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                  {tip.title}
                </h3>
                <p className="text-gray-600 text-center">{tip.description}</p>
              </motion.div>
            ))}
          </div>

          {visibleCount < filteredTips.length && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
              >
                See More
              </button>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
