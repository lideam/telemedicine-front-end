import React, { useState } from "react";
import {
  FaReceipt,
  FaCheckCircle,
  FaUndoAlt,
  FaDownload,
  FaCreditCard
} from "react-icons/fa";
import { Link } from "react-router-dom";
import PatientNav from "../../components/layout/PatientNav";
// import { useHistory } from 'react-router-dom'; // for page redirection

const TransactionHistoryPage = () => {
  const [transactions] = useState([
    {
      id: 1,
      date: "April 10, 2025",
      doctorName: "Dr. John Doe",
      appointmentDate: "April 10, 2025, 10:30 AM",
      amountPaid: 1500, // Amount in Birr
      status: "Paid",
      receipt: "receipt_1.pdf", // Dummy filename for the receipt
      paymentMethod: "Chapa",
    },
    {
      id: 2,
      date: "March 15, 2025",
      doctorName: "Dr. Jane Smith",
      appointmentDate: "March 15, 2025, 2:00 PM",
      amountPaid: 1200, // Amount in Birr
      status: "Refund/Reschedule",
      receipt: "receipt_2.pdf", // Dummy filename for the receipt
      paymentMethod: "Credit Card",
    },
    {
      id: 3,
      date: "February 20, 2025",
      doctorName: "Dr. Emily White",
      appointmentDate: "February 20, 2025, 9:00 AM",
      amountPaid: 1800, // Amount in Birr
      status: "Paid",
      receipt: "receipt_3.pdf", // Dummy filename for the receipt
      paymentMethod: "Chapa",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  //   const history = useHistory(); // For redirecting to the appointments page

  const handleDownloadReceipt = (receiptFileName) => {
    // Logic to download the receipt (this is a placeholder for actual functionality)
    alert(`Downloading receipt: ${receiptFileName}`);
  };

  const handleReschedule = (transactionId) => {
    // Redirect to the appointments page when reschedule is clicked
    history.push(`/appointments/${transactionId}`);
  };

  const handleRefund = (transaction) => {
    // Show refund modal with payment details
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleRefundSubmit = () => {
    // Logic for refund submission (this can be API interaction in real life)
    alert("Refund has been processed!");
    setIsModalOpen(false); // Close the modal after refund
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
          {/* Transaction List */}
          <div className="space-y-4">
            {transactions.length === 0 ? (
              <div className="text-center text-gray-500">
                <p>No transactions found.</p>
              </div>
            ) : (
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex flex-col md:flex-row items-center justify-between p-6 border-b border-gray-200 rounded-lg shadow-md"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-4">
                    <FaReceipt className="text-xl text-blue-600 mb-2 md:mb-0" />
                    <div>
                      <p className="text-lg font-semibold">
                        {transaction.doctorName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Appointment Date: {transaction.appointmentDate}
                      </p>
                      <p className="text-sm text-gray-600">
                        Transaction Date: {transaction.date}
                      </p>
                    </div>
                  </div>

                  <div className="text-right mt-4 md:mt-0">
                    <p className="text-lg font-semibold">
                      {transaction.amountPaid} Birr
                    </p>
                    <p
                      className={`text-sm font-medium mt-2 ${
                        transaction.status === "Paid"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.status === "Paid" ? (
                        <>
                          <FaCheckCircle className="inline mr-1" />
                          Paid
                        </>
                      ) : (
                        <>
                          <FaUndoAlt className="inline mr-1" />
                          <span className="text-blue-600 cursor-pointer">
                            <Link
                              to="/appointments"
                              className="hover:underline"
                            >
                              Reschedule
                            </Link>
                          </span>
                          <span className="mx-2">|</span>
                          <span
                            onClick={() => handleRefund(transaction)}
                            className="text-red-600 cursor-pointer"
                          >
                            Refund
                          </span>
                        </>
                      )}
                    </p>

                    {/* Download Receipt Button */}
                    <div className="mt-4">
                      <button
                        onClick={() =>
                          handleDownloadReceipt(transaction.receipt)
                        }
                        className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold flex items-center justify-center hover:bg-blue-700 transition"
                      >
                        <FaDownload className="mr-2" />
                        Download Receipt
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Refund Modal */}
        {isModalOpen && selectedTransaction && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-2xl font-semibold mb-4">
                Refund Information
              </h2>
              <p className="text-lg mb-2">
                <strong>Payment Method:</strong>{" "}
                {selectedTransaction.paymentMethod}
              </p>
              <p className="text-lg mb-4">
                <strong>Amount Paid:</strong> {selectedTransaction.amountPaid}{" "}
                Birr
              </p>
              <div className="flex justify-between">
                <button
                  onClick={handleRefundSubmit}
                  className="bg-red-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-700 transition"
                >
                  Refund
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-800 px-6 py-2 rounded-xl font-semibold hover:bg-gray-400 transition"
                >
                  Cancel
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
