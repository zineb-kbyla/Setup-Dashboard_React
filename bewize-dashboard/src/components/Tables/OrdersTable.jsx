import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { tableVariants, rowVariants } from "../../variants/animations";

export default function OrdersTable({ orders }) {
  const navigate = useNavigate();

  const handleViewDetails = (order) => {
    navigate('/order', { state: { order } });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      variants={tableVariants}
      initial="hidden"
      animate="visible"
      className="overflow-hidden"
    >
      <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Order Number
            </th>
            <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Plan Type
            </th>
            <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Discount
            </th>
            <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Payment Method
            </th>
            <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <motion.tr
                key={order.id}
                variants={rowVariants}
                custom={index}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.05 }}
                className="bg-white border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-4 text-gray-900 font-medium">
                  {order.order_number}
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div>
                      <h2 className="font-semibold text-md">{order.customer_name}</h2>
                      <p className="text-gray-600 text-sm">{order.customer_email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-gray-600">
                  {formatDate(order.date)}
                </td>
                <td className="py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded
                    ${order.plan_type === "subscription" ? "bg-purple-100 text-purple-800" :
                      order.plan_type === "bundle" ? "bg-blue-100 text-blue-800" :
                      "bg-green-100 text-green-800"}`}>
                    {order.plan_type.charAt(0).toUpperCase() + order.plan_type.slice(1)}
                  </span>
                </td>
                <td className="py-4 text-gray-900">
                  ${order.total_amount.toFixed(2)}
                </td>
                <td className="py-4 text-gray-900">
                  ${order.discount.toFixed(2)}
                </td>
                <td className="py-4 text-gray-600">
                  {order.payment_method}
                </td>
                <td className="py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}`}>
                    {order.status}
                  </span>
                </td>
              </motion.tr>
            ))
          ) : (
            <motion.tr
              variants={rowVariants}
              initial="hidden"
              animate="visible"
            >
              <td colSpan="8" className="px-4 py-4 text-left text-gray-500">
                No orders found
              </td>
            </motion.tr>
          )}
        </tbody>
      </table>
    </motion.div>
  );
} 