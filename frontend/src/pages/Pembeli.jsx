import React, { useState, useEffect } from "react";
import ItemCard from "../components/itemcard";
import data from "../assets/data";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import BackButton from "../components/backbutton";

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

  useEffect(() => {
    const fetchStocks = async () => {
      const querySnapshot = await getDocs(collection(db, "stocks"));
      const stockData = {};
      querySnapshot.forEach((doc) => {
        stockData[doc.id] = doc.data().amount;
      });
      setStocks(stockData);
    };
    fetchStocks();
  }, []);

  const productsWithStock = data.map((product) => ({
    ...product,
    stock: stocks[product.id] || 0,
  }));

  const filteredItems = data.filter((item) => {
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
        <p>Memuat data...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton />
      <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">
        Juragan Sepeda Manado
      </h1>

      <div className="my-10 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder="Cari sepeda..."
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-wrap gap-2 justify-end">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === category
                  ? "bg-teal-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {currentItems.map((sepeda) => (
              <ItemCard
                key={sepeda.id}
                item={sepeda}
                stock={stocks[sepeda.id] || 0}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 disabled:opacity-50"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === page
                        ? "bg-teal-600 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">
            Tidak ada barang yang ditemukan
          </p>
        </div>
      )}
    </div>
  );
};

export default Pembeli;
