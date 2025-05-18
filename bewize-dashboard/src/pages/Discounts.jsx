import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Pagination from "../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import {
  faMagnifyingGlass,
  faHistory,
  faEdit,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  OutlinedInput,
  Select,
  Menu,
  MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";

const mockDiscounts = [
  {
    id: "DISC-001",
    code: "WELCOME10",
    percentage: 10,
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "Active",
  },
  {
    id: "DISC-002",
    code: "SUMMER15",
    percentage: 15,
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    status: "Active",
  },
  {
    id: "DISC-003",
    code: "BLACKFRIDAY",
    percentage: 25,
    startDate: "2024-11-25",
    endDate: "2025-11-30",
    status: "Inactive",
  },
  {
    id: "DISC-004",
    code: "NEWYEAR20",
    percentage: 20,
    startDate: "2024-12-28",
    endDate: "2025-01-05",
    status: "Active",
  },
  {
    id: "DISC-005",
    code: "SPRING5",
    percentage: 5,
    startDate: "2024-03-01",
    endDate: "2024-05-31",
    status: "Inactive",
  },
];

export default function Discounts() {
  // Side Bar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Is Discount Expired
  const isDateExpired = (endDate) => {
    const today = new Date();
    const expiry = new Date(endDate);
    return expiry < today;
  };

  // Switch
  const label = { inputProps: { "aria-label": "Switch demo" } };

  // Searching
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalDiscounts = mockDiscounts.length;
  const totalPages = Math.ceil(totalDiscounts / itemsPerPage);

  // Filter By State
  const [open, setOpen] = useState(false);

  // Filter Options
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    status: "",
  });

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

  // Handle Filter Change
  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  // Handle Open Filter Button
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Handle Close Filter Button
  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Anchor the menu to the button
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
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

    const matchesDateFilter =
      (!filters.startDate ||
        new Date(discount.startDate) >= new Date(filters.startDate)) &&
      (!filters.endDate ||
        new Date(discount.endDate) <= new Date(filters.endDate));

    const matchesStatus = !filters.status || discount.status === filters.status;

    return matchesSearch && matchesDateFilter && matchesStatus;
  });

  // Pagination calculations
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDiscounts = filteredDiscounts.slice(startIndex, endIndex);

  // Animations
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top navbar */}
      <Navbar onToggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        {/* Main content */}
        <main className="flex-1 p-4 overflow-y-auto bg-gray-100">
          <motion.div
            className="Discounts flex flex-col w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="header flex flex-col justify-start gap-4"
            >
              <h1 className="font-semibold text-2xl flex items-center gap-2">
                <FontAwesomeIcon icon={faHistory} className="text-gray-600" />
                All Discounts
              </h1>
              <div className="flex-row justify-between gap-2">
                <div className="flex flex-row justify-start gap-2 items-start">
                  <div className="relative w-full md:w-2/5 my-auto">
                    <input
                      type="text"
                      placeholder="Search for Discounts"
                      className="pl-10 p-2 w-full rounded-lg border border-gray-300 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size="sm"
                    />
                  </div>
                  <div>
                    <Button onClick={handleClickOpen} className="">
                      Filter By
                    </Button>
                    <Dialog
                      disableEscapeKeyDown
                      open={open}
                      onClose={handleClose}
                    >
                      <DialogTitle>Filter Discounts</DialogTitle>
                      <DialogContent>
                        <Box
                          component="form"
                          sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}
                        >
                          <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">
                              Start Date
                            </label>
                            <FormControl>
                              <OutlinedInput
                                type="date"
                                value={filters.startDate}
                                onChange={(e) =>
                                  handleFilterChange(
                                    "startDate",
                                    e.target.value
                                  )
                                }
                              />
                            </FormControl>
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">
                              End Date
                            </label>
                            <FormControl>
                              <OutlinedInput
                                type="date"
                                value={filters.endDate}
                                onChange={(e) =>
                                  handleFilterChange("endDate", e.target.value)
                                }
                              />
                            </FormControl>
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">
                              Status
                            </label>
                            <FormControl>
                              <Select
                                native
                                value={filters.status}
                                onChange={(e) =>
                                  handleFilterChange("status", e.target.value)
                                }
                              >
                                <option value="">All</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                              </Select>
                            </FormControl>
                          </div>
                        </Box>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Ok</Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                  <div className="flex justify-end ms-auto">
                    <button
                      className="mx-2 border rounded-md shadow-sm hover:bg-blue-400 p-2 bg-blue-600 text-white font-semibold text-sm flex items-center gap-2"
                      onClick={handleCreateClick}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                      Create Discount
                    </button>
                    {showCreateForm && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                      >
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ type: "spring", duration: 0.5 }}
                          className="bg-white p-6 rounded-lg shadow-lg w-96"
                        >
                          <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="text-gray-600"
                            />
                            Create Discount
                          </h3>
                          <form onSubmit={handleCreateSubmit}>
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Id
                              </label>
                              <input
                                type="text"
                                name="id"
                                value={createdDiscount.id}
                                onChange={handleCreateChange}
                                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Code
                              </label>
                              <input
                                type="text"
                                name="code"
                                value={createdDiscount.code}
                                onChange={handleCreateChange}
                                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Percentage (%)
                              </label>
                              <input
                                type="number"
                                name="percentage"
                                value={createdDiscount.percentage}
                                onChange={handleCreateChange}
                                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                min="0"
                                max="100"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Start Date
                              </label>
                              <input
                                type="date"
                                name="startDate"
                                value={createdDiscount.startDate}
                                onChange={handleCreateChange}
                                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                End Date
                              </label>
                              <input
                                type="date"
                                name="endDate"
                                value={createdDiscount.endDate}
                                onChange={handleCreateChange}
                                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                              </label>
                              <select
                                name="status"
                                value={createdDiscount.status}
                                onChange={handleCreateChange}
                                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                              >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                              </select>
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                              <button
                                type="button"
                                onClick={() => setShowCreateForm(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                Save Changes
                              </button>
                            </div>
                          </form>
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="Discounts-table my-4 overflow-x-auto"
            >
              <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      id
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      code
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      percentage (%)
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      start date
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      end date
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      status
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      switch status
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedDiscounts.length > 0 ? (
                    paginatedDiscounts.map((discount) => (
                      <tr
                        key={discount.id}
                        className="bg-white border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4 text-gray-900 font-medium">
                          {discount.id}
                        </td>
                        <td className="py-4 text-gray-900 font-mono text-sm">
                          {discount.code}
                        </td>
                        <td className="py-4 text-gray-600 ">
                          {discount.percentage}%
                        </td>
                        <td className="py-4 text-gray-600">
                          {new Date(discount.startDate).toLocaleDateString()}
                        </td>
                        <td className="py-4 text-gray-600">
                          {new Date(discount.endDate).toLocaleDateString()}
                        </td>
                        <td>
                          {isDateExpired(discount.endDate) ? (
                            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs text-center">
                              Expired
                            </span>
                          ) : discount.status === "Inactive" ? (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs text-center">
                              {discount.status}
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs text-center">
                              {discount.status}
                            </span>
                          )}
                        </td>
                        <td className="text-center">
                          {isDateExpired(discount.endDate) ? (
                            <Switch {...label} disabled />
                          ) : discount.status === "Inactive" ? (
                            <Switch
                              {...label}
                              onChange={() => handleSwitchStatus(discount.id)}
                              color="success"
                            />
                          ) : (
                            <Switch
                              {...label}
                              defaultChecked
                              onChange={() => handleSwitchStatus(discount.id)}
                              color="success"
                            />
                          )}
                        </td>
                        <td className="py-4 text-center text-gray-900 font-mono text-sm">
                          <Button
                            id="basic-button"
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                            variant="contained"
                            endIcon={<KeyboardArrowDownIcon />}
                          >
                            ACTION
                          </Button>

                          <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={openMenu}
                            onClose={handleMenuClose}
                            MenuListProps={{
                              "aria-labelledby": "basic-button",
                            }}
                          >
                            <MenuItem onClick={handleMenuClose} disableRipple>
                              <EditIcon />
                              Edit
                            </MenuItem>
                            <Divider sx={{ my: 0.5 }} />
                            <MenuItem onClick={handleMenuClose} disableRipple>
                              <DeleteIcon />
                              Duplicate
                            </MenuItem>
                          </Menu>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-4 py-4 text-left text-gray-500"
                      >
                        No Discounts found
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="7" className="px-4 py-4">
                      <div className="flex justify-center">
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          setCurrentPage={setCurrentPage}
                        />
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
