import React, { useEffect, useState } from "react";
import blackHouse from "../../assets/black-house.png";
import { CiSearch } from "react-icons/ci";
import { motion } from "framer-motion";

const Hero = () => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (count < 100) {
      const timer = setTimeout(() => {
        setCount(count + 1);
      }, 10); // speed: 100ms per number (adjust as needed)
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <section className="relative w-full flex flex-col md:flex-row justify-center items-center bg-black md:h-screen py-16 md:py-24 px-5 sm:px-7 md:px-20">
      {/* Soft radial blur glow on the left */}
      <div
        className="absolute top-20 left-0 md:top-10 md:-left-10 h-40 w-40 md:h-80 md:w-80 rounded-full 
        bg-[radial-gradient(circle,white,black)] blur-3xl opacity-100 z-0"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          type: "ease-in",
        }}
        className="flex flex-col gap-10 w-full md:pl-10 pt-10"
      >
        {/* Text */}
        <div className="relative z-10 text-white text-3xl sm:text-4xl md:text-6xl font-semibold space-y-2">
          <div className="absolute top-0 left-28 md:top-1 md:left-50 h-10 w-10 md:h-14 md:w-14 rounded-full bg-gradient-to-l from-orange-500 to-orange-300" />
          <span className="relative z-10">Discover</span> <br />
          Most Suitable <br />
          Property
        </div>

        <p className="text-md text-gray-300">
          Find a variety of properties that suits you very well <br />
          Forget all the dificulties in finding the residence for you
        </p>

        {/* Search */}
        <div className="flex justify-between items-center border border-gray-500 md:w-100 rounded-lg h-10 py-1 px-3 bg-gray-300">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-lg text-gray-900 placeholder-gray-800"
          />
          <CiSearch size={25} className="text-gray-600" />
        </div>

        <div className=" flex justify-start items-center bg-white rounded-lg gap-5 py-2 px-5 w-fit">
          <div className="flex flex-col items-center justify-center ">
            <p className="text-3xl font-medium">
              {count}
              <span className="text-yellow-600">+</span>
            </p>
            <p>Properties Listed</p>
          </div>
          <div className="flex flex-col items-center justify-center ">
            <p className="text-3xl font-medium">
              {count}
              <span className="text-yellow-600">+</span>
            </p>
            <p>Properties Listed</p>
          </div>
          <div className="flex flex-col items-center justify-center ">
            <p className="text-3xl font-medium">
              {count}
              <span className="text-yellow-600">+</span>
            </p>
            <p>Properties Listed</p>
          </div>
        </div>
      </motion.div>

      {/* Placeholder for future image or call-to-action */}
      <motion.div
        initial={{ x: "7rem", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1.5,
          type: "ease-in",
        }}
        className="md:pr-10"
      >
        <img
          src={blackHouse}
          alt=""
          className="rounded-t-full h-80 sm:h-96 md:h-120 object-cover mt-10 border-8 border-white/20"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
