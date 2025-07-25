import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicketAlt,
  faMoneyBillWave,
  faPercent,
  faClock,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

const StatisticsCards = ({ statistics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Uses</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{statistics.totalUses}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl">
            <FontAwesomeIcon icon={faTicketAlt} className="text-blue-600 text-xl" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
          <FontAwesomeIcon icon={faClock} className="text-gray-400" />
          <span>Last used: {new Date(statistics.lastUsed).toLocaleDateString()}</span>
        </div>
      </motion.div>
    </div>
  );
};

export default StatisticsCards; 