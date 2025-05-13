import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="absolute top-6 left-6 text-sm text-teal-600 font-medium flex items-center gap-1 transition"
    >
      <FaArrowLeft className="mr-2" />
      <span>Kembali</span>
    </button>
  );
};

export default BackButton;
