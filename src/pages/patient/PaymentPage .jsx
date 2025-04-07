import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get appointment details from state
  const { doctor, date, time } = location.state || {};

  // Handle payment (dummy function for now)
  const handlePaymentSuccess = () => {
    // After successful payment, confirm the appointment and navigate back
    alert("Payment successful! Your appointment has been confirmed.");
    // Here, you'd make an API call to confirm the appointment in your database
    navigate("/appointments"); // Redirect back to appointments page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-20">
        <div className="bg-white shadow-lg p-6 mb-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800">Payment</h1>
            <p className="text-sm text-gray-500">Pay for your appointment</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-6 space-y-8">
          {/* Payment details */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Appointment with {doctor?.name} - {doctor?.specialty}
            </h3>
            <p>Date: {date}</p>
            <p>Time: {time}</p>
            <div className="mt-4">
              {/* Payment gateway integration here */}
              <button
                onClick={handlePaymentSuccess}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
              >
                Complete Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
