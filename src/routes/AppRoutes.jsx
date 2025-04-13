import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Tips from "../pages/Tips";
import Contact from "../pages/Contact";
import PatientAuth from "../pages/patient/PatientAuth";
import DoctorLogin from "../pages/DoctorLogin";
import PatientDashboard from "../pages/patient/PatientDashboard";
import DoctorDashboard from "../pages/DoctorDashboard";
import ProfilePage from "../pages/patient/ProfilePage";
import AppointmentsPage from "../pages/patient/AppointmentsPage";
import MessagesPage from "../pages/patient/MessagesPage ";
import VideoCallPage from "../pages/patient/VideoCallPage";
import PaymentPage from "../pages/patient/PaymentPage ";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/tips" element={<Tips />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/patient-auth" element={<PatientAuth />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/video-call/:appointmentId" element={<VideoCallPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
