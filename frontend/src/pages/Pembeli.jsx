import React, { useState, useEffect } from "react";
import ItemCard from "../components/itemcard";
import data from "../assets/data";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import BackButton from "../components/backbutton";
import { motion } from "framer-motion";

const Pembeli = () => {
  const [stocks, setStocks] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 15;
  const categories = ["Semua", ...new Set(data.map((item) => item.jenis))];

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "stocks"));
        const stockData = {};
        querySnapshot.forEach((doc) => {
          stockData[doc.id] = doc.data().amount;
        });
        setStocks(stockData);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStocks();
  }, []);

  const productsWithStock = data.map((product) => ({
    ...product,
    stock: stocks[product.id] || 0,
  }));

  const filteredItems = productsWithStock.filter((item) => {
    const matchesSearch =
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.jenis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Semua" || item.jenis === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-teal-200"></div>
          <p className="text-slate-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-7xl">
      <BackButton />

      <div className="text-center mb-8 mt-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800">
          Juragan Sepeda Manado
        </h1>
        <p className="text-slate-600 mt-2">Daftar Produk</p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8 sm:mb-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:w-1/2 lg:w-2/5">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari sepeda..."
                className="w-full px-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="w-full sm:w-auto overflow-x-auto pb-2">
            <div className="flex gap-2 flex-nowrap sm:flex-wrap sm:justify-end">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-teal-600 text-white shadow-md"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  } transition-colors`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-slate-500">
        Menampilkan {filteredItems.length} produk
      </div>

      {/* Products Grid */}
      {filteredItems.length > 0 ? (
        <>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {currentItems.map((sepeda) => (
              <ItemCard key={sepeda.id} item={sepeda} stock={sepeda.stock} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center mt-8 gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg bg-slate-100 text-slate-700 disabled:opacity-50 hover:bg-slate-200 transition-colors"
              >
                &larr; Prev
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg ${
                      currentPage === pageNum
                        ? "bg-teal-600 text-white shadow-md"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    } transition-colors`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <span className="px-3 py-1 sm:px-4 sm:py-2 text-slate-500">
                  ...
                </span>
              )}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  {totalPages}
                </button>
              )}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 sm:px-4 sm:py-2 rounded-lg bg-slate-100 text-slate-700 disabled:opacity-50 hover:bg-slate-200 transition-colors"
              >
                Next &rarr;
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 sm:py-16">
          <div className="mx-auto w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl">🔍</span>
          </div>
          <p className="text-slate-500 text-lg">
            Tidak ada barang yang ditemukan
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("Semua");
            }}
            className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Reset Pencarian
          </button>
        </div>
      )}
    </div>
  );
};

export default Pembeli;
