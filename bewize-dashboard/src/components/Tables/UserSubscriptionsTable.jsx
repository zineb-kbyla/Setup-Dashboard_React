import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { tableVariants, rowVariants, buttonVariants } from "../../variants/animations";

export default function UserSubscriptionsTable({ subscriptions }) {
  const navigate = useNavigate();

  const handleViewDetails = (subscription) => {
    navigate('/subscription', { state: { subscription } });
  };

  return (
    <motion.table 
      className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden"
      variants={tableVariants}
      initial="hidden"
      animate="visible"
    >
      <thead className="bg-gray-50">
        <tr>
          <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
            ID
          </th>
          <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
            Start Date
          </th>
          <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
            End Date
          </th>
          <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
            Order ID
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {subscriptions?.length > 0 ? (
          subscriptions.map((subscription) => (
            <motion.tr 
              key={subscription.id} 
              className="bg-white border-b hover:bg-gray-50 transition-colors"
              variants={rowVariants}
            >
              <td className="py-4 px-4 text-gray-900 font-medium">
                {subscription.id}
              </td>
              <td className="py-4 text-gray-600">
                {new Date(subscription.startDate).toLocaleDateString()}
              </td>
              <td className="py-4 text-gray-600">
                {new Date(subscription.endDate).toLocaleDateString()}
              </td>
              <td className="py-4 text-gray-600">
                {subscription.orderId}
              </td>
            </motion.tr>
          ))
        ) : (
          <motion.tr variants={rowVariants}>
            <td colSpan="5" className="px-4 py-4 text-left text-gray-500">
              No subscriptions found
            </td>
          </motion.tr>
        )}
      </tbody>
    </motion.table>
  );
} 