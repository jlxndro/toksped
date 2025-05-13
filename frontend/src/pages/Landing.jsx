import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/user-choice");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 via-white to-slate-100 px-4">
      <div className="w-[65%] bg-white rounded-3xl shadow-xl text-center p-8 md:p-14">
        <img
          src="/1746953297461.png"
          alt="Logo Juragan Sepeda Manado"
          className="mx-auto w-32 h-32 md:w-48 md:h-48 object-contain mb-6"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-8">
          Juragan Sepeda Manado
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 mb-8">
          Sistem Inventaris Toko
        </p>
        <button
          onClick={handleStart}
          className="px-6 py-3 md:px-8 md:py-4 text-lg md:text-xl font-semibold bg-teal-600 text-white rounded-xl hover:bg-teal-700 shadow transition duration-300"
        >
          Mulai
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
