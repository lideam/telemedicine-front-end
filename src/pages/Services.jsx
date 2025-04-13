import React, { useState } from "react";
import Navbar from "../components/layout/Navbar"; // Updated path
import Footer from "../components/layout/Footer"; // Updated path



const Services = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const services = [
    {
      title: "Online Consultations",
      description: "Consult with certified doctors from the comfort of your home through video, audio, or chat. Get personalized care without visiting the clinic.",
      details: "Our online consultations are conducted by board-certified doctors who can diagnose and recommend treatments or further tests. Patients can choose between video calls, audio calls, or text chats. Your health data is kept secure and confidential.",
      icon: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhbHRoY2FyZSUyMGFuZCUyMG1lZGljaW5lfGVufDB8fDB8fHww",
    },
    {
      title: "Prescription Services",
      description: "Get prescriptions directly from your doctor after consultation, and refill them easily.",
      details: "Receive digital prescriptions instantly after your consultation. Our system integrates with pharmacies for seamless prescription refills and tracking. Never lose your prescriptions again!",
      icon: "https://plus.unsplash.com/premium_photo-1661443936270-0cf1ed6b4817?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJlc2NyaXB0aW9ufGVufDB8fDB8fHww",
    },
    {
      title: "24/7 Availability",
      description: "Access medical care at any time, day or night, with our round-the-clock service.",
      details: "Our team of healthcare professionals is available 24/7 to assist you. Whether it's an emergency or a routine checkup, you can count on us at any time.",
      icon: "https://media.istockphoto.com/id/637122726/photo/24-7-worldwide-customer-service-support.webp?a=1&b=1&s=612x612&w=0&k=20&c=BIVNe0ZnsCkmy4avzcwa9RnlnpCloheyjFJqx9EAyZQ=",
    },
    {
      title: "Mental Health Support",
      description: "Speak to mental health professionals from the comfort of your space.",
      details: "Our certified therapists and counselors are available to help you manage stress, anxiety, and other mental health challenges through confidential video or chat sessions.",
      icon: "https://images.unsplash.com/photo-1659019479972-82d9e3e8cfb7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhlYWx0aGNhcmUlMjBhbmQlMjBtZWRpY2luZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: "Chronic Care Management",
      description: "Manage chronic conditions with continuous support and care plans.",
      details: "We offer personalized plans for managing chronic diseases like diabetes, hypertension, and asthma, including regular follow-ups and lifestyle guidance.",
      icon: "https://media.istockphoto.com/id/1274403122/photo/virtual-doctor-concept-the-doctors-hand-with-stethoscope-protrudes-from-the-laptop-screen-to.webp?a=1&b=1&s=612x612&w=0&k=20&c=oKSKFDaGgXodkBZ_kAe7SP8S-L3UnTGimqZalIW1cNc=",
    },
    {
      title: "Diagnostic Services",
      description: "Get diagnostic testing recommendations and follow-up consultations.",
      details: "Our doctors recommend the most appropriate diagnostic tests and interpret the results, guiding you toward the right treatment path.",
      icon: "https://images.unsplash.com/photo-1559526324-593bc073d938?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    },
    {
      title: "Health Education and Resources",
      description: "Access a wealth of information on maintaining a healthy lifestyle.",
      details: "Our platform provides you with up-to-date articles, videos, and resources on health and wellness, empowering you to make informed decisions about your health.",
      icon: "https://media.istockphoto.com/id/835833976/photo/global-healthcare-medicine-insurance-doctor-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=GSjDxVMBasJb2x0ExA374CXWzL95B8AsyvQHBLCp1iE=",
    },
    {
      title: "Telemedicine for Specialists",
      description: "Connect with top specialists in various fields, from dermatology to cardiology.",
      details: "Receive consultations from highly qualified specialists. Whether you need a second opinion or are seeking specialized treatment, we ensure you get the care you need.",
      icon: "https://media.istockphoto.com/id/1319031310/photo/doctor-writing-a-medical-prescription.webp?a=1&b=1&s=612x612&w=0&k=20&c=NjsxMl8GGuQhGh5Pf1DMndLw4UoS2-lTLJuLpEeZvK8=",
    },
    {
      title: "Emergency Services",
      description: "Get immediate care for urgent health concerns.",
      details: "In case of emergencies, our team is available to provide immediate guidance and refer you to the right facilities, ensuring swift and effective treatment.",
      icon: "https://media.istockphoto.com/id/1216652532/photo/sick-woman-having-flu-or-cold.webp?a=1&b=1&s=612x612&w=0&k=20&c=rBdJzp-170C2l7nlQPypuzV3N4CKvjnteyaKBEIdDvo=",
    },
    {
      title: "Pharmacy Integration",
      description: "Easily order prescriptions and manage refills online.",
      details: "After your consultation, prescriptions are sent directly to your preferred pharmacy. You can track and manage refills, making your healthcare experience seamless.",
      icon: "https://plus.unsplash.com/premium_photo-1663047392930-7c1c31d7b785?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGhhcm1hY3l8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Laboratory Testing and Diagnostics",
      description: "Order lab tests and receive results from home.",
      details: "Our platform enables you to order lab tests from accredited labs, and your results will be delivered securely, with expert interpretation and guidance on the next steps.",
      icon: "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZGlhZ25vc2lzfGVufDB8MHwwfHx8MA%3D%3D",
    },
    {
      title: "Health Monitoring Devices",
      description: "Track your health metrics with integrated wearables.",
      details: "Monitor key health parameters like heart rate, blood pressure, and glucose levels through wearable devices, with the ability to share the data with your healthcare provider.",
      icon: "https://plus.unsplash.com/premium_photo-1670253031139-c91d8a6b1b52?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhlYWx0aGNhcmUlMjB0ZWNofGVufDB8MHwwfHx8MA%3D%3D",
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
    
    <section className="py-16 px-6 bg-gray-50"> {/* Added padding top for Navbar */}
      <div className="flex flex-col items-center bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 p-10 rounded-lg mb-12 shadow-lg text-white">
        <h3 className="text-5xl font-bold mb-4">Your Trusted Healthcare Partner</h3>
        <p className="text-lg text-center max-w-4xl">
          Experience seamless, professional, and accessible healthcare services from the comfort of your home. With our comprehensive telemedicine platform, you can access a variety of services tailored to your needs—available 24/7 and designed to keep you at the heart of your healthcare journey.
        </p>
      </div>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {services.map((service, index) => (
          <div key={index} onClick={() => toggleExpand(index)} className={`flex flex-col items-center p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer ${expandedIndex === index ? "bg-blue-100" : ""}`}>
            <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
              <img src={service.icon} alt={service.title} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{service.title}</h3>
            <p className="text-gray-600 text-center">{service.description}</p>
            {expandedIndex === index && <p className="text-gray-500 text-center mt-2">{service.details}</p>}
          </div>
        ))}
      </div>
    </section>
    <Footer />
    </div>
  );
};

export default Services;



