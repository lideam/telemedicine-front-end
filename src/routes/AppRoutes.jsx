// src/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Tips from "../pages/Tips";
import Contact from "../pages/Contact";
import PatientAuth from "../pages/patient/PatientAuth";
import DoctorLogin from "../pages/doctor/DoctorLogin";
import AdminLogin from "../pages/admin/AdminLogin";
import Unauthorized from "../pages/Unauthorized";
import PatientDashboard from "../pages/patient/PatientDashboard";
import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import ProfilePage from "../pages/patient/ProfilePage";
import AppointmentsPage from "../pages/patient/AppointmentsPage";
import Review from "../pages/patient/Review";
import PatientNotification from "../pages/patient/PatientNotification";
import SupportPage from "../pages/patient/SupportPage";
import HealthRecords from "../pages/patient/HealthRecords";
import PaymentPage from "../pages/patient/PaymentPage";
import ChatPage from "../pages/patient/ChatPage";
import DoctorAppointmentPage from "../pages/doctor/DoctorAppointmentPage";
import DoctorChatPage from "../pages/doctor/DoctorChatPage";
import PatientsPage from "../pages/doctor/PatientsPage";
import MySchedulePage from "../pages/doctor/MySchedulePage";
import DoctorEarningsPage from "../pages/doctor/DoctorEarningsPage";
import DoctorProfilePage from "../pages/doctor/DoctorProfilePage";
import DoctorNotification from "../pages/doctor/DoctorNotification";
import DoctorSupportPage from "../pages/doctor/DoctorSupportPage";
import DoctorReviewPage from "../pages/doctor/DoctorReviewPage";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageDoctors from "../pages/admin/ManageDoctors";
import ManagePatients from "../pages/admin/ManagePatients";
import ManageAppointments from "../pages/admin/ManageAppointments";
import Earnings from "../pages/admin/Earnings";
import SystemSettings from "../pages/admin/SystemSettings";
import AdminAccess from "../pages/admin/AdminAccess";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/tips" element={<Tips />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/patient-auth" element={<PatientAuth />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes for Patients */}
        <Route
          path="/patient-dashboard"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-profile"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-appointments"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <AppointmentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-chats"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-payments"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-health-records"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <HealthRecords />
            </ProtectedRoute>
          }
        />
        <Route
          path="/review"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <Review />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-notification"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientNotification />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-support"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <SupportPage />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes for Doctors */}
        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/doctor-appointments"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorAppointmentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/doctor-chats"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorChatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/patients"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <PatientsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/schedule"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <MySchedulePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/earnings"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorEarningsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/profile"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/notifications"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorNotification />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/support"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorSupportPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/reviews"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorReviewPage />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes for Admins */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-doctors"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageDoctors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-patients"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManagePatients />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-appointments"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/earnings"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Earnings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <SystemSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/access-control"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminAccess />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
