import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

const DoctorAuth = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    const url = "http://localhost:5000/api/auth/login";

    const payload = {
      email: formData.email,
      password: formData.password,
      role: "doctor",
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Save user info & token temporarily
      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // Navigate to doctor dashboard
      navigate("/doctor-dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm py-3 px-6 mb-2 sm:mb-3 md:mb-4 lg:mb-6">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          {/* Logo / Site Name */}
          <Link
            to="/"
            className="flex items-center gap-2 text-blue-600 font-bold text-xl"
          >
            <img src={logo} alt="Logo" className="h-6 w-auto" />
            TeleMedicine
          </Link>
        </div>
      </header>
      <div className="flex flex-1 w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
            Doctor Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {/* Error message */}
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>

          {/* Forgot password link */}
          <p className="text-center mt-2">
            <a
              href="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </a>
          </p>

          {/* Social media login */}
          <div className="mt-4 text-center">
            <p>Or log in with</p>
            <div className="flex justify-center space-x-4 mt-2">
              <button className="bg-red-600 text-white p-2 rounded-lg">
                Google
              </button>
            </div>
          </div>

          {/* Privacy and Terms links */}
          <div className="mt-6 text-center text-sm">
            <p>
              By signing in, you agree to our{" "}
              <a
                href="/privacy-policy"
                className="text-blue-500 hover:underline"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="/terms-of-service"
                className="text-blue-500 hover:underline"
              >
                Terms of Service
              </a>
              .
            </p>
          </div>
        </div>

        {/* Right Side - Online Image */}
        <div className="w-1/2 hidden md:block">
          <img
            src="https://images.pexels.com/photos/4031820/pexels-photo-4031820.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Doctor Login"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-center mt-2 sm:mt-3 md:mt-4 lg:mt-6 text-white py-3">
        <div className="text-center">
          <p>&copy; 2025 HealthCare Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DoctorAuth;
