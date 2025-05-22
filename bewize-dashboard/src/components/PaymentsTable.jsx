import React from "react";
import { renderPaymentMethod, renderPaymentStatus, renderPaymentDate } from "../utils/paymentUtils";

export default function PaymentsTable({ payments }) {
  return (
    <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
            Payment ID
          </th>
          <th scope="col" className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
            Customer
          </th>
          <th scope="col" className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
            Amount
          </th>
          <th scope="col" className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
            Payment Method
          </th>
          <th scope="col" className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
            Date Paid
          </th>
          <th scope="col" className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {payments.length > 0 ? (
          payments.map((payment) => (
            <tr key={payment.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
              <td className="py-4 px-4 text-gray-900 font-medium">
                {payment.id}
              </td>
              <td className="py-4 text-gray-900 font-mono text-sm">
                {payment.user_name}
              </td>
              <td className="py-4 text-gray-600">
                {payment.amount} {payment.currency}
              </td>
              <td className="py-4 text-gray-600 text-left">
                {renderPaymentMethod(payment.payment_method)}
              </td>
              <td>{renderPaymentDate(payment.paid_at)}</td>
              <td className="py-4 text-gray-600">
                {renderPaymentStatus(payment.payment_status)}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="px-4 py-4 text-left text-gray-500">
              No payments found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
} 