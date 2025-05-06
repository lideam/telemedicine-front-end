import { useState, useEffect } from "react";
import DoctorNav from "../../components/layout/DoctorNav";
import { Dialog } from "@headlessui/react";
import { FaCalendarAlt } from "react-icons/fa";

// Placeholder data for appointments
const appointmentsData = [
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
  const [availability, setAvailability] = useState([]);
  const [newSlot, setNewSlot] = useState({ date: "", time: "" });
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState(appointmentsData);
  const [doctorId, setDoctorId] = useState(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      const user = JSON.parse(storedUserInfo);

      // First get the user ID
      const userId = user._id;

      // Then fetch the corresponding doctor profile using userId
      const fetchDoctorId = async () => {
        try {
          const res = await fetch(
            `http://localhost:5000/api/doctors/user/${userId}`
          );
          const data = await res.json();

          if (res.ok && data.doctor) {
            setDoctorId(data.doctor._id); // The actual doctor _id
          } else {
            console.error("Doctor not found for this user.");
          }
        } catch (error) {
          console.error("Error fetching doctor by user ID:", error);
        }
      };

      fetchDoctorId();
    }
  }, []);

  const closeModal = () => setOpenModal(false);

  const handleAddAvailability = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/doctors/${doctorId}/availability`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: newSlot.date,
            timeSlots: [newSlot.time],
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setAvailability([
          ...availability,
          { date: newSlot.date, time: newSlot.time },
        ]);
        setNewSlot({ date: "", time: "" });
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      alert("Error adding availability");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!doctorId) return;
    const fetchAvailability = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/doctors/${doctorId}/availability`
        );

        const data = await response.json();
        if (response.ok) {
          setAvailability(data.availability);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching availability:", error);
      }
    };
    fetchAvailability();
  }, [doctorId]);

  const handleConfirmAppointment = async (appointmentId) => {
    try {
      const response = await fetch(
        `/api/appointments/${appointmentId}/confirm`,
        {
          method: "PATCH",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setAppointments(
          appointments.map((appt) =>
            appt.id === appointmentId ? { ...appt, status: "Confirmed" } : appt
          )
        );
      } else {
        alert("Error confirming appointment: " + data.message);
      }
    } catch (error) {
      alert("Error confirming appointment");
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const response = await fetch(
        `/api/appointments/${appointmentId}/cancel`,
        {
          method: "PATCH",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setAppointments(
          appointments.map((appt) =>
            appt.id === appointmentId ? { ...appt, status: "Cancelled" } : appt
          )
        );
      } else {
        alert("Error canceling appointment: " + data.message);
      }
    } catch (error) {
      alert("Error canceling appointment");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DoctorNav />
      <main className="flex-1 p-6 pt-0 overflow-y-auto ml-64 space-y-6">
        {/* Header with ID */}
        <section className="bg-white p-3 pl-6 -ml-6 -mr-6 shadow-lg flex items-center gap-5 justify-between">
          <div className="flex items-center gap-5">
            <FaCalendarAlt className="text-blue-600 text-3xl" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Doctor's Appointments
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your scheduled appointments
              </p>
            </div>
          </div>
          {doctorId && (
            <div className="text-gray-500 text-sm">
              Doctor ID:{" "}
              <span className="font-mono text-gray-700">{doctorId}</span>
            </div>
          )}
        </section>

        {/* Availability Form */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Set Your Availability
          </h2>
          <form onSubmit={handleAddAvailability} className="space-y-4">
            <div>
              <label className="block text-gray-700">Date</label>
              <input
                type="date"
                value={newSlot.date}
                onChange={(e) =>
                  setNewSlot({ ...newSlot, date: e.target.value })
                }
                required
                className="mt-2 p-2 w-full border rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700">Time</label>
              <input
                type="time"
                value={newSlot.time}
                onChange={(e) =>
                  setNewSlot({ ...newSlot, time: e.target.value })
                }
                required
                className="mt-2 p-2 w-full border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Availability"}
            </button>
          </form>
        </div>

        {/* Availability List */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your Available Slots
          </h2>
          <div className="space-y-2">
            {availability.length > 0 ? (
              availability.map((slot, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-800">
                    {`${slot.date} - ${slot.time}`}
                  </span>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={async () => {
                      try {
                        const response = await fetch(
                          `/api/doctors/${doctorId}/availability/${slot.id}`,
                          { method: "DELETE" }
                        );
                        if (response.ok) {
                          setAvailability(
                            availability.filter((_, idx) => idx !== index)
                          );
                        } else {
                          alert("Error removing availability");
                        }
                      } catch (error) {
                        alert("Error removing availability");
                      }
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p>No available slots set yet.</p>
            )}
          </div>
        </div>

        {/* Appointment Table */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Upcoming Appointments
          </h2>
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
                    <td className="py-3 px-4">{appt.status}</td>
                    <td className="py-3 px-4 space-x-2">
                      {appt.status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleConfirmAppointment(appt.id)}
                            className="text-blue-600 hover:underline"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => handleCancelAppointment(appt.id)}
                            className="text-red-600 hover:underline"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Appointment Modal */}
      <Dialog open={openModal} onClose={closeModal}>
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-xl w-1/3 max-w-lg">
            {selectedAppointment && (
              <>
                <h2 className="text-xl font-semibold mb-4">
                  Appointment Details
                </h2>
                <div className="mb-2">
                  <strong>Patient:</strong> {selectedAppointment.patient}
                </div>
                <div className="mb-2">
                  <strong>Date:</strong> {selectedAppointment.date}
                </div>
                <div className="mb-2">
                  <strong>Time:</strong> {selectedAppointment.time}
                </div>
                <div className="mb-2">
                  <strong>Type:</strong> {selectedAppointment.type}
                </div>
                <div className="mb-2">
                  <strong>Contact:</strong> {selectedAppointment.contact}
                </div>
                <div className="mb-2">
                  <strong>Reason:</strong> {selectedAppointment.reason}
                </div>
                <button
                  onClick={closeModal}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DoctorAppointmentPage;
