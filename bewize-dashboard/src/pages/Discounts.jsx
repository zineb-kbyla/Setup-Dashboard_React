import React, { useState } from "react";
import { motion } from "framer-motion";
import PageTitle from "../components/PageTitle";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import DashboardLayout from "../layouts/DashboardLayout";
import FilterByButton from "../components/FilterByButton";
import DiscountsTable from "../components/DiscountsTable";
import CreateDiscountForm from "../components/CreateDiscountForm";
import {
  faHistory,
  faEdit,
  faTimes,
  faPercent,
  faCalendarAlt,
  faTag,
  faIdCard,
  faToggleOn,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mockDiscounts from "../data/mockDiscounts";

export default function Discounts() {
  // Searching
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Total Discounts
  const totalDiscounts = mockDiscounts.length;

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
  });

  // Handle Filter Change
  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  // Handle Reset Filter
  const handleResetFilter = (filterName) => {
    setFilters((prev) => ({ ...prev, [filterName]: "" }));
  };

  // Is Discount Expired
  const isDateExpired = (endDate) => {
    const today = new Date();
    const expiry = new Date(endDate);
    return expiry < today;
  };

  // Switch
  const label = { inputProps: { "aria-label": "Switch demo" } };

  // Handle Switch Status
  const handleSwitchStatus = (id) => {
    setDiscounts((prevDiscounts) =>
      prevDiscounts.map((discount) =>
        discount.id === id
          ? {
              ...discount,
              status: discount.status === "Active" ? "Inactive" : "Active",
            }
          : discount
      )
    );
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Edit Discount Form
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  // Create Discount Form
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createdDiscount, setCreatedDiscount] = useState({
    id: "DISC-000",
    code: "",
    percentage: 0,
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
      .toISOString()
      .slice(0, 10),
    status: "Active",
  });

  // Handle Create Form Button
  const handleCreateClick = () => {
    setShowCreateForm(true);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    mockDiscounts.push(createdDiscount);
    setShowCreateForm(false);
  };

  // Handle Edit Form Open
  const handleEditClick = (discount) => {
    setSelectedDiscount(discount);
    setShowEditForm(true);
  };

  // Handle Create Form Change
  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setCreatedDiscount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Submit
  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Find the index of the discount to update
    const index = mockDiscounts.findIndex(
      (dis) => dis.id === selectedDiscount.id
    );
    if (index !== -1) {
      // Update the discount at the found index
      mockDiscounts[index] = selectedDiscount;
    }
    setShowEditForm(false);
  };

  // Handle Edit Form Change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedDiscount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add state for discounts
  const [discounts, setDiscounts] = useState(mockDiscounts);

  // Delete Discount
  const deleteDiscount = (id) => {
    setDiscounts((prevDiscounts) =>
      prevDiscounts.filter((dis) => dis.id !== id)
    );
  };

  // Filter & Search Algorithm
  const filteredDiscounts = discounts.filter((discount) => {
    const matchesSearch =
      discount.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discount.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !filters.status || discount.status === filters.status;

    return matchesSearch && matchesStatus;
  });

  // Displayed Discounts in paginated page
  const paginatedDiscounts = filteredDiscounts.slice(startIndex, endIndex);

  return (
    <DashboardLayout>
      <PageTitle title={"All Discounts"} icon={faPercent} />
      <div className="flex flex-col items-center justify-between md:flex-row gap-4 mb-3">
        <div className="w-full md:w-1/3">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search discounts by ID or code..."
          />
        </div>
        <div className="flex-1 flex flex-wrap gap-1 items-center justify-between">
          <div className="flex flex-wrap gap-1 items-center">
            <FilterByButton
              label="Status"
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              options={[
                { value: "Active", label: "Active" },
                { value: "Inactive", label: "Inactive" },
              ]}
              onReset={() => handleResetFilter("status")}
            />
          </div>

          <div className="flex flex-row">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="border rounded-md shadow-sm hover:shadow-md hover:bg-blue-500 px-2.5  bg-blue-600 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-all duration-200 ease-in-out leading-none"
              onClick={handleCreateClick}
            >
              <FontAwesomeIcon icon={faPlus} className="text-xs" />
              <span>Create Discount</span>
            </motion.button>
            <Pagination
              page={page}
              handleChangePage={handleChangePage}
              rowsPerPage={rowsPerPage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              count={totalDiscounts}
            />
          </div>
        </div>
      </div>

      <DiscountsTable
        discounts={paginatedDiscounts}
        onEdit={handleEditClick}
        onDelete={deleteDiscount}
        onSwitchStatus={handleSwitchStatus}
        showEditForm={showEditForm}
        selectedDiscount={selectedDiscount}
        handleEditChange={handleEditChange}
        handleEditSubmit={handleEditSubmit}
        setShowEditForm={setShowEditForm}
        anchorEl={anchorEl}
        handleClick={handleClick}
        handleMenuClose={handleMenuClose}
        openMenu={openMenu}
      />

      {showCreateForm && (
        <CreateDiscountForm
          showCreateForm={showCreateForm}
          setShowCreateForm={setShowCreateForm}
          createdDiscount={createdDiscount}
          handleCreateChange={handleCreateChange}
          handleCreateSubmit={handleCreateSubmit}
        />
      )}
    </DashboardLayout>
  );
}
