import React, { useEffect, useState } from "react";
import {
  FaReceipt,
  FaCheckCircle,
  FaUndoAlt,
  FaDownload,
  FaCreditCard
} from "react-icons/fa";
import { Link } from "react-router-dom";
import PatientNav from "../../components/layout/PatientNav";

const TransactionHistoryPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewedTransaction, setViewedTransaction] = useState(null);

  const API_BASE_URL = "http://localhost:5000";
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const userId = user?._id;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!userId) return;

    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/payment/check-status/user/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setTransactions(data.reverse()); // newest at bottom
        }
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      }
    };

    fetchTransactions();
  }, [userId, token]);

 const handleDownloadReceipt = async (transaction) => {
  // 1. Generate and download the receipt
  const receiptContent = `
    Medical Appointment Receipt
    ---------------------------
    Appointment ID: ${transaction.appointmentId}
    Transaction ID: ${transaction.transactionId}
    Status: ${transaction.status}
    Amount Paid: ${transaction.price} Birr
    Payment Method: ${transaction.paymentType}
    Date: ${new Date(transaction.updatedAt || transaction.createdAt || Date.now()).toLocaleString()}
  `;

  const blob = new Blob([receiptContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `receipt_${transaction.transactionId}.txt`;
  a.click();
  URL.revokeObjectURL(url);

  // 2. Send notification to backend
  try {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const token = localStorage.getItem("token");

    const notificationPayload = {
      title: "Receipt Downloaded",
      message: `You downloaded the receipt for appointment ${transaction.appointmentId}`,
      userId: user._id,
      type: "system",
    };

    const response = await fetch("http://localhost:5000/api/notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // optional if backend requires
      },
      body: JSON.stringify(notificationPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Notification failed.");
    }

    console.log("Notification sent successfully.");
  } catch (error) {
    console.error("Failed to send notification:", error.message);
  }
};



  const handleViewAppointment = (transaction) => {
    setViewedTransaction(transaction);
    setViewModalOpen(true);
  };

  const handlePaymentNow = async (transaction) => {
    try {
      const transactionId = `txn_${Date.now()}`;
      localStorage.setItem("chapaTxnId", transactionId);

      const response = await fetch(`${API_BASE_URL}/api/payment/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone || "0910000000",
          appointmentId: transaction.appointmentId,
          price: transaction.price,
          paymentType: "chapa",
          transactionId,
        }),
      });

      const data = await response.json();

      if (data.status === "success" && data.data.checkout_url) {
        window.location.href = data.data.checkout_url;
      } else {
        alert("Payment initiation failed.");
      }
    } catch (err) {
      console.error("Error initiating payment:", err);
      alert("Could not start payment.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      <PatientNav />
      <main className="flex-1 p-6 pt-0 ml-64 overflow-y-auto space-y-6">
        <section className="bg-white p-3 pl-6 -ml-6 -mr-6 shadow-lg items-center flex gap-5">
          <FaCreditCard className="text-blue-600 text-4xl" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Transaction History
            </h1>
            <p className="text-gray-600 mt-1">
              Manage payments securely for your medical appointments
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-xl">
          {transactions.length === 0 ? (
            <div className="text-center text-gray-500">
              <p>No transactions found.</p>
            </div>
          ) : (
            transactions.map((transaction, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row items-center justify-between p-6 border-b border-gray-200 rounded-lg shadow-md"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-4">
                  <FaReceipt className="text-xl text-blue-600 mb-2 md:mb-0" />
                  <div>
                    <p className="text-lg font-semibold">
                      Appointment ID: {transaction.appointmentId}
                    </p>
                    <p className="text-sm text-gray-600">
                      Transaction ID: {transaction.transactionId}
                    </p>
                    <p className="text-sm text-gray-600">
                      Status: {transaction.status}
                    </p>
                  </div>
                </div>

                <div className="text-right mt-4 md:mt-0 space-y-2">
                  <p className="text-lg font-semibold">
                    {transaction.price} Birr
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      transaction.status === "success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.status === "success" ? "Paid" : "Unpaid"}
                  </p>

                  <div className="flex flex-wrap gap-2 justify-end">
                    {transaction.status === "success" ? (
                      <button
                        onClick={() =>
                          handleDownloadReceipt(transaction)
                        }
                        className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
                      >
                        <FaDownload className="inline mr-2" />
                        Download Receipt
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePaymentNow(transaction)}
                        className="bg-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-700 transition"
                      >
                        Pay Now
                      </button>
                    )}
                    <button
                      onClick={() => handleViewAppointment(transaction)}
                      className="bg-gray-200 text-gray-800 px-4 py-2 rounded-xl font-semibold hover:bg-gray-300 transition"
                    >
                      View Appointment
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* View Appointment Modal */}
        {viewModalOpen && viewedTransaction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Appointment Details
              </h2>
              <p><strong>Appointment ID:</strong> {viewedTransaction.appointmentId}</p>
              <p><strong>Transaction ID:</strong> {viewedTransaction.transactionId}</p>
              <p><strong>Status:</strong> {viewedTransaction.status}</p>
              <p><strong>Amount:</strong> {viewedTransaction.price} Birr</p>
              <p><strong>Payment Method:</strong> {viewedTransaction.paymentType}</p>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setViewModalOpen(false)}
                  className="bg-gray-300 text-gray-800 px-6 py-2 rounded-xl font-semibold hover:bg-gray-400 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TransactionHistoryPage;
