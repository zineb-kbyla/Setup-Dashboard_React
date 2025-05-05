import React from "react";

export default function Pagination({ currentPage, totalPages, setCurrentPage }) {
  return (
    <div className="flex justify-center items-center gap-6 my-6">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-black text-white rounded-lg disabled:opacity-50 hover:bg-gray-800 transition-colors"
      >
        Previous
      </button>

      <div className="flex items-center gap-2">
        <span className="px-3 py-1 bg-gray-100 rounded-lg text-gray-800 font-medium">
          {currentPage}
        </span>
        <span className="text-gray-500">of</span>
        <span className="text-gray-500">{totalPages}</span>
      </div>

      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-black text-white rounded-lg disabled:opacity-50 hover:bg-gray-800 transition-colors"
      >
        Next
      </button>
    </div>
  );
}