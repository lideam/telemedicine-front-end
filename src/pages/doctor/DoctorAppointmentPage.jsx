import { useState } from "react";
import DoctorNav from "../../components/layout/DoctorNav";
import { Dialog } from "@headlessui/react"; // For modal
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom"; // To navigate to appointment page

const appointments = [
  {
    id: 1,
    patient: "Jane Doe",
    date: "Apr 16, 2025",
    time: "10:00 AM",
    status: "Confirmed",
    type: "Consultation",
    contact: "jane.doe@example.com",
    reason: "Follow-up checkup",
  },
  {
    id: 2,
    patient: "Michael Smith",
    date: "Apr 16, 2025",
    time: "11:30 AM",
    status: "Pending",
    type: "Consultation",
    contact: "michael.smith@example.com",
    reason: "Initial consultation",
  },
  {
    id: 3,
    patient: "Sarah Johnson",
    date: "Apr 16, 2025",
    time: "1:00 PM",
    status: "Cancelled",
    type: "Follow-up",
    contact: "sarah.johnson@example.com",
    reason: "Test results",
  },
];

const DoctorAppointmentPage = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  // Modal toggle handler
  const openAppointmentDetails = (appt) => {
    setSelectedAppointment(appt);
    setOpenModal(true);
  };

  const closeModal = () => setOpenModal(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <DoctorNav />

      {/* Main Content */}
      <main className="flex-1 p-6 pt-0 overflow-y-auto space-y-6">
        {/* Appointment Header */}
        <section className="bg-white p-3 pl-6 -ml-6 -mr-6 shadow-lg flex items-center gap-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Doctor's Appointments
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your scheduled appointments
            </p>
          </div>
        </section>

        {/* Appointment Table */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Upcoming Appointments
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="py-3 px-4">Patient</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id} className="border-b">
                    <td className="py-3 px-4">{appt.patient}</td>
                    <td className="py-3 px-4">{appt.date}</td>
                    <td className="py-3 px-4">{appt.time}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          appt.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : appt.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {appt.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => openAppointmentDetails(appt)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-xl shadow p-6 w-full lg:w-[350px]">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Calendar</h2>
          <Calendar onChange={setDate} value={date} />
        </div>
      </main>

      {/* Appointment Details Modal */}
      <Dialog
        open={openModal}
        onClose={closeModal}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      >
        <Dialog.Panel className="bg-white p-6 rounded-xl w-full max-w-md">
          {selectedAppointment && (
            <>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Appointment Details
              </h3>
              <p className="text-gray-600 mb-2">
                <strong>Patient:</strong> {selectedAppointment.patient}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Date:</strong> {selectedAppointment.date}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Time:</strong> {selectedAppointment.time}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Reason:</strong> {selectedAppointment.reason}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Contact:</strong> {selectedAppointment.contact}
              </p>

              {/* Modal Buttons based on status */}
              <div className="flex justify-end gap-4 mt-4">
                <button
                  className="text-gray-500 hover:underline"
                  onClick={closeModal}
                >
                  Close
                </button>

                {selectedAppointment.status === "Pending" && (
                  <>
                    <button className="text-green-600 hover:underline">
                      Confirm Appointment
                    </button>
                    <button className="text-red-600 hover:underline">
                      Cancel Appointment
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default DoctorAppointmentPage;
