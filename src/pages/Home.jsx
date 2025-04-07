import Navbar from "../components/layout/Navbar";
import Hero from "../sections/Hero";
import About from "../sections/About";
import HowItWorks from "../sections/HowItWorks";
import Services from "../sections/Services";
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
      <CTA />
      <Footer />
    </>
  );
};

export default Home;
