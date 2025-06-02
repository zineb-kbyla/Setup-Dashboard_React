import React, { useState } from "react";
import { motion } from "framer-motion";
import mockOrders from "../data/mockOrders";
import PageTitle from "../components/PageTitle";
import SearchBar from "../components/SearchBar";
import OrdersTable from "../components/Tables/OrdersTable";
import Pagination from "../components/Pagination";
import DashboardLayout from "../layouts/DashboardLayout";
import FilterByButton from "../components/FilterByButton";
import { 
  faBox, 
  faBoxes, 
  faCartShopping, 
  faHistory,
  faCircleCheck,
  faSpinner,
  faClock,
  faCircleXmark,
  faBook,
  faBoxOpen,
  faGift
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Orders() {
  // Searching
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Total Orders
  const totalOrders = mockOrders.length;

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
    status: "",
    payment_method: "",
    plan_type: "",
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
  const filteredOrders = mockOrders
    .filter(
      (order) =>
        order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (order) =>
        (!filters.status || order.status === filters.status) &&
        (!filters.payment_method || order.payment_method === filters.payment_method) &&
        (!filters.plan_type || order.plan_type === filters.plan_type)
    );

  // Displayed Orders in paginated page
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  return (
    <DashboardLayout>
      <PageTitle title={"All Orders"} icon={faCartShopping} />
      <div className="flex flex-col items-center md:flex-row gap-4 mb-3">
        <div className="w-full md:w-1/3">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search orders by number, customer name or email..."
          />
        </div>
        <div className="flex-1 flex flex-wrap gap-1 items-center justify-between">
          <div className="flex">
            <FilterByButton
              label="Status"
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              options={[
                { value: "Completed", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCircleCheck} className="text-green-500" /> Completed</span> },
                { value: "Processing", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faSpinner} className="text-blue-500" /> Processing</span> },
                { value: "Pending", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faClock} className="text-yellow-500" /> Pending</span> },
                { value: "Cancelled", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCircleXmark} className="text-red-500" /> Cancelled</span> },
              ]}
              onReset={() => handleResetFilter("status")}
            />
            <FilterByButton
              label="Plan Type"
              value={filters.plan_type}
              onChange={(e) => handleFilterChange("plan_type", e.target.value)}
              options={[
                { value: "subscription", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faBox} className="text-blue-500" /> Subscription</span> },
                { value: "course", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faBook} className="text-purple-500" /> Course</span> },
                { value: "bundle", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faGift} className="text-pink-500" /> Bundle</span> },
              ]}
              onReset={() => handleResetFilter("plan_type")}
            />
          </div>
          <Pagination
            page={page}
            handleChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            count={totalOrders}
          />
        </div>
      </div>

      {/* Orders Table */}
      <OrdersTable orders={paginatedOrders} />
    </DashboardLayout>
  );
}
