import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const PrevArrow = ({ className, onClick, style }) => (
  <div
    className={`${className} absolute top-1/2 -translate-y-1/2 left-2 z-10 bg-white/80 hover:bg-white rounded-full shadow flex items-center justify-center transition`}
    onClick={onClick}
    style={{ ...style, width: 32, height: 32 }}
  >
    <FaChevronLeft className="absolute text-gray-700 text-sm top-2 left-2" />
  </div>
);

export const NextArrow = ({ className, onClick, style }) => (
  <div
    className={`${className} absolute top-1/2 -translate-y-1/2 right-2 z-10 bg-white/80 hover:bg-white rounded-full shadow flex items-center justify-center transition`}
    onClick={onClick}
    style={{ ...style, width: 32, height: 32 }}
  >
    <FaChevronRight className="absolute text-gray-700 text-sm top-2 left-3" />
  </div>
);
