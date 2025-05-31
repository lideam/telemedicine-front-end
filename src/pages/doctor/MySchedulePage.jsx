import { useState, useEffect } from "react";
import DoctorNav from "../../components/layout/DoctorNav";
import { FaCalendarAlt } from "react-icons/fa";
const API_BASE_URL = import.meta.env.VITE_API_URL;

const MySchedule = () => {
  const [doctorId, setDoctorId] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [patientsMap, setPatientsMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScheduleAndAppointments = async () => {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (!storedUserInfo) return;

      const { user, token } = JSON.parse(storedUserInfo);
      if (!user?._id) {
        console.error("User ID missing in localStorage");
        return;
      }

      try {
        // Fetch doctor data
        const doctorRes = await fetch(`${API_BASE_URL}/api/user/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!doctorRes.ok) throw new Error("Failed to fetch doctor info");
        const doctorData = await doctorRes.json();

        setDoctorId(doctorData._id);

        // Fetch schedule for doctor
        const scheduleRes = await fetch(
          `${API_BASE_URL}/api/schedule/user/${doctorData._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!scheduleRes.ok) throw new Error("Failed to fetch schedule");
        const scheduleData = await scheduleRes.json();
        setSchedule(scheduleData);

        // Fetch appointments for doctor
        const apptRes = await fetch(
          `${API_BASE_URL}/api/appointment/doctor/${doctorData._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!apptRes.ok) throw new Error("Failed to fetch appointments");
        const apptData = await apptRes.json();
        setAppointments(apptData);

        // Fetch patients info for appointment patientIds
        const uniquePatientIds = [
          ...new Set(apptData.map((a) => a.patientId)),
        ].filter(Boolean);
        const patientFetches = uniquePatientIds.map((pid) =>
          fetch(`${API_BASE_URL}/api/user/${pid}`, {
            headers: { Authorization: `Bearer ${token}` },
          }).then((res) => {
            if (!res.ok) throw new Error(`Failed to fetch patient ${pid}`);
            return res.json();
          })
        );

        const patientsData = await Promise.all(patientFetches);
        const patientsMapTemp = {};
        patientsData.forEach((p) => {
          patientsMapTemp[p._id] = p;
        });
        setPatientsMap(patientsMapTemp);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching schedule and appointments:", err);
        setLoading(false);
      }
    };

    fetchScheduleAndAppointments();
  }, []);

  if (loading)
    return <p className="p-6">Loading your schedule and appointments...</p>;

  if (!schedule)
    return (
      <div className="p-6">
        <p>No schedule found for your account.</p>
      </div>
    );

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
        <section className="bg-white p-4 flex items-center gap-4 shadow">
          <FaCalendarAlt className="text-blue-600 text-3xl" />
          <h1 className="text-2xl font-bold text-gray-800">
            My Schedule & Appointments
          </h1>
        </section>

        {/* Weekly Schedule Display */}
        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Weekly Schedule</h2>
          <ul>
            {daysOfWeek.map((day) => (
              <li key={day} className="mb-2 capitalize">
                <strong>{day}:</strong>{" "}
                {schedule.weeklySchedule?.[day]?.length > 0
                  ? schedule.weeklySchedule[day].join(", ")
                  : "No slots"}
              </li>
            ))}
          </ul>
        </section>

        {/* Exceptions Display */}
        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Exceptions</h2>
          {schedule.exceptions?.length > 0 ? (
            <ul>
              {schedule.exceptions.map((ex, idx) => (
                <li key={idx}>
                  <strong>{ex.date.split("T")[0]}:</strong>{" "}
                  {ex.timeSlots.join(", ")}
                </li>
              ))}
            </ul>
          ) : (
            <p>No exceptions.</p>
          )}
        </section>

        {/* Session Info */}
        <section className="bg-white p-6 rounded shadow max-w-md">
          <h2 className="text-xl font-semibold mb-4">Session Info</h2>
          <p>
            <strong>Duration:</strong> {schedule.sessionDuration} minutes
          </p>
          <p>
            <strong>Price:</strong> {schedule.sessionPrice.toFixed(2)}
          </p>
        </section>

        {/* Upcoming Appointments */}
        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
          {appointments.length === 0 ? (
            <p>No upcoming appointments.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-2">Patient</th>
                  <th className="border-b p-2">Date & Time</th>
                  <th className="border-b p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => {
                  const patient = patientsMap[appt.patientId];
                  return (
                    <tr key={appt._id} className="border-b">
                      <td className="p-2">
                        {patient
                          ? `${patient.firstName} ${patient.lastName}`
                          : "Unknown Patient"}
                      </td>
                      <td className="p-2">
                        {new Date(appt.appointmentDate).toLocaleString()}
                      </td>
                      <td className="p-2 capitalize">
                        {appt.appointmentStatus}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
};

export default MySchedule;
