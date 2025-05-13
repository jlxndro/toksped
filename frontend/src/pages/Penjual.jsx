import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import data from "../assets/data";
import BackButton from "../components/backbutton";

const Penjual = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [currentStock, setCurrentStock] = useState(null);

  useEffect(() => {
    const fetchStock = async () => {
      if (!selectedProduct) {
        setCurrentStock(null);
        return;
      }
      try {
        const docSnap = await getDoc(doc(db, "stocks", selectedProduct));
        setCurrentStock(docSnap.exists() ? docSnap.data().amount : 0);
        setStatus("");
      } catch (e) {
        console.error("Gagal ambil stok:", e);
        setCurrentStock(null);
      }
    };
    fetchStock();
  }, [selectedProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct || isNaN(amount)) {
      setStatus("Pilih produk & masukkan stok valid.");
      return;
    }
    try {
      await setDoc(doc(db, "stocks", selectedProduct), {
        amount: parseInt(amount),
      });
      setStatus("✅ Stok berhasil diperbarui.");
      setCurrentStock(parseInt(amount));
    } catch (e) {
      console.error("Update error:", e);
      setStatus("❌ Gagal memperbarui stok.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  const selected = data.find((i) => i.id === selectedProduct);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <BackButton />
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="bg-white shadow rounded-xl p-6 space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Atur Stok</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-700 mb-1 font-medium">
                Pilih Produk
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded"
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
              <div className="bg-slate-50 p-4 rounded border text-sm">
                <p>
                  <strong>Nama:</strong> {selected.nama}
                </p>
                <p>
                  <strong>Jenis:</strong> {selected.jenis}
                </p>
                {selected.ukuran && (
                  <p>
                    <strong>Ukuran:</strong> {selected.ukuran}"
                  </p>
                )}
                <p>
                  <strong>Harga:</strong> Rp{" "}
                  {selected.harga.toLocaleString("id-ID")}
                </p>
                <p>
                  <strong>Stok Saat Ini:</strong>{" "}
                  {currentStock !== null ? currentStock : "Memuat..."}
                </p>
              </div>
            )}

            <div>
              <label className="block text-slate-700 mb-1 font-medium">
                Jumlah Stok Baru
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded"
                placeholder="Masukkan stok baru"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700"
            >
              Simpan
            </button>
          </form>

          {status && (
            <p className="text-center text-sm font-medium text-slate-600 mt-2">
              {status}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Penjual;
