import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Tips from "../pages/Tips";
import Contact from "../pages/Contact";
import PatientAuth from "../pages/patient/PatientAuth";
import DoctorLogin from "../pages/doctor/DoctorLogin";
import PatientDashboard from "../pages/patient/PatientDashboard";
import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import ProfilePage from "../pages/patient/ProfilePage";
import AppointmentsPage from "../pages/patient/AppointmentsPage";
import VideoCallPage from "../pages/patient/VideoCallPage";
import HealthRecords from "../pages/patient/HealthRecords";
import PaymentPage from "../pages/patient/PaymentPage";
import ChatPage from "../pages/patient/ChatPage ";
import DoctorAppointmentPage from "../pages/doctor/DoctorAppointmentPage";
import DoctorChatPage from "../pages/doctor/DoctorChatPage";

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
        <Route path="/patient-profile" element={<ProfilePage />} />
        <Route path="/patient-appointments" element={<AppointmentsPage />} />
        <Route path="/patient-chats" element={<ChatPage />} />
        <Route path="/video-call/:appointmentId" element={<VideoCallPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/patient-payments" element={<PaymentPage />} />
        <Route path="/patient-health-records" element={<HealthRecords />} />
        <Route
          path="/doctor-appointments"
          element={<DoctorAppointmentPage />}
        />
        <Route path="/doctor-chats" element={<DoctorChatPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
