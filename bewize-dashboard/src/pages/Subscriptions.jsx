import React, { useState } from "react";
import { motion } from "framer-motion";
import PageTitle from "../components/PageTitle";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import DashboardLayout from "../layouts/DashboardLayout";
import FilterByButton from "../components/FilterByButton";
import SubscriptionsTable from "../components/Tables/SubscriptionsTable";
import {
  faBox,
  faDollarSign,
  faFileInvoiceDollar,
  faHistory,
  faCircleCheck,
  faCircleXmark,
  faCalendarDay,
  faCalendarWeek,
  faPlus,
  faCalendarDays,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mockSubscriptions from "../data/mockSubscriptions";

export default function Subscriptions() {
  // Searching
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const [showCreateForm, setShowCreateForm] = useState(false);
  // Handle Create Form Button
  const handleCreateClick = () => {
    setShowCreateForm(true);
  };

  // Total Subscriptions
  const totalSubscriptions = mockSubscriptions.length;

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

  // Is Subscription Expired
  const isDateExpired = (endDate) => {
    const today = new Date();
    const expiry = new Date(endDate);
    return expiry < today;
  };

  // Filter & Search Algorithm
  const filteredSubscriptions = mockSubscriptions
    .filter(
      (subscription) =>
        subscription.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscription.orderId.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (subscription) =>
        (!filters.status ||
          (filters.status === "Active" &&
            !isDateExpired(subscription.endDate)) ||
          (filters.status === "Expired" &&
            isDateExpired(subscription.endDate))) &&
        (!filters.plan_type || subscription.planType === filters.plan_type)
    );

  // Displayed Subscriptions in paginated page
  const paginatedSubscriptions = filteredSubscriptions.slice(
    startIndex,
    endIndex
  );

  // Edit Subscription Form
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  // Handle Edit Form Open
  const handleEditClick = (subscription) => {
    setSelectedSubscription(subscription);
    setShowEditForm(true);
  };

  // Handle Edit Form Change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedSubscription((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Submit
  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Find the index of the subscription to update
    const index = mockSubscriptions.findIndex(
      (sub) => sub.id === selectedSubscription.id
    );
    if (index !== -1) {
      // Update the subscription at the found index
      mockSubscriptions[index] = selectedSubscription;
    }
    setShowEditForm(false);
  };

  // Delete Subscription
  const deleteSubscription = (id) => {
    const index = mockSubscriptions.findIndex((sub) => sub.id === id);
    if (index !== -1) {
      mockSubscriptions.splice(index, 1);
    }
  };

  return (
    <DashboardLayout>
      <PageTitle title={"All Subscriptions"} icon={faDollarSign} />
      <div className="flex flex-col items-center md:flex-row gap-4 mb-3">
        <div className="w-full md:w-1/3">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search subscriptions by ID or order ID..."
          />
        </div>
        <div className="flex-1 flex flex-wrap gap-1 items-center justify-between">
          <div className="flex">
            <FilterByButton
              label="Status"
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              options={[
                {
                  value: "Active",
                  label: (
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="text-green-500"
                      />{" "}
                      Active
                    </span>
                  ),
                },
                {
                  value: "Expired",
                  label: (
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        className="text-red-500"
                      />{" "}
                      Expired
                    </span>
                  ),
                },
              ]}
              onReset={() => handleResetFilter("status")}
            />
            <FilterByButton
              label="Plan Type"
              value={filters.plan_type}
              onChange={(e) => handleFilterChange("plan_type", e.target.value)}
              options={[
                {
                  value: "Month",
                  label: (
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faCalendarDay}
                        className="text-blue-500"
                      />{" "}
                      Monthly
                    </span>
                  ),
                },
                {
                  value: "Quarter",
                  label: (
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faCalendarWeek}
                        className="text-purple-500"
                      />{" "}
                      Quarterly
                    </span>
                  ),
                },
                {
                  value: "Semester",
                  label: (
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faCalendarDays}
                        className="text-green-500"
                      />{" "}
                      Semester
                    </span>
                  ),
                },
                {
                  value: "Year",
                  label: (
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faCalendar}
                        className="text-orange-500"
                      />{" "}
                      Yearly
                    </span>
                  ),
                },
              ]}
              onReset={() => handleResetFilter("plan_type")}
            />
          </div>

          <div className="flex flex-row">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="border rounded-md shadow-sm hover:shadow-md hover:bg-blue-500 px-2 py-1.5 bg-blue-600 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-all duration-200 ease-in-out leading-none"
              onClick={handleCreateClick}
            >
              <FontAwesomeIcon icon={faPlus} className="text-xs" />
              <span>Create Subscription</span>
            </motion.button>

            <Pagination
              page={page}
              handleChangePage={handleChangePage}
              rowsPerPage={rowsPerPage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              count={totalSubscriptions}
            />
          </div>
        </div>
      </div>

      <SubscriptionsTable
        subscriptions={paginatedSubscriptions}
        onEdit={handleEditClick}
        onDelete={deleteSubscription}
        showEditForm={showEditForm}
        selectedSubscription={selectedSubscription}
        handleEditChange={handleEditChange}
        handleEditSubmit={handleEditSubmit}
        setShowEditForm={setShowEditForm}
      />
    </DashboardLayout>
  );
}
