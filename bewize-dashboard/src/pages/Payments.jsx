import React, { useState } from "react";
import { motion } from "framer-motion";
import PageTitle from "../components/PageTitle";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import DashboardLayout from "../layouts/DashboardLayout";
import FilterByButton from "../components/FilterByButton";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mockPayments from "../data/mockPayments";
import { renderPaymentMethod, renderPaymentStatus, renderPaymentDate } from "../utils/paymentUtils";

export default function Payments() {
  // Searching
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination 
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Total Payments
  const totalPayments = mockPayments.length;

  // Handle Page Change 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle Change Rows Per Page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter Options
  const [filters, setFilters] = useState({
    payment_status: "",
    payment_method: "",
  });
  
  // Handle Filter Change
  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  // Handle Reset Filter
  const handleResetFilter = (filterName) => {
    setFilters((prev) => ({ ...prev, [filterName]: "" }));
  };

  // Filter & Search Algorithm
  const filteredPayments = mockPayments
    .filter(
      (payment) =>
        payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (payment) =>
        (!filters.payment_status || payment.payment_status === filters.payment_status) &&
        (!filters.payment_method || payment.payment_method === filters.payment_method)
    );

  // Displayed Payments in paginated page
  const paginatedPayments = filteredPayments.slice(startIndex, endIndex);

  return (
    <DashboardLayout>
      <PageTitle title={'All Payments'} icon={faHistory} />
      <div className="flex flex-col items-center md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search payments by ID, customer name or email..."
          />
        </div>
        <div className="flex-1 flex flex-wrap gap-1 items-center">
          <FilterByButton
            label="Status"
            value={filters.payment_status}
            onChange={(e) => handleFilterChange("payment_status", e.target.value)}
            options={[
              { value: "Paid", label: "Paid" },
              { value: "Pending", label: "Pending" },
              { value: "Failed", label: "Failed" },
              { value: "Refunded", label: "Refunded" },
            ]}
            onReset={() => handleResetFilter("payment_status")}
          />

          <FilterByButton
            label="Payment Method"
            value={filters.payment_method}
            onChange={(e) => handleFilterChange("payment_method", e.target.value)}
            options={[
              { value: "Visa", label: "Visa" },
              { value: "PayPal", label: "PayPal" },
              { value: "MasterCard", label: "MasterCard" },
              { value: "Apple Pay", label: "Apple Pay" },
            ]}
            onReset={() => handleResetFilter("payment_method")}
          />

          <Pagination
            page={page}
            handleChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            count={totalPayments}
          />
        </div>
      </div>

      {/* Payments Table */}
      <div className="mt-4">
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
            {paginatedPayments.length > 0 ? (
              paginatedPayments.map((payment) => (
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
      </div>
    </DashboardLayout>
  );
}
