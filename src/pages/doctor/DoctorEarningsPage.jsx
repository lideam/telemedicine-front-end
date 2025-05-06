import React, { useState } from "react";
import { FaMoneyCheckAlt, FaDownload, FaWallet } from "react-icons/fa";
import DoctorNav from "../../components/layout/DoctorNav";

const DoctorEarningsPage = () => {
  const [earnings] = useState([
    {
      id: 1,
      date: "April 10, 2025",
      patientName: "Mekdes Abebe",
      consultationTime: "April 10, 2025, 10:30 AM",
      amountReceived: 1500,
      receipt: "receipt_1.pdf",
      paymentMethod: "Chapa",
    },
    {
      id: 2,
      date: "March 15, 2025",
      patientName: "Samuel Getachew",
      consultationTime: "March 15, 2025, 2:00 PM",
      amountReceived: 1200,
      receipt: "receipt_2.pdf",
      paymentMethod: "Credit Card",
    },
    {
      id: 3,
      date: "February 20, 2025",
      patientName: "Hana Tsegaye",
      consultationTime: "February 20, 2025, 9:00 AM",
      amountReceived: 1800,
      receipt: "receipt_3.pdf",
      paymentMethod: "Chapa",
    },
  ]);

  const handleDownloadReceipt = (receiptFileName) => {
    alert(`Downloading receipt: ${receiptFileName}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      <DoctorNav />
      <main className="flex-1 p-6 pt-0 ml-64 space-y-6">
        {/* Header */}
        <div className="bg-white text-black p-3 pl-6 -ml-6 -mr-6 flex shadow-md items-center mb-6 gap-5">
        <FaWallet className="text-blue-600 text-3xl" />   
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Earnings Overview
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              View and download your payment records and transaction details.
            </p>
          </div>
        </div>

        {/* Earnings List */}
        <div className=" mx-auto bg-white p-8 rounded-xl shadow-xl">
          <div className="space-y-4">
            {earnings.length === 0 ? (
              <div className="text-center text-gray-500">
                <p>No earnings recorded yet.</p>
              </div>
            ) : (
              earnings.map((record) => (
                <div
                  key={record.id}
                  className="flex flex-col md:flex-row items-center justify-between p-6 border-b border-gray-200 rounded-lg shadow-md"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-4">
                    <FaMoneyCheckAlt className="text-xl text-green-600 mb-2 md:mb-0" />
                    <div>
                      <p className="text-lg font-semibold">
                        {record.patientName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Consultation Time: {record.consultationTime}
                      </p>
                      <p className="text-sm text-gray-600">
                        Paid On: {record.date}
                      </p>
                    </div>
                  </div>

                  <div className="text-right mt-4 md:mt-0">
                    <p className="text-lg font-semibold text-green-700">
                      {record.amountReceived} Birr
                    </p>
                    <p className="text-sm font-medium mt-1 text-gray-600">
                      Method: {record.paymentMethod}
                    </p>

                    <div className="mt-4">
                      <button
                        onClick={() => handleDownloadReceipt(record.receipt)}
                        className="bg-green-600 text-white px-4 py-2 rounded-xl font-semibold flex items-center justify-center hover:bg-green-700 transition"
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
      </main>
    </div>
  );
};

export default DoctorEarningsPage;
