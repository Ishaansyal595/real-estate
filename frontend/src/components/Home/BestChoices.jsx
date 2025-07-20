import React from "react";
import swimmingPoolHouse from "../../assets/swimmingPoolHouse.jpg";
import blackHouse from "../../assets/black-house.png";
import whiteHouse from "../../assets/whiteHouse.jpg";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { PrevArrow, NextArrow } from "./CustomArrows";

const BestChoices = () => {
  const cards = [
    { id: 1, price: 4000, title: "Card One", image: swimmingPoolHouse, description: "This is card number one." },
    { id: 2, price: 4000, title: "Card Two", image: blackHouse, description: "This is card number two." },
    { id: 3, price: 4000, title: "Card Three", image: whiteHouse, description: "This is card number three." },
    { id: 4, price: 4000, title: "Card Four", image: swimmingPoolHouse, description: "This is card number four." },
    { id: 5, price: 4000, title: "Card Five", image: blackHouse, description: "This is card number five." },
    { id: 6, price: 4000, title: "Card Six", image: whiteHouse, description: "This is card number six." },
  ];

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    arrows: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <motion.div
      className="w-full overflow-hidden px-4 sm:px-6 md:px-10 my-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, type: "spring" }}
    >
      <div className="w-full mb-8 text-center md:text-left">
        <h4 className="text-yellow-500 text-xl md:text-2xl font-semibold">Best Choices</h4>
        <h3 className="text-blue-800 text-3xl md:text-4xl font-extrabold mt-1">Popular Residencies</h3>
      </div>

      <div className="relative max-w-[89rem] mx-auto">
        <Slider {...settings}>
          {cards.map((e) => (
            <motion.div
              key={e.id}
              className="px-2 md:px-3"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition duration-300 flex flex-col">
                <img
                  src={e.image}
                  alt={e.title}
                  className="object-cover w-full h-52 md:h-60 lg:h-64"
                />

                <div className="p-4">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">{e.title}</h2>
                  <p className="text-yellow-500 text-base md:text-lg font-bold mb-1">₹{e.price}</p>
                  <p className="text-gray-500 text-xs md:text-sm mb-3">{e.description}</p>
                  <button className="w-fit px-3 py-1 rounded-full text-xs md:text-sm text-white bg-blue-700 hover:bg-blue-800 transition">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>
    </motion.div>
  );
};

export default BestChoices;
