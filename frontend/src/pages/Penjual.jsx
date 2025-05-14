import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import data from "../assets/data";
import BackButton from "../components/backbutton";
import { useNavigate } from "react-router-dom";

const Penjual = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [harga, setHarga] = useState("");
  const [status, setStatus] = useState("");
  const [currentStock, setCurrentStock] = useState(null);

  useEffect(() => {
    const fetchStock = async () => {
      if (!selectedProduct) {
        setCurrentStock(null);
        setHarga("");
        return;
      }
      try {
        const docSnap = await getDoc(doc(db, "stocks", selectedProduct));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCurrentStock(data.amount ?? 0);
          setHarga(data.harga?.toString() ?? "");
        } else {
          setCurrentStock(0);
          setHarga("");
        }
        setStatus("");
      } catch (e) {
        console.error("Gagal ambil stok:", e);
        setCurrentStock(null);
        setHarga("");
      }
    };
    fetchStock();
  }, [selectedProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct || isNaN(amount) || isNaN(harga)) {
      setStatus("Pilih produk & masukkan stok dan harga valid.");
      return;
    }
    try {
      await setDoc(doc(db, "stocks", selectedProduct), {
        amount: parseInt(amount),
        harga: parseInt(harga),
      });
      setStatus("✅ Stok dan harga berhasil diperbarui.");
      setCurrentStock(parseInt(amount));
    } catch (e) {
      console.error("Update error:", e);
      setStatus("❌ Gagal memperbarui stok/harga.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const selected = data.find((i) => i.id === selectedProduct);

  return (
    <div className="min-h-screen bg-slate-100 px-4 sm:px-6 py-6 md:py-8 lg:py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <BackButton />
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 mt-8 rounded-lg text-sm sm:text-base transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="bg-white shadow-md rounded-xl p-5 sm:p-6 md:p-8 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            Atur Stok
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-slate-700 mb-1 sm:mb-2 font-medium text-sm sm:text-base">
                Pilih Produk
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="">-- Pilih Produk --</option>
                {data.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nama} ({item.jenis})
                    {item.ukuran ? ` - ${item.ukuran}"` : ""}
                  </option>
                ))}
              </select>
            </div>

            {selected && (
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs sm:text-sm">
                <p className="mb-1">
                  <span className="font-medium">Nama:</span> {selected.nama}
                </p>
                <p className="mb-1">
                  <span className="font-medium">Jenis:</span> {selected.jenis}
                </p>
                {selected.ukuran && (
                  <p className="mb-1">
                    <span className="font-medium">Ukuran:</span>{" "}
                    {selected.ukuran}"
                  </p>
                )}
                <p className="mb-1">
                  <span className="font-medium">Harga Saat Ini:</span> Rp{" "}
                  {harga
                    ? parseInt(harga).toLocaleString("id-ID")
                    : "Memuat..."}
                </p>
                <p>
                  <span className="font-medium">Stok Saat Ini:</span>{" "}
                  {currentStock !== null ? currentStock : "Memuat..."}
                </p>
              </div>
            )}

            <div>
              <label className="block text-slate-700 mb-1 sm:mb-2 font-medium text-sm sm:text-base">
                Jumlah Stok Baru
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Masukkan stok baru"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-1 sm:mb-2 font-medium text-sm sm:text-base">
                Harga Baru (Rp)
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Masukkan harga baru"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base transition-colors"
            >
              Simpan
            </button>
          </form>

          {status && (
            <p className="text-center text-xs sm:text-sm font-medium text-slate-600 mt-2">
              {status}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Penjual;
