import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";
import BackButton from "../backbutton";
import { motion } from "framer-motion";

const Login = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      setErrorMessage("");

      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            setErrorMessage("❌ Akun tidak terdaftar.");
            break;
          case "auth/wrong-password":
            setErrorMessage("❌ Password salah.");
            break;
          default:
            setErrorMessage("❌ Terjadi kesalahan. Silakan coba lagi.");
            break;
        }
        setIsSigningIn(false);
      }
    }
  };

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch(() => setIsSigningIn(false));
    }
  };

  if (userLoggedIn) {
    return <Navigate to="/penjual" replace />;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12 relative font-sans">
      <BackButton />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.2, 0.8, 0.2, 1],
          delay: 0.2,
        }}
        className="flex flex-col md:flex-row w-full max-w-6xl bg-white shadow-xl rounded-3xl overflow-hidden"
      >
        <div className="w-full md:w-1/2 p-10 lg:p-16 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full"
          >
            <h1 className="text-4xl font-bold text-slate-800 text-center mb-2">
              Selamat Datang
            </h1>
            <p className="text-base text-slate-500 text-center mb-10">
              Silakan masuk untuk mengelola stok
            </p>

            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  placeholder="nama@email.com"
                />
              </div>

              <div>
                <label className="block mb-4 text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-100 text-red-700 text-sm rounded-lg">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSigningIn}
                className={`w-full py-3 text-sm font-semibold rounded-lg text-white transition duration-200 ${
                  isSigningIn
                    ? "bg-teal-400 cursor-not-allowed"
                    : "bg-teal-600 hover:bg-teal-700"
                }`}
              >
                {isSigningIn ? "Memproses..." : "Masuk"}
              </button>
            </form>
          </motion.div>
        </div>

        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-br from-teal-50 to-teal-100 p-10 lg:p-16">
          <div className="text-center max-w-md">
            <img
              src="/1746953297461.png"
              alt="Logo Juragan Sepeda Manado"
              className="mx-auto w-40 h-40 object-contain mb-6"
            />
            <h2 className="text-3xl font-bold text-slate-800">
              Juragan Sepeda Manado
            </h2>
            <p className="mt-2 text-lg text-slate-600 font-normal">
              Inventaris Toko
            </p>
            <div className="mt-6 flex justify-center space-x-2">
              <span className="h-2 w-8 bg-teal-400 rounded-full"></span>
              <span className="h-2 w-8 bg-teal-300 rounded-full"></span>
              <span className="h-2 w-8 bg-teal-200 rounded-full"></span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
