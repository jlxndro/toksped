import React from "react";

const ItemCard = ({ item, stock }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      <div className="h-44 sm:h-48 overflow-hidden bg-white">
        <img
          src={item.gambar}
          alt={item.nama}
          className="w-full h-full object-contain p-5"
        />
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2">
          {item.nama}
        </h2>

        <div className="text-slate-600 space-y-1 flex-grow text-sm sm:text-base">
          <p>
            <span className="font-medium">Jenis:</span> {item.jenis}
          </p>
          {item.ukuran && (
            <p>
              <span className="font-medium">Ukuran:</span> {item.ukuran} inch
            </p>
          )}
          <p>
            <span className="font-medium">Harga:</span> Rp{" "}
            {item.harga.toLocaleString("id-ID")}
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
            href={`https://wa.me/6281354497088?text=Halo%2C%20saya%20ingin%20memesan%20sepeda%20${encodeURIComponent(
              item.nama
            )}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full py-2 px-4 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-center text-sm sm:text-base transition"
          >
            Pesan Sekarang
          </a>
        ) : (
          <button
            disabled
            className="mt-4 w-full py-2 px-4 rounded-lg bg-gray-300 text-gray-500 text-sm sm:text-base cursor-not-allowed"
          >
            Stok Habis
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
