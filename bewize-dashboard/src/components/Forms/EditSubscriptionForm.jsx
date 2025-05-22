import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory } from "@fortawesome/free-solid-svg-icons";

export default function EditSubscriptionForm({
  selectedSubscription,
  handleEditChange,
  handleEditSubmit,
  setShowEditForm,
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
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <FontAwesomeIcon
            icon={faHistory}
            className="text-gray-600"
          />
          Edit Subscription
        </h3>
        <form onSubmit={handleEditSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={selectedSubscription.startDate}
              onChange={handleEditChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={selectedSubscription.endDate}
              onChange={handleEditChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={() => setShowEditForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
} 