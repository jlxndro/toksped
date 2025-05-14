import React from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaStore } from "react-icons/fa";
import { motion } from "framer-motion";
import BackButton from "../components/backbutton";

const UserChoice = () => {
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 14,
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 12,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center p-4 xs:p-5 sm:p-6">
      <BackButton />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-md sm:max-w-lg bg-white rounded-xl shadow-lg overflow-hidden p-5 xs:p-6 sm:p-8 md:p-10 text-center"
      >
        <motion.h1
          variants={item}
          className="text-2xl xs:text-3xl sm:text-4xl font-bold text-slate-800 mt-10 mb-6 xs:mb-8 sm:mb-10 md:mb-12"
        >
          Pilih Peran Anda
        </motion.h1>

        <motion.div
          variants={item}
          className="flex flex-col space-y-5 xs:space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 gap-5 xs:gap-6 sm:gap-7 md:gap-8"
        >
          {/* Pembeli */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/pembeli")}
            className="cursor-pointer group"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate("/pembeli")}
          >
            <div className="aspect-square bg-teal-50 rounded-lg flex flex-col items-center justify-center p-5 xs:p-6 sm:p-7 border-2 border-teal-100 group-hover:border-teal-300 group-active:border-teal-200 transition-all">
              <FaShoppingCart className="text-teal-600 text-3xl xs:text-4xl sm:text-5xl mb-2 xs:mb-3 sm:mb-4 transition-transform group-hover:scale-110" />
              <span className="font-semibold text-teal-800 text-base xs:text-lg sm:text-xl">
                Pembeli
              </span>
            </div>
            <p className="mt-2 xs:mt-3 text-xs xs:text-sm sm:text-base text-slate-500">
              Lihat barang yang dijual
            </p>
          </motion.div>

          {/* Penjual */}
          <motion.div
            variants={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/login")}
            className="cursor-pointer group"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate("/login")}
          >
            <div className="aspect-square bg-slate-50 rounded-lg flex flex-col items-center justify-center p-5 xs:p-6 sm:p-7 border-2 border-slate-100 group-hover:border-slate-300 group-active:border-slate-200 transition-all">
              <FaStore className="text-slate-600 text-3xl xs:text-4xl sm:text-5xl mb-2 xs:mb-3 sm:mb-4 transition-transform group-hover:scale-110" />
              <span className="font-semibold text-slate-800 text-base xs:text-lg sm:text-xl">
                Penjual
              </span>
            </div>
            <p className="mt-2 xs:mt-3 text-xs xs:text-sm sm:text-base text-slate-500">
              Masuk ke akun penjual
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UserChoice;
