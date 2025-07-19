import React from "react";
import { motion } from "framer-motion";
import swimmingPoolHouse from "../../assets/swimmingPoolHouse.jpg";
import { FaPhoneAlt } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

const OurContactUs = () => {
  const contact = [
    { title: "Phone", phone: 8234678223, icon: <FaPhoneAlt /> },
    { title: "Chat", phone: 8234678223, icon: <IoChatbubbleEllipsesSharp /> },
    { title: "Email", email: "yourEmail@mail.com", icon: <MdAlternateEmail /> },
    {
      title: "Video Call",
      phone: 8234678223,
      icon: <IoChatbubbleEllipsesSharp />,
    },
  ];

  return (
    <section className="flex  w-full overflow-hidden flex-col md:flex-row justify-center items-center px-5 sm:px-7 md:px-20 py-10 gap-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          type: "ease-in",
        }}
        className="flex flex-col gap-10 w-full pl-10 pt-10"
      >
        <div className="w-full mb-4 flex flex-col gap-4">
          <h4 className="text-yellow-500 text-xl sm:text-2xl font-bold">
            Our Contact Us
          </h4>
          <h3 className="text-blue-800 text-2xl sm:text-3xl md:text-4xl font-bold">
            Easy To Contact Us
          </h3>

          <p className="text-gray-500 text-sm sm:text-base">
            We are always ready to help you by providing the best services for
            you.
          </p>
        </div>{" "}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contact.map((e) => (
            <div className="rounded-lg bg-gray-200 p-3 w-50 md:w-60 flex flex-col gap-3 hover:bg-black/20 transition-all duration-300">
              <div className="flex justify-start items-center gap-5 ">
                <div className="rounded-lg p-2 bg-blue-300/70">{e.icon}</div>

                <div className="flex flex-col items-start ">
                  <span className="text-blue-800 font-semibold ">
                    {e.title}
                  </span>
                  <span className="text-xs text-gray-700">
                    {e.phone ? e.phone : e.email}
                  </span>
                </div>
              </div>

              <div className="bg-blue-300/70 hover:bg-blue-300/90 text-blue-800 font-semibold rounded-lg text-center py-1">
                {e.title} now
              </div>
            </div>
          ))}
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
          src={swimmingPoolHouse}
          alt=""
          className="rounded-t-full h-80 sm:h-96 md:h-120 object-cover mt-10 border-8 border-gray-900/30"
        />
      </motion.div>
    </section>
  );
};

export default OurContactUs;
