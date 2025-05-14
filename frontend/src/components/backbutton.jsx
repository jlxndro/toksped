import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50 bg-white/80 backdrop-blur-sm shadow-md px-3 py-1.5 rounded-full text-teal-600 text-xs sm:text-sm font-medium flex items-center gap-1 hover:bg-white transition-all"
    >
      <FaArrowLeft className="text-sm sm:text-base" />
      <span>Kembali</span>
    </button>
  );
};

export default BackButton;
