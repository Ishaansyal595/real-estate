import React from "react";
import swimmingPoolHouse from "../../assets/swimmingPoolHouse.jpg";
import blackHouse from "../../assets/black-house.png";
import whiteHouse from "../../assets/whiteHouse.jpg";
import Slider from "react-slick";
import { motion } from "framer-motion";

const BestChoices = () => {
  const cards = [
    {
      id: 1,
      price: 4000,
      title: "Card One",
      image: swimmingPoolHouse,
      description: "This is card number one.",
    },
    {
      id: 2,
      price: 4000,
      title: "Card Two",
      image: blackHouse,
      description: "This is card number two.",
    },
    {
      id: 3,
      price: 4000,
      title: "Card Three",
      image: whiteHouse,
      description: "This is card number three.",
    },
    {
      id: 4,
      price: 4000,
      title: "Card Four",
      image: swimmingPoolHouse,
      description: "This is card number four.",
    },
    {
      id: 5,
      price: 4000,
      title: "Card Five",
      image: blackHouse,
      description: "This is card number five.",
    },
    {
      id: 6,
      price: 4000,
      title: "Card Six",
      image: whiteHouse,
      description: "This is card number six.",
    },
  ];

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dot: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <motion.div
      className="w-full overflow-hidden px-4 sm:px-6 md:px-10 my-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1,
        type: "ease-in",
      }}
    >
      {/* Heading */}
      <div className="w-full mb-8">
        <h4 className="text-yellow-500 text-xl md:text-2xl font-bold text-center md:text-left">
          Best Choices
        </h4>
        <h3 className="text-blue-800 text-3xl md:text-4xl font-bold text-center md:text-left">
          Popular Residencies
        </h3>
      </div>

      <div className="w-75 md:w-400 md:max-w-[85rem] mx-auto">
        <Slider {...settings}>
          {cards.map((e) => (
            <div key={e.id} className="px-2 md:px-5">
              <div className="bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col">
                <img
                  src={e.image}
                  alt={e.title}
                  className="object-cover w-full h-48 sm:h-52 md:h-56 lg:h-64"
                />

                <div className="p-3 md:p-4">
                  <p className="text-base md:text-lg font-semibold text-gray-800">
                    ₹{e.price}
                  </p>
                  <h2 className="text-lg md:text-xl font-bold">{e.title}</h2>
                  <p className="text-xs md:text-sm text-gray-600">
                    {e.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </motion.div>
  );
};

export default BestChoices;
