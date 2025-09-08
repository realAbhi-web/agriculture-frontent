import React, { useState } from "react";

const ServiceCard = ({ title, icon, description }) => {
  const [showText, setShowText] = useState(false);

  return (
    <div
      className="w-64 p-6 rounded-xl bg-gray-800 text-white shadow-lg cursor-pointer transition-transform transform hover:scale-105"
      onClick={() => setShowText(!showText)}
      onMouseEnter={() => setShowText(true)}
      onMouseLeave={() => setShowText(false)}
    >
      <div className="flex flex-col items-center">
        <img src={icon} alt={title} className="w-16 h-16 object-contain" />
        <h3 className="mt-4 text-lg font-bold">{title}</h3>
      </div>

      {showText && (
        <p className="mt-3 text-sm text-gray-300 text-center">{description}</p>
      )}
    </div>
  );
};

export default ServiceCard;
