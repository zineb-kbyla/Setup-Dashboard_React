import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes, faHashtag, faPercent, faCalendarAlt, faToggleOn } from "@fortawesome/free-solid-svg-icons";

export default function EditDiscountForm({
  showEditForm,
  setShowEditForm,
  selectedDiscount,
  handleEditChange,
  handleEditSubmit,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-white p-8 rounded-xl shadow-2xl w-[500px] max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <FontAwesomeIcon icon={faEdit} className="text-blue-600" />
            Edit Discount
          </h3>
          <button
            onClick={() => setShowEditForm(false)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleEditSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <FontAwesomeIcon icon={faHashtag} className="text-gray-500" />
                Code
              </label>
              <input
                type="text"
                name="code"
                value={selectedDiscount.code}
                onChange={handleEditChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <FontAwesomeIcon icon={faPercent} className="text-gray-500" />
                Percentage (%)
              </label>
              <input
                type="number"
                name="percentage"
                value={selectedDiscount.percentage}
                onChange={handleEditChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                min="0"
                max="100"
                required
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={selectedDiscount.startDate}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  required
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={selectedDiscount.endDate}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <FontAwesomeIcon icon={faToggleOn} className="text-gray-500" />
                Status
              </label>
              <select
                name="status"
                value={selectedDiscount.status}
                onChange={handleEditChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowEditForm(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
} 