import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes, faPercent, faCalendarAlt, faTag, faIdCard, faToggleOn } from "@fortawesome/free-solid-svg-icons";

export default function CreateDiscountForm({
  showCreateForm,
  setShowCreateForm,
  createdDiscount,
  handleCreateChange,
  handleCreateSubmit,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) setShowCreateForm(false);
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-white p-4 sm:p-5 rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FontAwesomeIcon
              icon={faEdit}
              className="text-blue-600"
            />
            Create Discount
          </h3>
          <button
            onClick={() => setShowCreateForm(false)}
            className="text-gray-500 hover:text-gray-800 transition-colors"
            aria-label="Close"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        <form onSubmit={handleCreateSubmit} className="space-y-3">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-0.5 flex items-center gap-2">
              <FontAwesomeIcon
                icon={faTag}
                className="text-gray-500"
              />
              Code
            </label>
            <input
              type="text"
              name="code"
              value={createdDiscount.code}
              onChange={handleCreateChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="e.g. SUMMER2025"
              required
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-0.5 flex items-center gap-2">
              <FontAwesomeIcon
                icon={faPercent}
                className="text-gray-500"
              />
              Percentage
            </label>
            <div className="relative">
              <input
                type="number"
                name="percentage"
                value={createdDiscount.percentage}
                onChange={handleCreateChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                min="0"
                max="100"
                required
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                %
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-0.5 flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="text-gray-500"
                />
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={createdDiscount.startDate}
                onChange={handleCreateChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                required
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-0.5 flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="text-gray-500"
                />
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={createdDiscount.endDate}
                onChange={handleCreateChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-0.5 flex items-center gap-2">
              <FontAwesomeIcon
                icon={faToggleOn}
                className="text-gray-500"
              />
              Status
            </label>
            <select
              name="status"
              value={createdDiscount.status}
              onChange={handleCreateChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-4 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setShowCreateForm(false)}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Discount
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
} 