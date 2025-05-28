import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { tableVariants, rowVariants } from "../../variants/animations";
import { isDateExpired } from "../../utils/subscriptionUtils";

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
          <th scope="col" className="py-4 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            ID
          </th>
          <th scope="col" className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Start Date
          </th>
          <th scope="col" className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            End Date
          </th>
          <th scope="col" className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Order ID
          </th>
          <th scope="col" className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Plan Type
          </th>
          <th scope="col" className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {subscriptions?.length > 0 ? (
          subscriptions.map((subscription, index) => (
            <motion.tr 
              key={subscription.id} 
              variants={rowVariants}
              custom={index}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.05 }}
              className="bg-white border-b hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="py-4 px-6 text-gray-900 font-medium">
                {subscription.id}
              </td>
              <td className="py-4 text-gray-600">
                {new Date(subscription.startDate).toLocaleDateString()}
              </td>
              <td className="py-4 text-gray-600">
                {new Date(subscription.endDate).toLocaleDateString()}
              </td>
              <td className="py-4 text-gray-900 font-mono text-sm px-3 rounded">
                {subscription.orderId}
              </td>
              <td className="py-4">
                <span className={`px-3 py-1 text-xs font-medium rounded-full
                  ${subscription.planType === "Year" ? "bg-purple-100 text-purple-800" :
                    subscription.planType === "Semester" ? "bg-blue-100 text-blue-800" :
                    subscription.planType === "Quarter" ? "bg-green-100 text-green-800" :
                    "bg-gray-100 text-gray-800"}`}>
                  {subscription.planType}
                </span>
              </td>
              <td className="py-4">
                {isDateExpired(subscription.endDate) ? (
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                    Expired
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Active
                  </span>
                )}
              </td>
            </motion.tr>
          ))
        ) : (
          <motion.tr variants={rowVariants}>
            <td colSpan="6" className="px-6 py-8 text-center text-gray-500 bg-gray-50">
              <div className="flex flex-col items-center justify-center">
                <span className="text-lg font-medium">No subscriptions found</span>
                <span className="text-sm text-gray-400 mt-1">Add a new subscription to get started</span>
              </div>
            </td>
          </motion.tr>
        )}
      </tbody>
    </motion.table>
  );
} 