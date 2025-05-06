import React from "react";

export default function OrderRow({ order }) {
  return (
      <tr className="bg-white border-b hover:bg-gray-50 transition-colors">
        <td className="py-4 px-4 text-gray-900 font-medium">{order.id}</td>
        <td className="py-4">
          <span
            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${
                    order.status === "paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
          >
            {order.status}
          </span>
        </td>
        <td className="py-4 text-gray-900">${order.amount.toFixed(2)}</td>
        <td className="py-4 text-gray-600">
          {new Date(order.date).toLocaleDateString()}
        </td>
        <td className="py-4 text-gray-600 font-mono text-sm">
          {order.transactionId}
        </td>
        <td className="py-4">
          <span
            className={`px-2 py-1 text-xs font-medium rounded
                  ${
                    order.planType === "Premium"
                      ? "bg-purple-100 text-purple-800"
                      : order.planType === "Enterprise"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
          >
            {order.planType}
          </span>
        </td>
      </tr>

  );
}
