import { useEffect } from "react";

const Hero = () => {
  // Add sliding animation to the text
  useEffect(() => {
    const textElement = document.querySelector("#hero-text");
    textElement.classList.add("transform", "-translate-x-full", "opacity-0");
    setTimeout(() => {
      textElement.classList.remove("-translate-x-full", "opacity-0");
      textElement.classList.add(
        "transition-all",
        "duration-1500",
        "translate-x-0",
        "opacity-100"
      );
    }, 500);
  }, []);

  return (
    <section className="flex items-center justify-between px-6 pt-16 bg-gradient-to-r from-gray-100 to-white h-screen relative">
      <div
        id="hero-text"
        className="w-1/2 pr-8 h-full flex flex-col justify-center opacity-0"
      >
        <h1 className="text-6xl font-extrabold text-gray-800 mb-6 tracking-tight">
          Your Health, Our <span className="text-blue-500">Priority</span>
        </h1>
        <p className="text-2xl text-gray-700 mb-8 leading-relaxed">
          Get professional medical consultations from certified doctors,
          anytime, anywhere. Experience seamless communication and top-notch
          care, from the comfort of your home.
        </p>
        <div className="flex space-x-6 mb-8">
          <a
            href="/patient-auth"
            className="px-8 py-4 bg-blue-500 text-white font-semibold rounded-2xl shadow-lg hover:bg-blue-600 transition transform hover:scale-105 duration-300"
          >
            Sign Up as Patient
          </a>
          <a
            href="/doctor-login"
            className="px-8 py-4 border border-blue-500 text-blue-500 font-semibold rounded-2xl hover:bg-blue-500 hover:text-white transition transform hover:scale-105 duration-300"
          >
            Log in as Doctor
          </a>
        </div>

        <div className="flex items-center justify-start gap-2 space-x-4 mt-8">
          {/* Images */}
          <div className="relative flex items-center">
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="Patient 1"
              className="w-12 h-12 object-cover rounded-full border-2 border-white shadow-lg -mr-4"
            />
            <img
              src="https://randomuser.me/api/portraits/women/2.jpg"
              alt="Patient 2"
              className="w-12 h-12 object-cover rounded-full border-2 border-white shadow-lg -mr-4"
            />
            <img
              src="https://randomuser.me/api/portraits/men/3.jpg"
              alt="Patient 3"
              className="w-12 h-12 object-cover rounded-full border-2 border-white shadow-lg -mr-4"
            />
          </div>

          {/* Text */}
          <p className="text-xl font-semibold text-gray-700">
            <span className="text-blue-600">50,000+</span> patients last year!
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-1/2 h-full overflow-hidden">
        <img
          src="https://images.pexels.com/photos/7195320/pexels-photo-7195320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Healthcare"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default Hero;
