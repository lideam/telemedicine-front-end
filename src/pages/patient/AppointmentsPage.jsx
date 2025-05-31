import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PatientNav from "../../components/layout/PatientNav";
import { FaCalendarAlt } from "react-icons/fa";
const API_BASE_URL = import.meta.env.VITE_API_URL;

const AppointmentsPage = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token"); // Or sessionStorage, based on your auth flow
        const response = await fetch(
          `${API_BASE_URL}/api/user/all-available-doctors`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const text = await response.text(); // fallback for non-JSON error
          throw new Error(text || "Failed to fetch");
        }

        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error.message);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("userInfo"));

        const response = await fetch(
          `${API_BASE_URL}/api/appointment/patient/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Failed to fetch appointments");
        }

        const data = await response.json();

        const formattedAppointments = data.map((appt) => ({
          ...appt,
          doctorName: appt.doctor?.firstName + " " + appt.doctor?.lastName,
          date: new Date(appt.appointmentDate).toLocaleDateString(),
          time: appt.appointmentTime,
          amount: appt.sessionPrice,
          status: appt.appointmentStatus,
          paymentStatus: appt.paymentStatus || "Pending",
        }));

        setAppointments(formattedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error.message);
      }
    };

    fetchAppointments();
  }, []);

  const handleDoctorSelect = async (doctor) => {
    setSelectedSlot(null);
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/schedule/user/${doctor._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      const { weeklySchedule, exceptions, sessionDuration, sessionPrice } =
        data;

      const today = new Date();
      const dayNames = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ];

      const slots = [];

      // Get slots for the next 7 days (or more, adjust as needed)
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(today.getDate() + i);

        const dateString = date.toISOString().split("T")[0];
        const dayName = dayNames[date.getDay()];

        // Check for exception on that date
        const exception = exceptions.find(
          (ex) => new Date(ex.date).toISOString().split("T")[0] === dateString
        );

        let timeSlots = [];

        if (exception) {
          timeSlots = exception.timeSlots;
        } else if (weeklySchedule[dayName]) {
          timeSlots = weeklySchedule[dayName];
        }

        for (const time of timeSlots) {
          slots.push({
            date: dateString,
            time: time,
          });
        }
      }

      setSelectedDoctor({
        ...doctor,
        name: doctor.firstName + " " + doctor.lastName,
        availableSlots: slots,
        sessionDuration,
        sessionPrice,
      });
    } catch (error) {
      console.error("Error fetching doctor's schedule:", error);
    }
  };

  //   const sendNotification = async ({ title, message, userId }) => {
  //   try {
  //     const token = localStorage.getItem("token");

  //     const response = await fetch("http://localhost:5000/api/notification", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: token ? `Bearer ${token}` : undefined,
  //       },
  //       body: JSON.stringify({
  //         title,
  //         message,
  //         userId,
  //         type: "system",
  //       }),
  //     });

  //     const data = await response.json();

  //     if (!response.ok) throw new Error(data.message || "Notification failed.");

  //     console.log("Notification sent successfully.");
  //   } catch (error) {
  //     console.error("Failed to send notification:", error.message);
  //   }
  // };

  const handleRequestAppointment = () => {
    if (!selectedDoctor || !selectedSlot) {
      alert("Please select a doctor and a time slot.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("userInfo"));

    const newAppointment = {
      patientId: user._id,
      doctorId: selectedDoctor._id,
      title: "General Consultation",
      sessionPrice: selectedDoctor.sessionPrice,
      sessionDuration: selectedDoctor.sessionDuration,
      sessionTime: selectedSlot.time, // ✅ this is the actual start time
      appointmentDate: new Date(selectedSlot.date).toISOString(),
      appointmentTime: selectedSlot.time,
      appointmentStatus: "pending",
    };

    fetch(`${API_BASE_URL}/api/appointment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newAppointment),
    })
      .then((res) => res.json())
      .then(async (data) => {
        setAppointments([...appointments, data]);
        setSelectedDoctor(null);
        setSelectedSlot(null);
        alert("Appointment requested! Awaiting doctor confirmation.");

        // Send notification after successful appointment request
        try {
          const notificationPayload = {
            title: "Appointment Requested",
            message:
              "You have requested a new appointment. Waiting for confirmation.",
            userId: user._id,
            type: "system",
          };

          const notifResponse = await fetch(
            `${API_BASE_URL}/api/notification`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify(notificationPayload),
            }
          );

          const notifData = await notifResponse.json();

          if (!notifResponse.ok) {
            throw new Error(notifData.message || "Notification failed.");
          }

          console.log("Appointment request notification sent successfully.");
        } catch (error) {
          console.error("Failed to send notification:", error.message);
        }
      })
      .catch((error) => {
        console.error("Error requesting appointment:", error);
        alert("Error requesting appointment.");
      });
  };

  const handlePaymentNow = async (appointment) => {
    try {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      const transactionId = `txn_${Date.now()}`;

      localStorage.setItem("chapaTxnId", transactionId); // Store it

      const response = await fetch(`${API_BASE_URL}/api/payment/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone || "0910000000",
          appointmentId: appointment._id,
          price: appointment.sessionPrice,
          paymentType: "chapa",
          transactionId: transactionId,
        }),
      });

      const data = await response.json();

      if (data.status === "success" && data.data.checkout_url) {
        window.location.href = data.data.checkout_url;
        sendNotification({
          title: "Payment Successful",
          message: "Your payment has been received. Thank you!",
          userId: user._id,
        });
      } else {
        alert("Failed to initiate payment. Please try again.");
        console.error("Payment Error:", data.message);
      }
    } catch (err) {
      console.error("Payment initiation failed:", err);
      alert("Payment could not be started. Please try again.");
    }
  };

  const handleReschedule = (appointmentId) => {
    const appointment = appointments.find((a) => a._id === appointmentId);
    if (
      appointment.status === "Declined" &&
      appointment.paymentStatus === "Paid"
    ) {
      setSelectedDoctor(
        doctors.find((doc) => doc.name === appointment.doctorName)
      );
      setSelectedSlot({ date: appointment.date, time: appointment.time });
      alert("Please choose a new time slot and request again.");
      sendNotification({
        title: "Appointment Declined",
        message: "Your appointment has been declined by the doctor.",
        userId: user._id,
      });
    }
  };

  const handleGoToChat = () => {
    navigate("/patient-chats");
  };

  const checkPaymentStatus = async (appointmentId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/payment/check-status/appointment/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to check payment status");

      const data = await response.json();

      if (data.status === "success") {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appt) =>
            appt._id === appointmentId
              ? { ...appt, paymentStatus: "Paid" }
              : appt
          )
        );
        sendNotification({
          title: "Payment Successful",
          message: "Your payment has been received. Thank you!",
          userId: user._id,
        });
      }
    } catch (err) {
      console.error("Error checking payment status:", err);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      appointments
        .filter((appt) => appt.paymentStatus === "Pending")
        .forEach((appt) => checkPaymentStatus(appt._id));
    }, 3500); // check every 3.5 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, [appointments]);

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      <PatientNav />
      <main className="flex-1 p-6 pt-0 overflow-y-auto ml-64 space-y-6">
        <section className="bg-white p-3 pl-6 -ml-6 -mr-6 shadow-lg flex items-center gap-5">
          <FaCalendarAlt className="text-blue-600 text-4xl" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Available Doctors
            </h1>
            <p className="text-gray-600 mt-1">
              Book an appointment with your preferred doctor
            </p>
          </div>
        </section>

        {/* Doctor List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors
            .filter((doctor) => doctor.firstName && doctor.lastName)
            .map((doctor) => (
              <div
                key={doctor._id}
                onClick={() => handleDoctorSelect(doctor)}
                className={`p-4 rounded-lg shadow-md cursor-pointer border transition-transform duration-200 ${
                  selectedDoctor?._id === doctor._id
                    ? "bg-blue-100 border-blue-500 scale-105"
                    : "bg-white"
                }`}
              >
                <img
                  src={doctor.image}
                  alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="text-lg font-bold text-center">
                  Dr. {doctor.firstName} {doctor.lastName}
                </h4>
                <p className="text-center text-sm text-gray-600">
                  {doctor._medicalProfile?.specialty || "No specialty"}
                </p>
                <p className="text-center text-sm">
                  Experience:{" "}
                  {doctor._medicalProfile?.yearsOfExperience || "N/A"} years
                </p>
                <p className="text-center text-sm">
                  Clinic: {doctor._medicalProfile?.currentHospital || "N/A"}
                </p>
                <p className="text-center text-sm">
                  Rating: ⭐{" "}
                  {doctor._statistics?.avgRating?.toFixed(1) || "N/A"}
                </p>

                <p className="text-center text-sm italic text-gray-500 mt-2">
                  {doctor.bio}
                </p>
              </div>
            ))}
        </div>

        {/* Time Slot Selection */}
        {selectedDoctor &&
          (selectedDoctor.availableSlots &&
          selectedDoctor.availableSlots.length > 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Choose Time with {selectedDoctor.name}
              </h3>
              <p className="text-lg text-gray-700 mb-4">
                <strong>
                  Session Duration: {selectedDoctor.sessionDuration} minutes{" "}
                </strong>{" "}
                <br />
                <strong>Session Fee: {selectedDoctor.sessionPrice} ETB</strong>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedDoctor.availableSlots.map((slot, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg cursor-pointer transition ${
                      selectedSlot?.time === slot.time
                        ? "bg-blue-100 border-blue-500"
                        : "bg-white"
                    }`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    <p>
                      <strong>Date:</strong> {slot.date}
                    </p>
                    <p>
                      <strong>Time:</strong> {slot.time}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={handleRequestAppointment}
                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Request Appointment
              </button>
            </div>
          ) : (
            <p className="mt-4 text-gray-500">
              No available slots for this doctor today.
            </p>
          ))}

        {/* Appointments List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            My Appointments
          </h3>
          {appointments.length === 0 ? (
            <p className="text-gray-500">No appointments yet.</p>
          ) : (
            appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="p-4 border rounded-lg mb-2 bg-gray-50"
              >
                <p>
                  <strong>Doctor:</strong>{" "}
                  {doctors.find((doc) => doc._id === appointment.doctorId)
                    ? `Dr. ${
                        doctors.find((doc) => doc._id === appointment.doctorId)
                          .firstName
                      } ${
                        doctors.find((doc) => doc._id === appointment.doctorId)
                          .lastName
                      }`
                    : "N/A"}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {appointment.appointmentDate
                    ? new Date(appointment.appointmentDate).toLocaleDateString()
                    : "N/A"}{" "}
                  | <strong>Time:</strong>{" "}
                  {appointment.appointmentTime || "N/A"}
                </p>
                <p>
                  <strong>Fee:</strong> {appointment.sessionPrice || "N/A"} ETB
                </p>
                <p
                  className={`font-semibold ${
                    appointment.appointmentStatus === "Confirmed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  <strong>Status:</strong>{" "}
                  {appointment.appointmentStatus || "N/A"}
                </p>
                {appointment.appointmentStatus === "Declined" ? (
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      handleReschedule(appointment._id);
                    }}
                    className="mt-2 px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Reschedule
                  </button>
                ) : (
                  <p
                    className={`font-semibold ${
                      appointment.paymentStatus === "Paid"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    <strong>Payment:</strong>{" "}
                    {appointment.paymentStatus || "Pending"}
                  </p>
                )}

                {/* Pay Now */}
                {appointment.appointmentStatus === "Confirmed" &&
                  appointment.paymentStatus === "Pending" && (
                    <button
                      onClick={() => handlePaymentNow(appointment)}
                      className="mt-2 px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Pay Now
                    </button>
                  )}

                {/* Chat Access */}
                {appointment.status === "Confirmed" &&
                  appointment.paymentStatus === "Paid" && (
                    <button
                      onClick={handleGoToChat}
                      className="mt-2 px-6 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700"
                    >
                      Go to Chat
                    </button>
                  )}

                {/* Reschedule */}
                {appointment.status === "Declined" &&
                  appointment.paymentStatus === "Paid" && (
                    <button
                      onClick={() => handleReschedule(appointment._id)}
                      className="mt-2 text-blue-600 underline block"
                    >
                      Reschedule Appointment (Payment Retained)
                    </button>
                  )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default AppointmentsPage;
