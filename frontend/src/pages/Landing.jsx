import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 12,
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 10,
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 via-white to-slate-100 px-4 sm:px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl bg-white rounded-3xl shadow-xl text-center p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14"
      >
        <motion.img
          variants={itemVariants}
          src="/1746953297461.png"
          alt="Logo Juragan Sepeda Manado"
          className="mx-auto w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 object-contain mb-4 sm:mb-6"
        />
        <motion.h1
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 mb-4 sm:mb-6 md:mb-8"
        >
          Juragan Sepeda Manado
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-6 sm:mb-8"
        >
          Inventaris Toko
        </motion.p>
        <motion.button
          variants={itemVariants}
          onClick={() => navigate("/user-choice")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="px-5 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-base sm:text-lg md:text-xl font-semibold bg-teal-600 text-white rounded-xl hover:bg-teal-700 shadow transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
        >
          Mulai
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LandingPage;
