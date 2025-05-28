import React from "react";
import { motion } from "framer-motion";
import { renderPaymentMethod, renderPaymentStatus, renderPaymentDate } from "../../utils/paymentUtils";
import { tableVariants, rowVariants } from "../../variants/animations";

export default function PaymentsTable({ payments }) {
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
            <th scope="col" className="py-4 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Payment ID
            </th>
            <th scope="col" className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Customer
            </th>
            <th scope="col" className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Amount
            </th>
            <th scope="col" className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Payment Method
            </th>
            <th scope="col" className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Date Paid
            </th>
            <th scope="col" className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payments.length > 0 ? (
            payments.map((payment, index) => (
              <motion.tr
                key={payment.id}
                variants={rowVariants}
                custom={index}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.05 }}
                className="bg-white border-b hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-4 px-6 text-gray-900 font-medium">
                  {payment.id}
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div>
                      <h2 className="font-medium text-md">{payment.user_name}</h2>
                      <p className="text-gray-600 text-sm">{payment.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                    ${payment.amount}
                  </span>
                </td>
                <td className="py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-50 text-gray-700">
                    {renderPaymentMethod(payment.payment_method)}
                  </span>
                </td>
                <td className="py-4 text-gray-600">
                  {renderPaymentDate(payment.paid_at)}
                </td>
                <td className="py-4">
                  {renderPaymentStatus(payment.payment_status)}
                </td>
              </motion.tr>
            ))
          ) : (
            <motion.tr
              variants={rowVariants}
              initial="hidden"
              animate="visible"
            >
              <td colSpan="6" className="px-6 py-8 text-center text-gray-500 bg-gray-50">
                <div className="flex flex-col items-center justify-center">
                  <span className="text-lg font-medium">No Payments found</span>
                  <span className="text-sm text-gray-400 mt-1">Add a new payment to get started</span>
                </div>
              </td>
            </motion.tr>
          )}
        </tbody>
      </table>
    </motion.div>
  );
} 