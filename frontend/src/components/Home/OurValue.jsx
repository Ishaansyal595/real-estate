import React, { useState } from "react";
import whiteHouse from "../../assets/whiteHouse.jpg";
import { motion } from "framer-motion";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

const OurValue = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const accordion = [
    { title: "Best interest rates on the market" },
    { title: "Prevent Unstable Prices" },
    { title: "Best price on the market" },
  ];

  return (
    <section className="relative w-full overflow-hidden flex flex-col-reverse md:flex-row justify-center items-center px-5 sm:px-7 md:px-20 py-10 gap-8">
      {/* Left image */}
      <motion.div
        initial={{ x: "-7rem", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeIn" }}
        className="md:pr-10"
      >
        <img
          src={whiteHouse}
          alt="White House"
          className="rounded-t-full h-80 sm:h-96 md:h-120 object-cover mt-10 border-8 border-gray-700/40"
        />
      </motion.div>

      {/* Right content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeIn" }}
        className="flex flex-col justify-center gap-10 h-full w-full md:pl-10"
      >
        {/* Heading */}
        <div className="mb-4 flex flex-col gap-2">
          <h4 className="text-yellow-500 font-bold text-xl sm:text-2xl">
            Our Value
          </h4>
          <h3 className="text-blue-800 text-2xl sm:text-3xl md:text-4xl font-bold">
            Value We Give to You
          </h3>

          <p className="text-gray-500 text-sm sm:text-base">
            We are always ready to help by providing the best services for you.
            <br />
            We believe a good place to live can make your life better.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-2">
          {accordion.map((item, index) => (
            <div
              key={index}
              className={`w-full rounded-lg shadow ${
                openIndex === index ? "shadow-xl" : "hover:shadow-md"
              }`}
            >
              <div
                className="flex justify-between items-center px-5 py-4 cursor-pointer"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h2 className="text-blue-900 font-semibold">{item.title}</h2>
                {openIndex === index ? (
                  <FaArrowAltCircleUp size={22} />
                ) : (
                  <FaArrowAltCircleDown size={22} />
                )}
              </div>

              {openIndex === index && (
                <p className="px-5 pb-4 text-gray-600 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Libero ipsum voluptatibus sed, officiis maxime odit impedit,
                  nam iusto molestias omnis ratione dicta non alias consequuntur
                  excepturi doloremque explicabo voluptatum reiciendis. Deleniti
                  ad animi reiciendis itaque tempora possimus aspernatur tempore
                  iste dolorum cupiditate optio, praesentium blanditiis beatae
                  perferendis explicabo, aut harum fugit facere ea velit odit
                  maxime! A exercitationem corporis itaque.
                </p>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default OurValue;
