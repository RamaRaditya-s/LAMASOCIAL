"use client";
import React, { useEffect, useState } from "react";
import AdsManagementSkeleton from "@/components/skeleton/AdsManagementSkeleton";

interface Ad {
  id: string;
  advertiser: string;
  adTitle: string;
  impressions: number;
  clicks: number;
  status: string;
  date: string;
}

export default function AdsManagementPage() {
  const [ads, setAds] = useState<Ad[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const adsPerPage = 3; // jumlah iklan per halaman

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Data dummy lebih banyak supaya pagination terasa nyata
      setAds([
        {
          id: "a1",
          advertiser: "Coca Cola",
          adTitle: "Refresh Your Day Campaign",
          impressions: 12000,
          clicks: 340,
          status: "Active",
          date: "2025-02-01",
        },
        {
          id: "a2",
          advertiser: "Nike",
          adTitle: "Just Do It",
          impressions: 9800,
          clicks: 210,
          status: "Paused",
          date: "2025-01-28",
        },
        {
          id: "a3",
          advertiser: "Spotify",
          adTitle: "Premium for Students",
          impressions: 14500,
          clicks: 450,
          status: "Ended",
          date: "2025-01-25",
        },
        {
          id: "a4",
          advertiser: "Samsung",
          adTitle: "Galaxy Z Fold Campaign",
          impressions: 16400,
          clicks: 500,
          status: "Active",
          date: "2025-01-20",
        },
        {
          id: "a5",
          advertiser: "Tokopedia",
          adTitle: "Waktu Indonesia Belanja",
          impressions: 17800,
          clicks: 640,
          status: "Active",
          date: "2025-01-18",
        },
        {
          id: "a6",
          advertiser: "Grab",
          adTitle: "GrabFood Promo",
          impressions: 12300,
          clicks: 310,
          status: "Paused",
          date: "2025-01-15",
        },
      ]);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  if (!ads) {
    return <AdsManagementSkeleton />;
  }

  // Pagination logic
  const totalPages = Math.ceil(ads.length / adsPerPage);
  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = ads.slice(indexOfFirstAd, indexOfLastAd);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <section className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">
          Manajemen Iklan & Monetisasi
        </h1>
        <p className="text-gray-600 mt-1">
          Kelola performa iklan, status kampanye, dan hasil monetisasi.
        </p>
      </section>

      {/* Ads Table */}
      <section className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Daftar Iklan</h3>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition">
            Tambah Iklan
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-700">
                  Pengiklan
                </th>
                <th className="px-6 py-3 font-semibold text-gray-700">
                  Judul Iklan
                </th>
                <th className="px-6 py-3 font-semibold text-gray-700">
                  Tayangan
                </th>
                <th className="px-6 py-3 font-semibold text-gray-700">Klik</th>
                <th className="px-6 py-3 font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 font-semibold text-gray-700">
                  Tanggal
                </th>
                <th className="px-6 py-3 font-semibold text-gray-700 text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {currentAds.map((ad) => (
                <tr
                  key={ad.id}
                  className="border-b border-gray-50 hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {ad.advertiser}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{ad.adTitle}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {ad.impressions.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {ad.clicks.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        ad.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : ad.status === "Paused"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {ad.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{ad.date}</td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button className="px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex justify-between items-center p-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Menampilkan {indexOfFirstAd + 1}–
            {Math.min(indexOfLastAd, ads.length)} dari {ads.length} iklan
          </p>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-3 py-1 text-sm border rounded-lg transition ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed bg-gray-50"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 text-sm border rounded-lg transition ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed bg-gray-50"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
