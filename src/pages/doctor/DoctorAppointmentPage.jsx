import { useState, useEffect } from "react";
import DoctorNav from "../../components/layout/DoctorNav";
import { FaCalendarAlt } from "react-icons/fa";

const DoctorAppointmentPage = () => {
  const [availability, setAvailability] = useState([]);
  const [newSlot, setNewSlot] = useState({ date: "", time: "" });
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [doctorId, setDoctorId] = useState(null);
  const [editingSlotId, setEditingSlotId] = useState(null);
  const [updatedSlot, setUpdatedSlot] = useState({ time: "" });

  useEffect(() => {
    const fetchDoctorData = async () => {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (!storedUserInfo) return;
      const user = JSON.parse(storedUserInfo);

      try {
        // Fetch doctor info
        const doctorRes = await fetch(
          `http://localhost:5000/api/doctors/user/${user._id}`
        );
        const doctorData = await doctorRes.json();

        if (doctorRes.ok && doctorData._id) {
          setDoctorId(doctorData._id);
          setAvailability(doctorData.availability || []);

          // Fetch appointments for this doctor
          const apptRes = await fetch(
            `http://localhost:5000/api/appointments/doctor/${doctorData._id}`
          );
          const appts = await apptRes.json();

          if (apptRes.ok) {
            setAppointments(appts);
          } else {
            console.error("Failed to fetch appointments.");
          }
        } else {
          console.error("Doctor not found for this user.");
        }
      } catch (error) {
        console.error("Error fetching doctor or appointments:", error);
      }
    };

    fetchDoctorData();
  }, []);

  const handleAddAvailability = async (e) => {
    e.preventDefault();
    if (!newSlot.date || !newSlot.time) {
      alert("Please enter both date and time.");
      return;
    }
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
        setAvailability((prev) => [
          ...prev,
          { _id: data._id, date: newSlot.date, timeSlots: [newSlot.time] },
        ]);
        setNewSlot({ date: "", time: "" });
      } else {
        alert("Error: " + data.message);
      }
    } catch {
      alert("Error adding availability");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAvailability = async (availabilityId) => {
    if (!updatedSlot.time) {
      alert("Please enter the time.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/doctors/${doctorId}/availability/${availabilityId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timeSlots: [updatedSlot.time],
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setAvailability((prev) =>
          prev.map((slot) =>
            slot._id === availabilityId
              ? {
                  ...slot,
                  timeSlots: [updatedSlot.time],
                }
              : slot
          )
        );
        setEditingSlotId(null);
      } else {
        console.error("Error:", data.message);
        alert("Update failed: " + data.message);
      }
    } catch (error) {
      console.error("Error updating availability:", error);
      alert("Error updating availability.");
    }
  };

  const handleEditAvailability = (slot) => {
    setEditingSlotId(slot._id);
    setUpdatedSlot({ time: slot.timeSlots[0] });
  };

  const handleRemoveAvailability = async (availabilityId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/doctors/${doctorId}/availability/${availabilityId}`,
        { method: "DELETE" }
      );
      const data = await response.json();
      if (response.ok) {
        setAvailability((prev) =>
          prev.filter((slot) => slot._id !== availabilityId)
        );
      } else {
        alert("Delete failed: " + data.message);
      }
    } catch {
      alert("Error deleting availability.");
    }
  };

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/appointments/${appointmentId}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      const updated = await response.json();

      if (response.ok) {
        setAppointments((prev) =>
          prev.map((appt) => (appt._id === updated._id ? updated : appt))
        );
      } else {
        alert(updated.message || "Status update failed");
      }
    } catch (err) {
      console.error("Status update failed", err);
      alert("Error updating appointment status.");
    }
  };

  const handleConfirmAppointment = (appointmentId) => {
    handleStatusUpdate(appointmentId, "Confirmed");
  };

  const handleCancelAppointment = (appointmentId) => {
    handleStatusUpdate(appointmentId, "Declined");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DoctorNav />
      <main className="flex-1 p-6 pt-0 overflow-y-auto ml-64 space-y-6">
        <section className="bg-white p-3 pl-6 -ml-6 -mr-6 shadow-lg flex items-center gap-5 justify-between">
          <div className="flex items-center gap-5">
            <FaCalendarAlt className="text-blue-600 text-3xl" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Doctor's Appointments
              </h1>
              <p className="text-gray-500">
                Manage your schedule and appointments
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Set Availability</h2>
          <form
            onSubmit={handleAddAvailability}
            className="flex gap-3 items-center mb-4"
          >
            <input
              type="date"
              value={newSlot.date}
              onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
              required
              className="border px-2 py-1 rounded"
            />
            <input
              type="time"
              value={newSlot.time}
              onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })}
              required
              className="border px-2 py-1 rounded"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </form>
          {availability.length > 0 ? (
            availability.map((slot) => (
              <div
                key={slot._id}
                className="border p-3 mb-2 rounded bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <strong>{new Date(slot.date).toLocaleDateString()}:</strong>{" "}
                    {slot.timeSlots.join(", ")}
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="text-blue-600"
                      onClick={() => handleEditAvailability(slot)}
                    >
                      Edit Availability
                    </button>

                    <button
                      className="text-red-600"
                      onClick={() => handleRemoveAvailability(slot._id)}
                    >
                      Remove Availability
                    </button>
                  </div>
                </div>

                {editingSlotId === slot._id && (
                  <div className="mt-4">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdateAvailability(slot._id);
                      }}
                      className="flex gap-3"
                    >
                      <input
                        type="time"
                        value={updatedSlot.time}
                        onChange={(e) =>
                          setUpdatedSlot({
                            ...updatedSlot,
                            time: e.target.value,
                          })
                        }
                        required
                        className="border px-2 py-1 rounded"
                      />
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                      >
                        Save Changes
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No availability set.</p>
          )}
        </section>

        <section className="bg-white p-6 rounded shadow mt-6">
          <h2 className="text-xl font-semibold mb-4">Appointments</h2>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="flex justify-between items-center mb-3 border p-3 rounded bg-gray-50"
              >
                <div>
                  <strong>
                    {appointment.patientId?.name || "Unknown Patient"}
                  </strong>

                  <div>
                    {new Date(appointment.date).toLocaleDateString()} |{" "}
                    {appointment.time} -{" "}
                    <span className="font-semibold">{appointment.status}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    onClick={() => handleConfirmAppointment(appointment._id)}
                  >
                    Confirm
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => handleCancelAppointment(appointment._id)}
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No upcoming appointments.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default DoctorAppointmentPage;
