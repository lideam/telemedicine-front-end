import React from "react";

const Services = () => {
  const services = [
    {
      title: "Online Consultations",
      description:
        "Consult with certified doctors from the comfort of your home, through video or chat.",
      icon: "https://plus.unsplash.com/premium_photo-1661546665925-8fffaa9a0df3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Prescription Services",
      description:
        "Get prescriptions directly from your doctor after consultation.",
      icon: "https://plus.unsplash.com/premium_photo-1661443936270-0cf1ed6b4817?q=80&w=2034&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "24/7 Availability",
      description:
        "Access medical care at any time, day or night, with our 24/7 service availability.",
      icon: "https://plus.unsplash.com/premium_photo-1664300820146-caa0cdb30679?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <section className="py-10 px-6 bg-gray-50">
      <div className="w-1/2 h-1 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 mx-auto my-20 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.4)]" />
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">Our Services</h2>
        <p className="text-xl text-gray-600 mt-4">
          Explore the various services we provide to make healthcare accessible
          for you.
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
              <img
                src={service.icon}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {service.title}
            </h3>
            <p className="text-gray-600 text-center">{service.description}</p>
          </div>
        ))}
      </div>
     <div className="flex justify-end mt-3">
  <a
    href="/services"
    className="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-2xl shadow-lg hover:bg-blue-600 transition text-sm"
  >
    See More
  </a>
</div>

    </section>
  );
};

export default Services;
