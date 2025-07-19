import React from "react";
import Hero from "../components/Home/Hero";
import BestChoices from "../components/Home/BestChoices";
import OurValue from "../components/Home/OurValue";
import OurContactUs from "../components/Home/OurContactUs";

const Home = () => {
  return (
    <div className="w-screen flex flex-col gap-10 overflow-hidden">
      <Hero />
      <BestChoices />
      <OurValue />
      <OurContactUs />
    </div>
  );
};

export default Home;
