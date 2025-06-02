import React, { useState } from "react";
import { motion } from "framer-motion";
import PageTitle from "../components/PageTitle";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import DashboardLayout from "../layouts/DashboardLayout";
import FilterByButton from "../components/FilterByButton";
import PaymentsTable from "../components/Tables/PaymentsTable";
import { 
  faCreditCard, 
  faHistory,
  faCircleCheck,
  faClock,
  faCircleXmark,
  faMoneyBillTransfer,
  faCcVisa,
  faCcPaypal,
  faCcMastercard,
  faApplePay
} from "@fortawesome/free-solid-svg-icons";
import { 
  faCcVisa as faCcVisaBrand,
  faCcPaypal as faCcPaypalBrand,
  faCcMastercard as faCcMastercardBrand,
  faApplePay as faApplePayBrand
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mockPayments from "../data/mockPayments";

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
      <PageTitle title={'All Payments'} icon={faCreditCard} />
      <div className="flex flex-col items-center md:flex-row gap-4 mb-3">
        <div className="w-full md:w-1/3">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search payments by ID, customer name or email..."
          />
        </div>
        <div className="flex-1 flex flex-wrap gap-1 items-center justify-between">
          <div className="flex">
            <FilterByButton
              label="Status"
              value={filters.payment_status}
              onChange={(e) => handleFilterChange("payment_status", e.target.value)}
              options={[
                { value: "Paid", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCircleCheck} className="text-green-500" /> Paid</span> },
                { value: "Pending", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faClock} className="text-yellow-500" /> Pending</span> },
                { value: "Failed", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCircleXmark} className="text-red-500" /> Failed</span> },
                { value: "Refunded", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faMoneyBillTransfer} className="text-blue-500" /> Refunded</span> },
              ]}
              onReset={() => handleResetFilter("payment_status")}
            />

            <FilterByButton
              label="Method"
              value={filters.payment_method}
              onChange={(e) => handleFilterChange("payment_method", e.target.value)}
              options={[
                { value: "Visa", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCcVisaBrand} className="text-blue-600" /> Visa</span> },
                { value: "PayPal", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCcPaypalBrand} className="text-blue-500" /> PayPal</span> },
                { value: "MasterCard", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCcMastercardBrand} className="text-red-600" /> MasterCard</span> },
                { value: "Apple Pay", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faApplePayBrand} className="text-gray-800" /> Apple Pay</span> },
              ]}
              onReset={() => handleResetFilter("payment_method")}
            />
          </div>

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
      <div className="">
        <PaymentsTable payments={paginatedPayments} />
      </div>
    </DashboardLayout>
  );
}
