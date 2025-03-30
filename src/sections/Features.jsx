const Features = () => {
  return (
    <section className="py-20 bg-white text-center px-6">
      <h2 className="text-4xl font-bold text-blue-600">Key Features</h2>
      <div className="mt-6 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="p-6 bg-gray-100 shadow-lg rounded-lg">
          <h3 className="text-xl font-bold">Video Consultation</h3>
          <p className="text-gray-600 mt-2">
            Real-time video calls with doctors for instant care.
          </p>
        </div>
        <div className="p-6 bg-gray-100 shadow-lg rounded-lg">
          <h3 className="text-xl font-bold">Secure Payments</h3>
          <p className="text-gray-600 mt-2">
            Make safe transactions before confirming an appointment.
          </p>
        </div>
        <div className="p-6 bg-gray-100 shadow-lg rounded-lg">
          <h3 className="text-xl font-bold">24/7 Availability</h3>
          <p className="text-gray-600 mt-2">
            Access medical assistance anytime, anywhere.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
