const About = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="w-1/2 h-1 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 mx-auto my-20 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.4)]" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="w-full lg:w-1/2 mr-5">
            <img
              src="https://plus.unsplash.com/premium_vector-1683133351746-b5f67a85d2cb?q=80&w=2226&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Telemedicine Illustration"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
              About Us
            </h2>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              We are dedicated to providing high-quality, accessible healthcare
              services through our Telemedicine platform. Our goal is to connect
              patients with certified doctors from the comfort of their homes,
              enabling seamless communication and care anytime, anywhere.
            </p>
            <p className="text-lg text-gray-500 mb-6 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Whether you need advice, a prescription, or a consultation, our
              platform offers a range of services designed to provide the best
              healthcare experience. We are here to make healthcare more
              accessible for everyone.
            </p>
            <a
              href="/about"
              className="inline-block px-8 py-4 bg-blue-500 text-white font-semibold rounded-2xl shadow-lg hover:bg-blue-600 transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
