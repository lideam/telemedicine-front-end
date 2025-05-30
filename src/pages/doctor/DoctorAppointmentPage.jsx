import { useState, useEffect } from "react";
import DoctorNav from "../../components/layout/DoctorNav";
import { FaCalendarAlt } from "react-icons/fa";

const DoctorAppointmentPage = () => {
  const initialScheduleState = {
    weeklySchedule: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    },
    exceptions: [],
    sessionDuration: 30,
    sessionPrice: 0,
    _id: null,
  };

  const [schedule, setSchedule] = useState(initialScheduleState);
  const [editMode, setEditMode] = useState(false);
  const [fetchedSchedule, setFetchedSchedule] = useState(null);

  const [doctorId, setDoctorId] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loadingSave, setLoadingSave] = useState(false);
  const [patientsMap, setPatientsMap] = useState({});

  useEffect(() => {
    const fetchDoctorAndSchedule = async () => {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (!storedUserInfo) return;

      const userInfo = JSON.parse(storedUserInfo);
      const userId = userInfo.user?._id;
      const token = userInfo.token;

      if (!userId) {
        console.error("User ID not found in localStorage.");
        return;
      }

      try {
        const doctorRes = await fetch(
          `http://localhost:5000/api/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const doctorData = await doctorRes.json();

        if (doctorRes.ok && doctorData._id) {
          setDoctorId(doctorData._id);

          // Fetch schedule
          const scheduleRes = await fetch(
            `http://localhost:5000/api/schedule/user/${doctorData._id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (scheduleRes.ok) {
            const scheduleData = await scheduleRes.json();
            setFetchedSchedule(scheduleData);
          } else {
            console.warn("No schedule found for this doctor yet.");
          }

          // Fetch appointments
          const appointmentRes = await fetch(
            `http://localhost:5000/api/appointment/doctor/${doctorData._id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (appointmentRes.ok) {
            const appointmentsData = await appointmentRes.json();
            setAppointments(appointmentsData);

            // --- NEW: Fetch patient details for all unique patientIds ---
            const uniquePatientIds = [
              ...new Set(appointmentsData.map((appt) => appt.patientId)),
            ].filter(Boolean); // filter out any null/undefined

            // Fetch all patients in parallel
            const patientFetches = uniquePatientIds.map((pid) =>
              fetch(`http://localhost:5000/api/user/${pid}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }).then((res) => {
                if (!res.ok) throw new Error(`Failed to fetch patient ${pid}`);
                return res.json();
              })
            );

            try {
              const patientsData = await Promise.all(patientFetches);
              const map = {};
              patientsData.forEach((p) => {
                map[p._id] = p;
              });
              setPatientsMap(map);
            } catch (patientFetchError) {
              console.error("Error fetching patients data", patientFetchError);
            }
          } else {
            console.warn("No appointments found.");
          }
        } else {
          console.error("Doctor not found for this user.");
        }
      } catch (error) {
        console.error(
          "Error fetching doctor, schedule or appointments:",
          error
        );
      }
    };

    fetchDoctorAndSchedule();
  }, []);

  // Handle changes for weekly schedule timeslots
  const handleWeeklyTimeChange = (day, index, value) => {
    const updatedDaySlots = [...schedule.weeklySchedule[day]];
    updatedDaySlots[index] = value;
    setSchedule((prev) => ({
      ...prev,
      weeklySchedule: { ...prev.weeklySchedule, [day]: updatedDaySlots },
    }));
  };

  const handleAddWeeklyTimeSlot = (day) => {
    setSchedule((prev) => ({
      ...prev,
      weeklySchedule: {
        ...prev.weeklySchedule,
        [day]: [...prev.weeklySchedule[day], ""],
      },
    }));
  };

  const handleRemoveWeeklyTimeSlot = (day, index) => {
    const updatedDaySlots = schedule.weeklySchedule[day].filter(
      (_, i) => i !== index
    );
    setSchedule((prev) => ({
      ...prev,
      weeklySchedule: { ...prev.weeklySchedule, [day]: updatedDaySlots },
    }));
  };

  // Handle changes for exceptions
  const handleExceptionDateChange = (index, value) => {
    const updatedExceptions = [...schedule.exceptions];
    updatedExceptions[index].date = value;
    setSchedule((prev) => ({ ...prev, exceptions: updatedExceptions }));
  };

  const handleExceptionTimeChange = (exIndex, timeIndex, value) => {
    const updatedExceptions = [...schedule.exceptions];
    updatedExceptions[exIndex].timeSlots[timeIndex] = value;
    setSchedule((prev) => ({ ...prev, exceptions: updatedExceptions }));
  };

  const handleAddExceptionTimeSlot = (exIndex) => {
    const updatedExceptions = [...schedule.exceptions];
    updatedExceptions[exIndex].timeSlots.push("");
    setSchedule((prev) => ({ ...prev, exceptions: updatedExceptions }));
  };

  const handleRemoveExceptionTimeSlot = (exIndex, timeIndex) => {
    const updatedExceptions = [...schedule.exceptions];
    updatedExceptions[exIndex].timeSlots = updatedExceptions[
      exIndex
    ].timeSlots.filter((_, i) => i !== timeIndex);
    setSchedule((prev) => ({ ...prev, exceptions: updatedExceptions }));
  };

  const handleAddException = () => {
    setSchedule((prev) => ({
      ...prev,
      exceptions: [...prev.exceptions, { date: "", timeSlots: [] }],
    }));
  };

  const handleRemoveException = (index) => {
    setSchedule((prev) => ({
      ...prev,
      exceptions: prev.exceptions.filter((_, i) => i !== index),
    }));
  };

  // Save schedule handler
  const saveSchedule = async () => {
    if (!doctorId) return alert("Doctor ID missing!");
    setLoadingSave(true);

    try {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (!storedUserInfo) {
        alert("User not authenticated");
        setLoadingSave(false);
        return;
      }
      const userInfo = JSON.parse(storedUserInfo);
      const token = userInfo.token;

      // Save or update the main schedule
      const method = schedule._id ? "PUT" : "POST";
      const url = schedule._id
        ? `http://localhost:5000/api/schedule/${schedule._id}`
        : `http://localhost:5000/api/schedule`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // <-- Add this!
        },
        body: JSON.stringify({ ...schedule, doctorId }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert("Failed to save schedule: " + err.message);
        setLoadingSave(false);
        return;
      }

      const savedData = await res.json();
      setSchedule(savedData);

      // Now update weekly schedule explicitly
      await fetch(
        `http://localhost:5000/api/schedule/update-weekly-schedule/${savedData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // <-- Add here too!
          },
          body: JSON.stringify({
            weeklySchedule: savedData.weeklySchedule,
          }),
        }
      );

      // Update exceptions
      for (const exception of savedData.exceptions) {
        if (exception._id) {
          await fetch(
            `http://localhost:5000/api/schedule/update-exception-by-date/${savedData._id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // <-- And here!
              },
              body: JSON.stringify({
                date: exception.date,
                timeSlots: exception.timeSlots,
              }),
            }
          );
        }
      }

      alert("Schedule and exceptions saved successfully!");
      setFetchedSchedule(savedData); // Update reference
      setEditMode(false); // Exit edit mode
      setSchedule(initialScheduleState); // ✅ Reset form
    } catch (error) {
      console.error(error);
      alert("Error saving schedule");
    } finally {
      setLoadingSave(false);
    }
  };

  // Appointment status update functions (unchanged)
  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      const storedUserInfo = localStorage.getItem("userInfo");
      const token = storedUserInfo ? JSON.parse(storedUserInfo).token : null;

      const response = await fetch(
        `http://localhost:5000/api/appointment/update-status/${appointmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({ appointmentStatus: newStatus }),
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

  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DoctorNav />
      <main className="flex-1 p-6 pt-0 overflow-y-auto ml-64 space-y-6">
        <section className="bg-white p-3 pl-6 -ml-6 -mr-6 shadow-lg flex items-center gap-5 justify-between">
          <div className="flex items-center gap-5">
            <FaCalendarAlt className="text-blue-600 text-3xl" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Doctor's Appointments & Schedule
              </h1>
              <p className="text-gray-500">
                Manage your weekly schedule, exceptions, and appointments
              </p>
            </div>
          </div>
        </section>

        {/* Weekly Schedule Section */}
        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Weekly Schedule</h2>
          {daysOfWeek.map((day) => (
            <div key={day} className="mb-4 border-b pb-3">
              <h3 className="capitalize font-semibold mb-2">{day}</h3>
              <div className="flex flex-wrap gap-2 items-center">
                {schedule.weeklySchedule[day].map((time, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <input
                      type="time"
                      value={time}
                      onChange={(e) =>
                        handleWeeklyTimeChange(day, index, e.target.value)
                      }
                      className="border px-2 py-1 rounded"
                    />
                    <button
                      onClick={() => handleRemoveWeeklyTimeSlot(day, index)}
                      className="text-red-600 font-bold"
                      type="button"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleAddWeeklyTimeSlot(day)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  type="button"
                >
                  Add Time Slot
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Exceptions Section */}
        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Exception Dates</h2>
          {schedule.exceptions.length > 0 ? (
            schedule.exceptions.map((ex, idx) => (
              <div
                key={idx}
                className="mb-4 border p-3 rounded bg-gray-50 flex flex-col gap-2"
              >
                <div className="flex items-center gap-3">
                  <label>
                    Date:{" "}
                    <input
                      type="date"
                      value={ex.date ? ex.date.split("T")[0] : ""}
                      onChange={(e) =>
                        handleExceptionDateChange(idx, e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    />
                  </label>
                  <button
                    onClick={() => handleRemoveException(idx)}
                    className="ml-auto text-red-600 font-bold"
                    type="button"
                  >
                    Remove Exception
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  {ex.timeSlots.map((time, tIdx) => (
                    <div key={tIdx} className="flex items-center gap-1">
                      <input
                        type="time"
                        value={time}
                        onChange={(e) =>
                          handleExceptionTimeChange(idx, tIdx, e.target.value)
                        }
                        className="border px-2 py-1 rounded"
                      />
                      <button
                        onClick={() => handleRemoveExceptionTimeSlot(idx, tIdx)}
                        className="text-red-600 font-bold"
                        type="button"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => handleAddExceptionTimeSlot(idx)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    type="button"
                  >
                    Add Time Slot
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No exceptions added.</p>
          )}
          <button
            onClick={handleAddException}
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            type="button"
          >
            Add Exception
          </button>
        </section>

        {/* Session Info Section */}
        <section className="bg-white p-6 rounded shadow max-w-md">
          <h2 className="text-xl font-semibold mb-4">Session Info</h2>
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Session Duration (minutes):
            </label>
            <input
              type="number"
              min={1}
              value={schedule.sessionDuration}
              onChange={(e) =>
                setSchedule((prev) => ({
                  ...prev,
                  sessionDuration: Number(e.target.value),
                }))
              }
              className="border rounded px-3 py-1 w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Session Price (ETB):
            </label>
            <input
              type="number"
              step="0.01"
              min={0}
              value={schedule.sessionPrice}
              onChange={(e) =>
                setSchedule((prev) => ({
                  ...prev,
                  sessionPrice: Number(e.target.value),
                }))
              }
              className="border rounded px-3 py-1 w-full"
            />
          </div>
          <button
            onClick={saveSchedule}
            disabled={loadingSave}
            className={`mt-4 px-6 py-2 rounded text-white ${
              loadingSave ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
            type="button"
          >
            {loadingSave ? "Saving..." : "Save Schedule"}
          </button>
        </section>

        {/* Fetched Schedule Summary Section */}
        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">
            Current Fetched Schedule
          </h2>
          {fetchedSchedule ? (
            <div className="space-y-2">
              <div>
                <strong>Session Duration:</strong>{" "}
                {fetchedSchedule.sessionDuration} minutes
              </div>
              <div>
                <strong>Session Price: </strong>
                {fetchedSchedule.sessionPrice.toFixed(2)}
              </div>
              <div>
                <strong>Weekly Schedule:</strong>
                <ul className="list-disc ml-6 mt-1">
                  {daysOfWeek.map((day) => (
                    <li key={day} className="capitalize">
                      {day}:{" "}
                      {fetchedSchedule.weeklySchedule?.[day]?.length > 0
                        ? fetchedSchedule.weeklySchedule[day].join(", ")
                        : "No slots"}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Exceptions:</strong>
                <ul className="list-disc ml-6 mt-1">
                  {fetchedSchedule.exceptions.length > 0 ? (
                    fetchedSchedule.exceptions.map((ex, idx) => (
                      <li key={idx}>
                        {ex.date.split("T")[0]}: {ex.timeSlots.join(", ")}
                      </li>
                    ))
                  ) : (
                    <li>No exceptions</li>
                  )}
                </ul>
              </div>
            </div>
          ) : (
            <p>No schedule fetched yet.</p>
          )}

          <button
            onClick={() => {
              if (fetchedSchedule) {
                setSchedule(fetchedSchedule);
                setEditMode(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Edit Schedule
          </button>
        </section>

        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Appointments</h2>
          {appointments.length === 0 ? (
            <p>No appointments yet.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4">Patient Name</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Time</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt._id} className="border-b hover:bg-gray-100">
                    <td className="py-2 px-4">
                      {patientsMap[appt.patientId]
                        ? `${patientsMap[appt.patientId].firstName} ${
                            patientsMap[appt.patientId].lastName
                          }`
                        : "Loading..."}
                    </td>
                    <td className="py-2 px-4">
                      {new Date(appt.appointmentDate).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4">{appt.appointmentTime}</td>
                    <td className="py-2 px-4">{appt.appointmentStatus}</td>
                    <td className="py-2 px-4 font-semibold">
                      {appt.appointmentStatus}
                    </td>
                    <td className="py-2 px-4 space-x-2">
                      <button
                        onClick={() => handleConfirmAppointment(appt._id)}
                        className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleCancelAppointment(appt._id)}
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
};

export default DoctorAppointmentPage;
