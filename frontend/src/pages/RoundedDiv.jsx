import React from "react";

const RoundedDiv = ({ children, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-full w-fit px-3 py-1 flex justify-between items-center cursor-pointer 
        ${isSelected ? "bg-blue-600" : "bg-gray-300 hover:bg-blue-200"}`}
    >
      <span className={`text-sm ${isSelected ? "text-white" : "text-blue-600"}`}>
        + {children}
      </span>
    </div>
  );
};

export default RoundedDiv;
