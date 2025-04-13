import React from "react";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="relative text-white py-16 px-6 bg-cover bg-center flex items-center ">
      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-100 "
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1661627175396-55247897e9bf?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.7)",
        }}
      ></div>

      {/* Content */}
      <div className="relative max-w-2xl p-8 rounded-lg ml-1">
        <h2 className="text-4xl font-bold mb-4">
          Start Your Healthcare Journey <br />
          <span className="text-blue-300">Today</span>
        </h2>
        <p className="text-xl mb-6">
          Join thousands who trust us for online medical consultations. Sign up
          now to get access to certified doctors anytime, anywhere.
        </p>
        <div className="flex gap-6">
          <button
            onClick={() => navigate("/patient-auth")}
            className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
          >
            Sign Up as Patient
          </button>
          <button
            onClick={() => navigate("/doctor-login")}
            className="px-8 py-4 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition"
          >
            Log in as Doctor
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
