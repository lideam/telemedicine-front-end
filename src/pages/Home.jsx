import Navbar from "../components/layout/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Welcome to TeleMedicine</h1>
      </div>
    </>
  );
};

export default Home;
