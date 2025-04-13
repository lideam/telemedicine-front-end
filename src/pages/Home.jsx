import Navbar from "../components/layout/Navbar";
import Hero from "../sections/Hero";
import About from "../sections/About";
import HowItWorks from "../sections/HowItWorks";
import Services from "../sections/Services";
import Tips from "../sections/Tips"
// import Features from "../sections/Features";
import CTA from "../sections/CTA";
import Footer from "../components/layout/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About /> 
      <HowItWorks />
      <Services />
      <Tips />
      <CTA />
      <Footer />
    </>
  );
};

export default Home;
