import React from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaStore } from "react-icons/fa";
import BackButton from "../components/backbutton";

const UserChoice = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-10 text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-15">
          Pilih Peran Anda
        </h1>

        <div className="grid grid-cols-2 gap-15">
          {/* Pembeli */}
          <div
            onClick={() => navigate("/pembeli")}
            className="cursor-pointer group"
          >
            <div className="aspect-square bg-teal-50 rounded-lg flex flex-col items-center justify-center p-8 border-2 border-teal-100 group-hover:border-teal-300 transition-colors duration-200">
              {" "}
              <FaShoppingCart className="text-teal-600 text-5xl mb-4" />
              <span className="font-semibold text-teal-800 text-lg">
                Pembeli
              </span>
            </div>
            <p className="mt-3 text-md text-slate-500">
              Lihat barang yang dijual
            </p>
          </div>

          {/* Penjual */}
          <div
            onClick={() => navigate("/login")}
            className="cursor-pointer group"
          >
            <div className="aspect-square bg-slate-50 rounded-lg flex flex-col items-center justify-center p-8 border-2 border-slate-100 group-hover:border-slate-300 transition-colors duration-200">
              {" "}
              <FaStore className="text-slate-600 text-5xl mb-4" />
              <span className="font-semibold text-slate-800 text-lg">
                Penjual
              </span>
            </div>
            <p className="mt-3 text-md text-slate-500">Masuk ke akun penjual</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChoice;
