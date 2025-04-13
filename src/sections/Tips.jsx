import React from "react";

const Services = () => {
  const services = [
    {
      title: "Stay Hydrated",
      description:
        "Aim to drink at least 8 cups of water a day. Keep a water bottle nearby during your telemedicine appointments to stay refreshed.",
      icon: "https://plus.unsplash.com/premium_vector-1682269627498-9bc139ab0daa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHN0YXklMjBoeWRyYXRlZHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: "Get Enough Sleep",
      description:
        "Try to get 7-8 hours of quality sleep each night. Set a consistent bedtime routine, and avoid screen time before your telehealth appointments for a better night’s rest.",
      icon: "https://plus.unsplash.com/premium_vector-1682306817917-762f0146fda7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGdldCUyMGVub3VnaCUyMHNsZWVwfGVufDB8fDB8fHww",
    },
    {
      title: "Exercise Regularly",
      description:
        "Incorporate at least 30 minutes of moderate exercise, such as walking, yoga, or stretching, into your daily routine. Consider scheduling virtual workouts or online fitness classes for convenience.",
      icon: "https://plus.unsplash.com/premium_vector-1715943662364-74242eca4215?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXhjZXJjaXNlfGVufDB8fDB8fHww",
    },
  ];

  return (
    <section className="py-10 px-6 bg-gray-50">
      <div className="w-1/2 h-1 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 mx-auto my-20 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.4)]" />
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">Health Tips</h2>
        <p className="text-xl text-gray-600 mt-4">
          Unlock essential health tips to guide you toward a healthier, happier
          life.
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <div className="flex flex-col ">
              <img
                src={service.icon}
                alt={service.title}
                className="w-40 h-40 mb-4 "
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
          href="/tips"
          className="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-2xl shadow-lg hover:bg-blue-600 transition text-sm"
        >
          See More
        </a>
      </div>
    </section>
  );
};

export default Services;
