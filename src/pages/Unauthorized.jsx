import React from "react";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-lg shadow-lg">
        <div className="text-6xl text-red-500 mb-4">🚫</div>
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          Access Denied
        </h1>
        <p className="text-gray-600 mb-6">
          You do not have permission to view this page.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => window.history.back()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
