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
  InputLabel,
  Menu,
  OutlinedInput,
  Select,
  MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";

const mockSubscriptions = [
  {
    id: "SUB-001",
    startDate: "2023-11-15",
    endDate: "2024-11-15",
    orderId: "ORD-001",
  },
  {
    id: "SUB-002",
    startDate: "2023-11-16",
    endDate: "2024-11-16",
    orderId: "ORD-002",
  },
  {
    id: "SUB-003",
    startDate: "2023-11-17",
    endDate: "2024-11-17",
    orderId: "ORD-003",
  },
  {
    id: "SUB-004",
    startDate: "2023-11-18",
    endDate: "2024-11-18",
    orderId: "ORD-004",
  },
  {
    id: "SUB-005",
    startDate: "2023-11-19",
    endDate: "2024-11-19",
    orderId: "ORD-005",
  },
];

export default function Subscriptions() {
  // Side Bar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Is Subscription Expired
  const isDateExpired = (endDate) => {
    const today = new Date();
    const expiry = new Date(endDate);
    return expiry < today;
  };

  // Searching
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalSubscriptions = mockSubscriptions.length;
  const totalPages = Math.ceil(totalSubscriptions / itemsPerPage);

  // Filter By State
  const [open, setOpen] = useState(false);

  // Filter Options
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
  });

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

  // Edit Subscription Form
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  // Create Subscription Form
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createdSubscription, setCreatedSubscription] = useState({
    id: "SUB-000",
    orderId: "ORD-000",
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
      .toISOString()
      .slice(0, 10),
  });

  // Handle Create Form Button
  const handleCreateClick = () => {
    setShowCreateForm(true);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    mockSubscriptions.push(createdSubscription);
    setShowCreateForm(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Anchor the menu to the button
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };

  // Handle Edit Form Open
  const handleEditClick = (subscription) => {
    setSelectedSubscription(subscription);
    setShowEditForm(true);
  };

  // Handle Create Form Change
  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setCreatedSubscription((prev) => ({
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

  // Handle Edit Form Change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedSubscription((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add state for subscriptions
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);

  // Delete Subscription
  const deleteSubscription = (id) => {
    setSubscriptions((prevSubscriptions) =>
      prevSubscriptions.filter((sub) => sub.id !== id)
    );
  };

  // Filter & Search Algorithm
  const filteredSubscriptions = subscriptions.filter((subscription) => {
    const matchesSearch =
      subscription.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscription.orderId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDateFilter =
      (!filters.startDate ||
        new Date(subscription.startDate) >= new Date(filters.startDate)) &&
      (!filters.endDate ||
        new Date(subscription.endDate) <= new Date(filters.endDate));

    return matchesSearch && matchesDateFilter;
  });

  // Pagination calculations
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSubscriptions = filteredSubscriptions.slice(
    startIndex,
    endIndex
  );

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
            className="Subscriptions flex flex-col w-full"
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
                All Subscriptions
              </h1>
              <div className="flex-row justify-between gap-2">
                <div className="flex flex-row justify-start gap-2 items-start">
                  <div className="relative w-full md:w-2/5 my-auto">
                    <input
                      type="text"
                      placeholder="Search for Subscriptions"
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
                      <DialogTitle>Filter Subscriptions</DialogTitle>
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
                      Create Subscription
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
                            Create Subscription
                          </h3>
                          <form onSubmit={handleCreateSubmit}>
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Id
                              </label>
                              <input
                                type="text"
                                name="id"
                                value={createdSubscription.id}
                                onChange={handleCreateChange}
                                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Start Date
                              </label>
                              <input
                                type="date"
                                name="startDate"
                                value={createdSubscription.startDate}
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
                                value={createdSubscription.endDate}
                                onChange={handleCreateChange}
                                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                              />
                            </div>
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Order Id
                              </label>
                              <input
                                type="text"
                                name="orderId"
                                value={createdSubscription.orderId}
                                onChange={handleCreateChange}
                                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                              />
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
              className="Subscriptions-table my-4 overflow-x-auto"
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
                      order id
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
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedSubscriptions.length > 0 ? (
                    paginatedSubscriptions.map((subscription) => (
                      <tr
                        key={subscription.id}
                        className="bg-white border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4 text-gray-900 font-medium">
                          {subscription.id}
                        </td>
                        <td className="py-4 text-gray-600">
                          {new Date(
                            subscription.startDate
                          ).toLocaleDateString()}
                        </td>
                        <td className="py-4 text-gray-600">
                          {new Date(subscription.endDate).toLocaleDateString()}
                        </td>
                        <td className="py-4 text-gray-900 font-mono text-sm">
                          {subscription.orderId}
                        </td>
                        <td>
                          {isDateExpired(subscription.endDate) ? (
                            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                              Expired
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                              Active
                            </span>
                          )}
                        </td>
                        <td className="py-4 text-gray-900 font-mono text-sm text-center">
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
                            <MenuItem
                              onClick={() => handleEditClick(subscription)}
                              disableRipple
                            >
                              <EditIcon />
                              Edit
                            </MenuItem>
                            {showEditForm && selectedSubscription && (
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
                                    Edit Subscription
                                  </h3>
                                  <form onSubmit={handleEditSubmit}>
                                    <div className="mb-4">
                                      <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Start Date
                                      </label>
                                      <input
                                        type="date"
                                        name="startDate"
                                        value={selectedSubscription.startDate}
                                        onChange={handleEditChange}
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
                                        value={selectedSubscription.endDate}
                                        onChange={handleEditChange}
                                        className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                      />
                                    </div>
                                    <div className="flex justify-end gap-2 mt-6">
                                      <button
                                        type="button"
                                        onClick={() => setShowEditForm(false)}
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
                            <Divider sx={{ my: 0.5 }} />
                            <MenuItem
                              onClick={() =>
                                deleteSubscription(subscription.id)
                              }
                              disableRipple
                            >
                              <DeleteIcon />
                              Delete
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
                        No Subscriptions found
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
