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
import Review from "../pages/patient/Review";
import PatientNotification from "../pages/patient/PatientNotification";
import SupportPage from "../pages/patient/SupportPage";

import HealthRecords from "../pages/patient/HealthRecords";
import PaymentPage from "../pages/patient/PaymentPage";
import ChatPage from "../pages/patient/ChatPage ";
import DoctorAppointmentPage from "../pages/doctor/DoctorAppointmentPage";
import DoctorChatPage from "../pages/doctor/DoctorChatPage";
import PatientsPage from "../pages/doctor/PatientsPage";
import MySchedulePage from "../pages/doctor/MySchedulePage";
import DoctorEarningsPage from "../pages/doctor/DoctorEarningsPage";
import DoctorProfilePage from "../pages/doctor/DoctorProfilePage";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminLogin from "../pages/admin/AdminLogin";
import ProtectedAdminRoute from "../routes/ProtectedAdminRoute";
import ManageDoctors from "../pages/admin/ManageDoctors";
import ManagePatients from "../pages/admin/ManagePatients";
import ManageAppointments from "../pages/admin/ManageAppointments";

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

        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/patient-payments" element={<PaymentPage />} />
        <Route path="/patient-health-records" element={<HealthRecords />} />
        <Route path="/review" element={<Review />} />
        <Route path="/patient-notification" element={<PatientNotification />} />
        <Route path="/patient-support" element={<SupportPage />} />

        <Route
          path="/doctor/doctor-appointments"
          element={<DoctorAppointmentPage />}
        />
        <Route path="/doctor/doctor-chats" element={<DoctorChatPage />} />
        <Route path="/doctor/patients" element={<PatientsPage />} />
        <Route path="/doctor/schedule" element={<MySchedulePage />} />
        <Route path="/doctor/earnings" element={<DoctorEarningsPage />} />
        <Route path="/doctor/profile" element={<DoctorProfilePage />} />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route path="/admin/manage-doctors" element={<ManageDoctors />} />
        <Route path="/admin/manage-patients" element={<ManagePatients />} />
        <Route
          path="/admin/manage-appointments"
          element={<ManageAppointments />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
