import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const ComplaintStatisticsCards = ({ statistics }) => {
  const { totalComplaints, openComplaints, resolvedComplaints } = statistics;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Complaints</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{totalComplaints}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-blue-600 text-xl" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Open</p>
            <p className="text-2xl font-semibold text-orange-600 mt-1">{openComplaints}</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-xl">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-orange-600 text-xl" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Resolved</p>
            <p className="text-2xl font-semibold text-green-600 mt-1">{resolvedComplaints}</p>
          </div>
          <div className="p-3 bg-green-50 rounded-xl">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-green-600 text-xl" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ComplaintStatisticsCards; 