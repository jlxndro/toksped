import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const ItemCard = ({ item, stock }) => {
  const [harga, setHarga] = useState(null); // State untuk harga

  const pesanLink = `https://wa.me/6281354497088?text=Halo%2C%20saya%20ingin%20mengecek%20apakah%20item%20${encodeURIComponent(
    item.nama
  )}%20masih%20tersedia%20untuk%20pemesanan.`;

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const docSnap = await getDoc(doc(db, "stocks", String(item.id)));
        if (docSnap.exists()) {
          setHarga(docSnap.data().harga); // Mengambil harga dari Firestore
        }
      } catch (e) {
        console.error("Error fetching price:", e);
      }
    };

    fetchPrice();
  }, [item.id]); // Menjalankan hanya ketika id produk berubah

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <div className="h-44 sm:h-52 bg-white overflow-hidden rounded-t-2xl">
        <img
          src={item.gambar}
          alt={item.nama}
          className="w-full h-full object-contain p-5"
        />
      </div>

      <div className="flex flex-col p-4 sm:p-5 flex-grow">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
          {item.nama}
        </h2>

        <div className="text-gray-600 space-y-1 text-sm sm:text-base flex-grow">
          <p>
            <span className="font-medium">Jenis:</span> {item.jenis}
          </p>
          {item.ukuran && (
            <p>
              <span className="font-medium">Ukuran:</span> {item.ukuran} inch
            </p>
          )}
          <p>
            <span className="font-medium">Harga:</span> Rp.{" "}
            {harga ? harga.toLocaleString("id-ID") : "Memuat..."}
          </p>
          <p
            className={`font-medium ${
              stock > 0 ? "text-teal-600" : "text-red-600"
            }`}
          >
            Stok: {stock} unit
          </p>
        </div>

        {stock > 0 ? (
          <a
            href={pesanLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 py-2 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm sm:text-base text-center transition duration-300"
          >
            Pesan Sekarang
          </a>
        ) : (
          <button
            disabled
            className="mt-4 py-2 px-4 rounded-xl bg-gray-300 text-gray-500 text-sm sm:text-base cursor-not-allowed"
          >
            Stok Habis
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ItemCard;
