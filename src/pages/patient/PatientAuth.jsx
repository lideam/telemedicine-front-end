import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

const PatientAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
    if (!isLogin && (!formData.firstName || !formData.lastName)) {
      setError("First name and last name are required.");
      return;
    }

    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";

    const payload = isLogin
      ? {
          email: formData.email,
          password: formData.password,
        }
      : {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          role: "patient",
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

      localStorage.setItem("userInfo", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      localStorage.setItem("role", "patient");

      navigate("/patient-dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm py-3 px-6 mb-2">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
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
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
            {isLogin ? "Patient Login" : "Patient Sign Up"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </>
            )}
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
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          {isLogin && (
            <p className="text-center mt-2">
              <a
                href="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Forgot Password?
              </a>
            </p>
          )}

          <p className="text-center mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 ml-1"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>

          <div className="mt-4 text-center">
            <p>Or log in with</p>
            <div className="flex justify-center space-x-4 mt-2">
              <button className="bg-red-600 text-white p-2 rounded-lg">
                Google
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-sm">
            <p>
              By signing up, you agree to our{" "}
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

        <div className="w-1/2 hidden md:block">
          <img
            src="https://images.pexels.com/photos/4031820/pexels-photo-4031820.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Patient Login"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <footer className="w-full bg-gray-800 text-center mt-2 text-white py-3">
        <div className="text-center">
          <p>&copy; 2025 HealthCare Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PatientAuth;
